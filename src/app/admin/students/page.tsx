import { Button } from "@/components/ui/Button";
import { Search, Download, Mail, MoreHorizontal } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function AdminStudents() {
  const supabase = await createClient();
  
  // Fetch all students (profiles)
  const { data: students } = await supabase
    .from('profiles')
    .select(`
      *,
      bookings(id, status, total_amount)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Students Directory</h1>
          <p className="text-slate-500">Manage registered users and view their history.</p>
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
            placeholder="Search by name, email or college..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none">
            <option>All Colleges</option>
            <option>MANIT</option>
            <option>VIT Bhopal</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-sm text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="p-4 font-medium">Student</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Institution</th>
                <th className="p-4 font-medium">Bookings</th>
                <th className="p-4 font-medium">Total Spent</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {students && students.length > 0 ? students.map((student: any) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const confirmedBookings = student.bookings?.filter((b: any) => b.status === 'Confirmed') || [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const totalSpent = confirmedBookings.reduce((sum: number, b: any) => sum + (b.total_amount || 0), 0);
                
                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    {/* Student */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                          {student.full_name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{student.full_name || 'Unnamed User'}</div>
                          <div className="text-xs text-slate-500">
                            Joined {new Date(student.created_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Contact */}
                    <td className="p-4">
                      <div className="text-sm text-slate-900">{student.email}</div>
                      <div className="text-sm text-slate-500 mt-1">{student.phone || 'No phone'}</div>
                    </td>
                    
                    {/* Institution */}
                    <td className="p-4">
                      <div className="text-sm text-slate-900">{student.college || '-'}</div>
                      <div className="text-xs text-slate-500 mt-1">{student.hostel || '-'}</div>
                    </td>
                    
                    {/* Bookings */}
                    <td className="p-4">
                      <div className="inline-flex items-center justify-center bg-slate-100 text-slate-700 rounded-full px-2.5 py-0.5 text-xs font-medium">
                        {confirmedBookings.length} Trips
                      </div>
                    </td>
                    
                    {/* Total Spent */}
                    <td className="p-4">
                      <div className="font-medium text-slate-900">₹{totalSpent}</div>
                    </td>
                    
                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="h-8 px-2 text-slate-500 hover:text-blue-600" title="Send Email">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 px-2 text-slate-500 hover:text-slate-900" title="More Options">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No students found.
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
