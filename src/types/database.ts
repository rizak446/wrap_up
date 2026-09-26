export type Role = 'student' | 'admin'

export interface Profile {
  id: string
  name: string
  email: string
  phone: string | null
  college: string | null
  hostel: string | null
  emergency_contact: string | null
  role: Role
  created_at: string
  updated_at: string
}

export type TripStatus = 'Draft' | 'Published' | 'Sold Out' | 'Completed' | 'Cancelled'

export interface Trip {
  id: string
  title: string
  destination: string
  description: string
  cover_image: string | null
  date: string
  day: string
  pickup_location: string
  pickup_latitude: number | null
  pickup_longitude: number | null
  pickup_time: string
  return_time: string
  duration: string
  price: number
  capacity: number
  status: TripStatus
  itinerary: unknown // JSON
  included: string[]
  not_included: string[]
  cancellation_policy: string | null
  safety_instructions: string | null
  booking_deadline: string | null
  created_at: string
  updated_at: string
}

export interface TripImage {
  id: string
  trip_id: string
  image_url: string
  sort_order: number
}

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded'
export type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed'

export interface Booking {
  id: string
  booking_id: string
  user_id: string
  trip_id: string
  number_of_seats: number
  subtotal: number
  fees: number
  total_amount: number
  payment_status: PaymentStatus
  booking_status: BookingStatus
  created_at: string
  updated_at: string
}

export interface BookingParticipant {
  id: string
  booking_id: string
  name: string
  phone: string
  emergency_contact: string | null
}

export interface Payment {
  id: string
  booking_id: string
  razorpay_order_id: string
  razorpay_payment_id: string | null
  razorpay_signature: string | null
  amount: number
  status: PaymentStatus
  created_at: string
}
