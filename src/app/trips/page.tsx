import { Button } from "@/components/ui/Button";
import { Calendar, MapPin, Users, Filter, Search } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";

export const revalidate = 0; // Disable static rendering for this page to always fetch fresh trips

export default async function ExploreTrips() {
  const supabase = await createClient();
  
  // Fetch published trips
  const { data: trips } = await supabase
    .from('trips')
    .select('*')
    .in('status', ['Published', 'Sold Out'])
    .order('date', { ascending: true });

  return (
    <main className="flex-1 pt-24 pb-20 bg-slate-50">
      <div className="bg-slate-900 py-16 mb-12 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Explore Trips</h1>
            <p className="text-lg text-slate-300 max-w-2xl mb-8">
              Find the perfect weekend getaway. Short trips, great company, and zero hassle.
            </p>
          </FadeIn>
          
          {/* Search / Quick Filters */}
          <FadeIn delay={0.2} className="bg-white p-2 rounded-2xl md:rounded-full shadow-lg shadow-black/5 flex flex-col md:flex-row items-center gap-2 max-w-4xl">
            <div className="flex-1 flex items-center px-4 w-full border-b md:border-b-0 md:border-r border-slate-100 py-2 md:py-0">
              <Search className="text-slate-400 w-5 h-5 mr-3" />
              <input 
                type="text" 
                placeholder="Where do you want to go?" 
                className="w-full bg-transparent border-none focus:outline-none text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div className="flex-1 flex items-center px-4 w-full py-2 md:py-0">
              <Calendar className="text-slate-400 w-5 h-5 mr-3" />
              <select className="w-full bg-transparent border-none focus:outline-none text-slate-900 appearance-none cursor-pointer">
                <option value="">Any Weekend</option>
                <option value="this-weekend">This Weekend</option>
                <option value="next-weekend">Next Weekend</option>
              </select>
            </div>
            <Button className="w-full md:w-auto rounded-xl md:rounded-full px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white transition-transform active:scale-95">
              Search
            </Button>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <FadeIn delay={0.3} className="bg-white rounded-2xl p-6 border border-slate-100 sticky top-24 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Filters
                </h2>
                <button className="text-xs text-blue-600 hover:underline">Clear all</button>
              </div>
              
              <div className="space-y-6">
                {/* Day Filter */}
                <div>
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Day</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Saturday</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Sunday</span>
                    </label>
                  </div>
                </div>
                
                {/* Price Filter */}
                <div>
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Max Price</h3>
                  <input type="range" className="w-full accent-blue-600 cursor-pointer" min="200" max="1500" step="50" defaultValue="1500" />
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>₹200</span>
                    <span>₹1500+</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </aside>
          
          {/* Trip Results */}
          <div className="flex-1">
            <FadeIn delay={0.4} className="flex justify-between items-center mb-6">
              <p className="text-slate-600 text-sm">Showing <span className="font-semibold text-slate-900">{trips?.length || 0}</span> trips</p>
              <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-blue-500 transition-colors">
                <option>Upcoming</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </FadeIn>
            
            {trips && trips.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {trips.map((trip) => {
                  // Mocking seats left logic. In reality this needs to be calculated from bookings.
                  const seatsLeft = trip.capacity - 12 > 0 ? trip.capacity - 12 : 5;
                  
                  return (
                    <StaggerItem key={trip.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group flex flex-col hover:-translate-y-1">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          src={trip.cover_image || "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=2070"} 
                          alt={trip.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 uppercase tracking-wider shadow-sm">
                            {trip.day}
                          </span>
                          {trip.status === 'Sold Out' && (
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                              Sold Out
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{trip.title}</h3>
                        </div>
                        
                        <div className="space-y-3 mb-6 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span>{new Date(trip.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} • {trip.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="truncate" title={`${trip.pickup_location}, ${trip.pickup_time.substring(0,5)}`}>Pickup: {trip.pickup_location}, {trip.pickup_time.substring(0,5)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-emerald-500" />
                            <span className="text-emerald-600 font-medium">
                              {trip.status === 'Sold Out' ? '0 seats left' : `${seatsLeft} seats left`}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Per Person</p>
                            <p className="text-xl font-bold text-slate-900">₹{trip.price}</p>
                          </div>
                          <Button className="rounded-full px-5 text-sm transition-transform active:scale-95" asChild>
                            <Link href={`/trips/${trip.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            ) : (
              <FadeIn delay={0.5} className="text-center py-24 bg-white rounded-3xl border border-slate-100 border-dashed">
                <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No trips found</h3>
                <p className="text-slate-500">Nothing planned yet. New trips are coming soon!</p>
              </FadeIn>
            )}
            
          </div>
        </div>
      </div>
    </main>
  );
}
