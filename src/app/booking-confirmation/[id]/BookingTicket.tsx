"use client";

import { useState } from "react";
import { Calendar, MapPin, Users, Copy, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BookingTicket({ booking, trip }: { booking: any, trip: any }) {
  const [copied, setCopied] = useState(false);
  const bookingId = booking.id.split('-')[0].toUpperCase();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
      
      {/* Ticket Header */}
      <div className="bg-slate-900 px-8 py-6 text-white flex justify-between items-center">
        <span className="font-black tracking-widest text-xl">WRAP-UP</span>
        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {booking.status}
        </span>
      </div>

      <div className="p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Left Details */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{trip.title}</h2>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <span>Booking ID:</span>
                <button 
                  onClick={handleCopy}
                  className="font-mono text-slate-900 bg-slate-100 px-2 py-1 rounded hover:bg-slate-200 transition-colors flex items-center gap-1"
                >
                  {bookingId}
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">Date</p>
                <p className="font-medium text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" /> {new Date(trip.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">Participants</p>
                <p className="font-medium text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" /> {booking.seats_booked} People
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">Pickup Point</p>
                <p className="font-medium text-slate-900 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> 
                  {trip.pickup_location} ({trip.pickup_time.substring(0,5)})
                </p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-100">
              <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-2">Participant Names</p>
              <p className="text-slate-700 text-sm">
                {booking.participants.map((p: { name: string, is_primary: boolean }) => `${p.name} ${p.is_primary ? '(Leader)' : ''}`).join(', ')}
              </p>
            </div>
            
            <div className="pt-4 flex justify-between items-center">
              <p className="text-sm text-slate-500">Total Amount Paid</p>
              <p className="text-xl font-bold text-slate-900">₹{booking.total_amount}</p>
            </div>
          </div>

          {/* Right QR */}
          <div className="w-full md:w-auto flex flex-col items-center justify-center md:border-l border-slate-100 md:pl-8 pt-8 md:pt-0 border-t md:border-t-0">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 mb-4">
              <QRCodeSVG 
                value={`https://wrapup-app.com/verify/${booking.id}`} 
                size={160}
                bgColor={"#ffffff"}
                fgColor={"#0f172a"}
                level={"Q"}
              />
            </div>
            <p className="text-xs text-slate-400 text-center max-w-[160px]">
              Show this QR code to the coordinator at pickup.
            </p>
          </div>
        </div>
      </div>
      
      {/* Perforated edge effect */}
      <div className="flex justify-between items-center absolute left-0 right-0 top-[60px] -mt-3 pointer-events-none">
        <div className="w-6 h-6 rounded-full bg-slate-50 -translate-x-1/2"></div>
        <div className="flex-1 border-b-2 border-dashed border-slate-200 opacity-50"></div>
        <div className="w-6 h-6 rounded-full bg-slate-50 translate-x-1/2"></div>
      </div>
    </div>
  );
}
