import { Button } from "@/components/ui/Button";
import { Plus, Users, MapPin, IndianRupee, Calendar } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: trips } = await supabase
    .from('trips')
    .select('*')
    .order('created_at', { ascending: false });
    
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, trip_id')
    .eq('status', 'Confirmed');

  // Real stats calculated from Confirmed bookings
  const totalRevenue = bookings?.reduce((acc, booking) => acc + (booking.total_amount || 0), 0) || 0;
  const totalStudents = bookings?.reduce((acc, booking) => acc + (booking.seats_booked || 0), 0) || 0;

  return (
    <div className="pb-20 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back! Here&apos;s what&apos;s happening with Wrap-Up.</p>
        </div>
        <Button className="h-12 px-6 rounded-full bg-blue-600 hover:bg-blue-700" asChild>
          <Link href="/admin/trips/new">
            <Plus className="w-5 h-5 mr-2" />
            Create Trip
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Trips</p>
              <h3 className="text-2xl font-bold text-slate-900">{trips?.length || 0}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Students Travelled</p>
              <h3 className="text-2xl font-bold text-slate-900">{totalStudents}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-slate-900">₹{totalRevenue.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Upcoming Trips</p>
              <h3 className="text-2xl font-bold text-slate-900">{trips?.filter(t => t.status === 'Published').length || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Trips Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">Recent Trips</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-sm text-slate-500 uppercase tracking-wider">
                <th className="p-4 font-medium">Trip Name</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Bookings</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trips && trips.length > 0 ? trips.map((trip) => {
                const tripBookings = bookings?.filter(b => b.trip_id === trip.id) || [];
                const tripSeatsBooked = tripBookings.reduce((sum, b) => sum + b.seats_booked, 0);

                return (
                  <tr key={trip.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-slate-900">{trip.title}</div>
                      <div className="text-sm text-slate-500">{trip.pickup_location}</div>
                    </td>
                    <td className="p-4 text-slate-700">{new Date(trip.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</td>
                    <td className="p-4 text-slate-700">₹{trip.price}</td>
                    <td className="p-4 text-slate-700">
                      <span className="font-medium">{tripSeatsBooked}</span> / {trip.capacity}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${trip.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 
                          trip.status === 'Draft' ? 'bg-slate-100 text-slate-800' : 
                          trip.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                          'bg-red-100 text-red-800'}`}
                      >
                        {trip.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="outline" size="sm" className="rounded-full" disabled>Manage</Button>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No trips found. Create your first trip!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
