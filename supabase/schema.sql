-- Create profiles table
CREATE TYPE user_role AS ENUM ('student', 'admin');

CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    college TEXT,
    hostel TEXT,
    emergency_contact TEXT,
    role user_role DEFAULT 'student'::user_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE
  USING ( auth.uid() = id );

-- Create trips table
CREATE TYPE trip_status AS ENUM ('Draft', 'Published', 'Sold Out', 'Completed', 'Cancelled');

CREATE TABLE trips (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    destination TEXT NOT NULL,
    description TEXT NOT NULL,
    cover_image TEXT,
    date DATE NOT NULL,
    day TEXT NOT NULL,
    pickup_location TEXT NOT NULL,
    pickup_latitude NUMERIC,
    pickup_longitude NUMERIC,
    pickup_time TIME NOT NULL,
    return_time TIME NOT NULL,
    duration TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    capacity INTEGER NOT NULL,
    status trip_status DEFAULT 'Draft'::trip_status NOT NULL,
    itinerary JSONB,
    included TEXT[],
    not_included TEXT[],
    cancellation_policy TEXT,
    safety_instructions TEXT,
    booking_deadline TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published trips."
  ON trips FOR SELECT
  USING ( status = 'Published' OR status = 'Sold Out' OR status = 'Completed' );

CREATE POLICY "Admins can view all trips."
  ON trips FOR SELECT
  USING ( EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') );

CREATE POLICY "Admins can insert trips."
  ON trips FOR INSERT
  WITH CHECK ( EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') );

CREATE POLICY "Admins can update trips."
  ON trips FOR UPDATE
  USING ( EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') );

-- Create trip_images table
CREATE TABLE trip_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE trip_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view trip images." ON trip_images FOR SELECT USING ( true );
CREATE POLICY "Admins can insert trip images." ON trip_images FOR INSERT WITH CHECK ( EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') );
CREATE POLICY "Admins can update trip images." ON trip_images FOR UPDATE USING ( EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') );
CREATE POLICY "Admins can delete trip images." ON trip_images FOR DELETE USING ( EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') );

-- Create bookings table
CREATE TYPE booking_status_enum AS ENUM ('Confirmed', 'Pending', 'Cancelled', 'Completed');
CREATE TYPE payment_status_enum AS ENUM ('Pending', 'Paid', 'Failed', 'Refunded');

CREATE TABLE bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
    number_of_seats INTEGER NOT NULL CHECK (number_of_seats > 0),
    subtotal DECIMAL(10,2) NOT NULL,
    fees DECIMAL(10,2) DEFAULT 0 NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status payment_status_enum DEFAULT 'Pending'::payment_status_enum NOT NULL,
    booking_status booking_status_enum DEFAULT 'Pending'::booking_status_enum NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own bookings." ON bookings FOR SELECT USING ( auth.uid() = user_id );
CREATE POLICY "Admins can view all bookings." ON bookings FOR SELECT USING ( EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') );
CREATE POLICY "Users can insert own bookings." ON bookings FOR INSERT WITH CHECK ( auth.uid() = user_id );
CREATE POLICY "Admins can update bookings." ON bookings FOR UPDATE USING ( EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') );

-- Create booking_participants table
CREATE TABLE booking_participants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    emergency_contact TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE booking_participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view participants for their bookings." 
  ON booking_participants FOR SELECT 
  USING ( EXISTS (SELECT 1 FROM bookings WHERE id = booking_participants.booking_id AND user_id = auth.uid()) );
CREATE POLICY "Users can insert participants for their bookings." 
  ON booking_participants FOR INSERT 
  WITH CHECK ( EXISTS (SELECT 1 FROM bookings WHERE id = booking_participants.booking_id AND user_id = auth.uid()) );
CREATE POLICY "Admins can view all participants." 
  ON booking_participants FOR SELECT 
  USING ( EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') );


-- Create payments table
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
    razorpay_order_id TEXT NOT NULL UNIQUE,
    razorpay_payment_id TEXT UNIQUE,
    razorpay_signature TEXT,
    amount DECIMAL(10,2) NOT NULL,
    status payment_status_enum DEFAULT 'Pending'::payment_status_enum NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own payments." 
  ON payments FOR SELECT 
  USING ( EXISTS (SELECT 1 FROM bookings WHERE id = payments.booking_id AND user_id = auth.uid()) );
CREATE POLICY "Admins can view all payments." 
  ON payments FOR SELECT 
  USING ( EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') );

-- Create notifications table
CREATE TYPE notification_type AS ENUM ('booking_confirmation', 'trip_reminder', 'cancellation', 'general');
CREATE TABLE notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type notification_type DEFAULT 'general'::notification_type NOT NULL,
    read BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own notifications." ON notifications FOR SELECT USING ( auth.uid() = user_id );
CREATE POLICY "Users can update own notifications." ON notifications FOR UPDATE USING ( auth.uid() = user_id );

-- Function to handle user creation and auto-insert into profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON trips FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
