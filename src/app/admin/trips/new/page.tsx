"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Calendar, Clock, MapPin, IndianRupee, Image as ImageIcon, Users } from "lucide-react";

export default function CreateTrip() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    day: "Saturday",
    duration: "5-7 Hours",
    price: "",
    capacity: "30",
    pickup_location: "",
    pickup_time: "09:00",
    return_time: "17:00",
    cover_image: "",
    status: "Draft",
    itinerary_raw: "09:00 - Meet at pickup point\n09:30 - Departure\n10:30 - Arrival\n16:00 - Return Journey",
    included_raw: "AC Transportation\nTrip Coordinator",
    not_included_raw: "Meals\nPersonal Expenses"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Process raw text into arrays/json
    const itinerary = formData.itinerary_raw.split('\n').filter(i => i.trim()).map(line => {
      const [time, ...titleParts] = line.split('-');
      return {
        time: time?.trim() || "",
        title: titleParts.join('-').trim() || line.trim(),
        desc: "",
        icon: "MapPin"
      };
    });

    const included = formData.included_raw.split('\n').filter(i => i.trim());
    const not_included = formData.not_included_raw.split('\n').filter(i => i.trim());

    const { error } = await supabase.from('trips').insert([
      {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        day: formData.day,
        duration: formData.duration,
        price: parseInt(formData.price),
        capacity: parseInt(formData.capacity),
        pickup_location: formData.pickup_location,
        pickup_time: formData.pickup_time,
        return_time: formData.return_time,
        cover_image: formData.cover_image || null,
        status: formData.status,
        itinerary: itinerary,
        included: included,
        not_included: not_included
      }
    ]);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Create New Trip</h1>
        <p className="text-slate-500">Fill in the details to publish a new trip to the platform.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Details */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Basic Details</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Trip Title</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" placeholder="e.g. Sanchi Heritage Trip" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea name="description" required rows={4} value={formData.description} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" placeholder="Describe the trip experience..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <input type="url" name="cover_image" value={formData.cover_image} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3" placeholder="https://..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                  <option value="Draft">Draft (Hidden)</option>
                  <option value="Published">Published (Live)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule & Location */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Schedule & Location</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Day</label>
              <select name="day" value={formData.day} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Duration String</label>
              <input type="text" name="duration" required value={formData.duration} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" placeholder="e.g. 5-7 Hours" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <input type="text" name="pickup_location" required value={formData.pickup_location} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3" placeholder="e.g. DB Mall" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Time</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Clock className="w-5 h-5" />
                </div>
                <input type="time" name="pickup_time" required value={formData.pickup_time} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Return Time</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Clock className="w-5 h-5" />
                </div>
                <input type="time" name="return_time" required value={formData.return_time} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Capacity */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Pricing & Capacity</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <input type="number" name="price" required min="1" value={formData.price} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3" placeholder="399" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Total Capacity</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Users className="w-5 h-5" />
                </div>
                <input type="number" name="capacity" required min="1" value={formData.capacity} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3" placeholder="30" />
              </div>
            </div>
          </div>
        </div>

        {/* Itinerary & Inclusions */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Itinerary & Inclusions</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Itinerary (One per line: Time - Activity)</label>
              <textarea name="itinerary_raw" rows={5} value={formData.itinerary_raw} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono text-sm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Included (One per line)</label>
                <textarea name="included_raw" rows={4} value={formData.included_raw} onChange={handleChange} className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Not Included (One per line)</label>
                <textarea name="not_included_raw" rows={4} value={formData.not_included_raw} onChange={handleChange} className="w-full bg-red-50/50 border border-red-100 rounded-xl px-4 py-3 text-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" className="h-12 px-8 rounded-full" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={loading} className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-700">
            {loading ? "Creating Trip..." : "Create Trip"}
          </Button>
        </div>
      </form>
    </div>
  );
}
