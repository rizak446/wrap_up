import { Button } from "@/components/ui/Button";
import { Search, Filter, Download, FileText, XCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function AdminBookings() {
  const supabase = await createClient();
  
  // Fetch all bookings with relations
  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      *,
      trip:trips(title, date),
      user:profiles(full_name, email, phone),
      participants(name, phone_number, is_primary)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Bookings Management</h1>
          <p className="text-slate-500">View and manage all student bookings.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="h-10 px-4 rounded-full bg-white text-slate-700">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Booking ID, Student Name or Trip..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none">
            <option>All Statuses</option>
            <option>Confirmed</option>
            <option>Cancelled</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none">
            <option>All Trips</option>
            {/* Realistically, map through unique trips here */}
            <option>Upcoming Trips Only</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-sm text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="p-4 font-medium">Booking Details</th>
                <th className="p-4 font-medium">Trip Details</th>
                <th className="p-4 font-medium">Participants</th>
                <th className="p-4 font-medium">Payment</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {bookings && bookings.length > 0 ? bookings.map((booking: any) => {
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                const primaryParticipant = booking.participants.find((p: any) => p.is_primary) || booking.participants[0];
                const bookingId = booking.id.split('-')[0].toUpperCase();
                
                return (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    {/* Booking Details */}
                    <td className="p-4">
                      <div className="font-mono font-bold text-slate-900 mb-1">{bookingId}</div>
                      <div className="text-sm text-slate-500">
                        {new Date(booking.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </td>
                    
                    {/* Trip Details */}
                    <td className="p-4">
                      <div className="font-semibold text-slate-900 line-clamp-1">{booking.trip?.title}</div>
                      <div className="text-sm text-slate-500">
                        {booking.trip ? new Date(booking.trip.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Unknown'}
                      </div>
                    </td>
                    
                    {/* Participants */}
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{primaryParticipant?.name}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        +{booking.seats_booked - 1} other{booking.seats_booked - 1 !== 1 ? 's' : ''} ({booking.seats_booked} total)
                      </div>
                    </td>
                    
                    {/* Payment */}
                    <td className="p-4">
                      <div className="font-medium text-slate-900">₹{booking.total_amount}</div>
                      <div className="text-xs text-emerald-600 bg-emerald-50 inline-block px-2 py-0.5 rounded mt-1">
                        Paid
                      </div>
                    </td>
                    
                    {/* Status */}
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
                        ${booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 
                          booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 
                          'bg-slate-100 text-slate-700'}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    
                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="h-8 px-2 text-slate-500 hover:text-blue-600" title="View Details">
                          <FileText className="w-4 h-4" />
                        </Button>
                        {booking.status !== 'Cancelled' && (
                          <Button variant="outline" size="sm" className="h-8 px-2 text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200" title="Cancel Booking">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No bookings found.
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
