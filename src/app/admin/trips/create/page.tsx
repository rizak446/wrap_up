import { Button } from "@/components/ui/Button";
import { ArrowLeft, Upload, Plus } from "lucide-react";
import Link from "next/link";

export default function CreateTrip() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/admin/trips"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Create New Trip</h1>
          <p className="text-slate-500 text-sm mt-1">Add a new destination and start accepting bookings.</p>
        </div>
      </div>

      <form className="space-y-8">
        
        {/* Basic Details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Basic Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Trip Title</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Bhopal City Mini Trip" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Destination Area/City</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Bhopal" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Draft</option>
                <option>Published</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe the trip experience..."></textarea>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Media</h2>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Cover Image</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
              <Upload className="w-8 h-8 mb-4 text-slate-400" />
              <p className="font-medium text-slate-700">Click to upload cover image</p>
              <p className="text-xs mt-1">High quality, landscape format (4:3 or 16:9)</p>
            </div>
          </div>
        </div>

        {/* Schedule & Pricing */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Schedule & Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Trip Date</label>
              <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Day of Week</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Duration Info</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 5-7 Hours" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Total Capacity (Seats)</label>
              <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 30" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Price per Person (₹)</label>
              <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 399" />
            </div>
          </div>
        </div>

        {/* Logistics */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Logistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Pickup Location (Address/Name)</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. DB Mall, Zone-I" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Pickup Time</label>
              <input type="time" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Expected Return Time</label>
              <input type="time" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" className="h-12 px-8 rounded-full">Cancel</Button>
          <Button className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-700">Create Trip</Button>
        </div>

      </form>
    </div>
  );
}
