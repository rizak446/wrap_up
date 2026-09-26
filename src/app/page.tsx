import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { FadeIn, StaggerContainer, StaggerItem, HeroParallax } from "@/components/ui/Animations";

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch top 3 upcoming trips
  const { data: trips, error } = await supabase
    .from('trips')
    .select('*')
    .in('status', ['Published', 'Sold Out'])
    .order('date', { ascending: true })
    .limit(3);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <HeroParallax>
          <img
            src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=2070&auto=format&fit=crop"
            alt="Group of friends on a trip"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </HeroParallax>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <FadeIn delay={0.2} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white/90 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            Weekend trips • Small groups • Same-day return
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl leading-tight">
              Your Weekend. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Wrapped Perfectly.
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed mx-auto">
              Discover affordable short trips designed for college and hostel students. Pick a destination, bring your squad, and make your weekend count.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.5} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 text-base h-14 px-8 rounded-full shadow-xl shadow-white/10 transition-transform hover:-translate-y-1" asChild>
              <Link href="/trips">
                Explore Trips <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white text-base h-14 px-8 rounded-full transition-transform hover:-translate-y-1" asChild>
              <Link href="/#how-it-works">
                How It Works
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section id="how-it-works" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <StaggerItem className="p-8 flex flex-col items-center group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Weekend Only</h3>
              <p className="text-slate-600 leading-relaxed">Trips designed to fit perfectly into your college schedule. 5-8 hours on Saturdays and Sundays.</p>
            </StaggerItem>
            
            <StaggerItem className="p-8 flex flex-col items-center group">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Group Friendly</h3>
              <p className="text-slate-600 leading-relaxed">Bring your entire squad. Our easy group booking makes it simple to reserve seats together.</p>
            </StaggerItem>
            
            <StaggerItem className="p-8 flex flex-col items-center group">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-purple-600 group-hover:text-white">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Curated Spots</h3>
              <p className="text-slate-600 leading-relaxed">We pick the best local destinations that are safe, fun, and highly affordable for students.</p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Upcoming Trips */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Upcoming Trips</h2>
              <p className="text-lg text-slate-600 max-w-2xl">Seats fill up fast. Book your next adventure before it&apos;s sold out.</p>
            </div>
            <Link href="/trips" className="hidden md:flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group">
              View all trips <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
          
          {trips && trips.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map((trip) => {
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
                        <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{trip.title}</h3>
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
                          <p className="text-2xl font-bold text-slate-900">₹{trip.price}</p>
                        </div>
                        <Button className="rounded-full px-6 transition-transform active:scale-95" asChild>
                          <Link href={`/trips/${trip.id}`}>View Trip</Link>
                        </Button>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          ) : (
            <FadeIn className="text-center py-16 bg-white rounded-3xl border border-slate-100 border-dashed">
              <p className="text-slate-500">Nothing planned yet. New trips are coming soon!</p>
            </FadeIn>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Button variant="outline" className="w-full rounded-full h-12" asChild>
              <Link href="/trips">
                View all trips <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
