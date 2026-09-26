import { Button } from "@/components/ui/Button";
import { Calendar, MapPin, Users, Clock, CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function TripDetails({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  const { data: trip, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !trip) {
    notFound();
  }

  // Mock seats calculation for now
  const seatsLeft = trip.capacity - 12;

  // Default itinerary if none provided
  const itinerary = trip.itinerary || [
    { title: "Meet at pickup point", time: trip.pickup_time.substring(0,5), desc: `Gathering at ${trip.pickup_location}. Boarding starts.`, icon: "MapPin" },
    { title: "Departure", time: "09:30", desc: "", icon: "Clock" },
    { title: "Destination Arrival", time: "10:30", desc: "Arrive at destination.", icon: "MapPin" },
    { title: "Return Journey", time: trip.return_time.substring(0,5), desc: "", icon: "MapPin" }
  ];

  const included = trip.included && trip.included.length > 0 ? trip.included : ["Premium AC Transportation", "Trip Coordination", "Group Photography"];
  const notIncluded = trip.not_included && trip.not_included.length > 0 ? trip.not_included : ["Meals & Drinks", "Personal Expenses"];

  return (
    <main className="flex-1 bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/trips" className="hover:text-blue-600">Trips</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-900">{trip.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Image Gallery */}
            <div className="rounded-3xl overflow-hidden mb-8 h-[400px] relative">
              <img 
                src={trip.cover_image || "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=2070"} 
                alt={trip.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-slate-900 uppercase tracking-wider">
                  {trip.day} Trip
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-slate-900 mb-6">{trip.title}</h1>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed whitespace-pre-wrap">
              {trip.description}
            </p>

            {/* Itinerary */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Itinerary</h2>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {itinerary.map((item: any, i: number) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-slate-100 bg-white shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-slate-900">{item.title}</h3>
                        <time className="font-mono text-sm text-slate-500">{item.time}</time>
                      </div>
                      {item.desc && <div className="text-slate-600 text-sm mt-2">{item.desc}</div>}
                    </div>
                  </div>
                ))}
                
              </div>
            </div>

            {/* Included / Not Included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500 w-6 h-6" /> Included
                </h3>
                <ul className="space-y-3">
                  {included.map((inc: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <span className="text-emerald-500 mt-0.5">•</span> {inc}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-50/50 rounded-3xl p-8 border border-red-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <XCircle className="text-red-400 w-6 h-6" /> Not Included
                </h3>
                <ul className="space-y-3">
                  {notIncluded.map((notInc: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <span className="text-red-400 mt-0.5">•</span> {notInc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Safety */}
            <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 mb-8 flex items-start gap-4">
              <ShieldCheck className="text-blue-600 w-10 h-10 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Safety First</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {trip.safety_instructions || "All Wrap-Up trips are coordinated by verified guides. We collect emergency contacts for all participants. Please follow the coordinator's instructions at all times."}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <aside className="w-full lg:w-96 shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
              <div className="flex justify-between items-end border-b border-slate-100 pb-6 mb-6">
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">Per Person</p>
                  <p className="text-4xl font-black text-slate-900">₹{trip.price}</p>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Users className="w-4 h-4" /> {trip.status === 'Sold Out' ? '0' : seatsLeft} seats left
                </div>
              </div>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Date</p>
                    <p>{new Date(trip.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Duration</p>
                    <p>{trip.pickup_time.substring(0,5)} - {trip.return_time.substring(0,5)} ({trip.duration})</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Pickup Point</p>
                    <p className="underline decoration-slate-300 underline-offset-2 cursor-pointer hover:text-blue-600 transition-colors">
                      {trip.pickup_location}
                    </p>
                  </div>
                </div>
              </div>

              {trip.status === 'Sold Out' ? (
                <Button className="w-full h-14 rounded-full text-base font-semibold bg-red-500 hover:bg-red-600 cursor-not-allowed" disabled>
                  Sold Out
                </Button>
              ) : (
                <Button className="w-full h-14 rounded-full text-base font-semibold bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href={`/checkout/${trip.id}`}>Book This Trip</Link>
                </Button>
              )}
              
              <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                No payment required yet
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
