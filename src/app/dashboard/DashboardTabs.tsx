"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Calendar, MapPin, Users, Ticket, History, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TabType = 'upcoming' | 'completed' | 'cancelled';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DashboardTabs({ bookings }: { bookings: any[] }) {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');

  const upcomingBookings = bookings.filter(b => b.status === 'Confirmed' && new Date(b.trip.date) >= new Date(new Date().setHours(0,0,0,0)));
  const completedBookings = bookings.filter(b => b.status === 'Confirmed' && new Date(b.trip.date) < new Date(new Date().setHours(0,0,0,0)));
  const cancelledBookings = bookings.filter(b => b.status === 'Cancelled');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderBookingsList = (list: any[]) => {
    if (list.length === 0) {
      if (activeTab === 'upcoming') {
        return (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
            <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No upcoming trips</h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">You don&apos;t have any upcoming trips booked. Time to plan your next adventure!</p>
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/trips">Explore Trips <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        );
      }
      if (activeTab === 'completed') {
        return (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
            <History className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No completed trips yet</h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">You haven&apos;t been on any trips with Wrap-Up yet. Time to change that!</p>
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/trips">Explore Trips <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        );
      }
      if (activeTab === 'cancelled') {
        return (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
            <XCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No cancelled trips</h3>
            <p className="text-slate-500">You don&apos;t have any cancelled bookings.</p>
          </div>
        );
      }
    }

    return list.map((booking) => (
      <div key={booking.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center mb-6">
        <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
          <img 
            src={booking.trip.cover_image || "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=2070"} 
            alt={booking.trip.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 w-full">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-slate-900">{booking.trip.title}</h3>
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider hidden md:inline-block",
              booking.status === 'Confirmed' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
            )}>
              {booking.status}
            </span>
          </div>
          <div className="text-sm text-slate-500 mb-1">Booking ID: <span className="font-mono text-slate-900">{booking.id.split('-')[0].toUpperCase()}</span></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" /> {new Date(booking.trip.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" /> {booking.trip.pickup_time.substring(0,5)}
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <Users className="w-4 h-4 text-slate-400 shrink-0" /> {booking.seats_booked} Seats
            </div>
          </div>
        </div>
        <div className="w-full md:w-auto flex flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
          <Button className="w-full rounded-full" asChild>
            <Link href={`/booking-confirmation/${booking.id}`}>View Ticket</Link>
          </Button>
          {activeTab === 'upcoming' && (
            <Button variant="outline" className="w-full rounded-full text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700">
              Cancel Booking
            </Button>
          )}
        </div>
      </div>
    ));
  };

  return (
    <>
      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={cn(
            "px-6 py-3 font-medium text-sm rounded-t-xl transition-colors whitespace-nowrap flex items-center gap-2 border-b-2",
            activeTab === 'upcoming' 
              ? "text-blue-600 border-blue-600 bg-blue-50/50" 
              : "text-slate-600 border-transparent hover:bg-slate-100"
          )}
        >
          <Ticket className="w-4 h-4" /> Upcoming ({upcomingBookings.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={cn(
            "px-6 py-3 font-medium text-sm rounded-t-xl transition-colors whitespace-nowrap flex items-center gap-2 border-b-2",
            activeTab === 'completed' 
              ? "text-slate-900 border-slate-900 bg-slate-100" 
              : "text-slate-600 border-transparent hover:bg-slate-100"
          )}
        >
          <History className="w-4 h-4" /> Completed ({completedBookings.length})
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={cn(
            "px-6 py-3 font-medium text-sm rounded-t-xl transition-colors whitespace-nowrap flex items-center gap-2 border-b-2",
            activeTab === 'cancelled' 
              ? "text-red-600 border-red-600 bg-red-50/50" 
              : "text-slate-600 border-transparent hover:bg-slate-100"
          )}
        >
          <XCircle className="w-4 h-4" /> Cancelled ({cancelledBookings.length})
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'upcoming' && renderBookingsList(upcomingBookings)}
        {activeTab === 'completed' && renderBookingsList(completedBookings)}
        {activeTab === 'cancelled' && renderBookingsList(cancelledBookings)}
      </div>
    </>
  );
}
