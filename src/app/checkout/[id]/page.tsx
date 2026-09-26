"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Plus, Minus, User, ShieldAlert, ArrowRight, Info, Loader2, CreditCard, Smartphone, Building, CheckCircle2, X } from "lucide-react";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

// Simulated Razorpay Modal Component
function RazorpayMockModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  amount, 
  email,
  phone
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onSuccess: (txId: string) => void, 
  amount: number,
  email: string,
  phone: string
}) {
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setProcessing(true);
    // Simulate network request
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      // Wait for success animation then complete
      setTimeout(() => {
        onSuccess(`pay_${Math.random().toString(36).substring(2, 12)}`);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-400" />
            <span className="font-semibold tracking-wide">Razorpay <span className="text-blue-400 font-mono text-xs ml-1 px-1.5 py-0.5 rounded border border-blue-400/30">TEST MODE</span></span>
          </div>
          {!processing && !success && (
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-10 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful</h3>
              <p className="text-slate-500 text-center">Redirecting to your ticket...</p>
            </div>
          ) : (
            <>
              {/* Payment Info */}
              <div className="mb-6 flex justify-between items-end border-b border-slate-100 pb-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Paying Wrap-Up Trips</p>
                  <p className="text-xs text-slate-400">{email}</p>
                  <p className="text-xs text-slate-400">{phone}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-slate-900">₹{amount}</span>
                </div>
              </div>

              {/* Methods */}
              <div className="space-y-3 mb-8">
                <button 
                  onClick={() => setMethod('upi')}
                  className={cn("w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left", method === 'upi' ? "border-blue-500 ring-1 ring-blue-500 bg-blue-50/30" : "border-slate-200 hover:border-slate-300")}
                >
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", method === 'upi' ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500")}>
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">UPI / QR</h4>
                    <p className="text-xs text-slate-500">Google Pay, PhonePe, Paytm</p>
                  </div>
                </button>
                <button 
                  onClick={() => setMethod('card')}
                  className={cn("w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left", method === 'card' ? "border-blue-500 ring-1 ring-blue-500 bg-blue-50/30" : "border-slate-200 hover:border-slate-300")}
                >
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", method === 'card' ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500")}>
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Card</h4>
                    <p className="text-xs text-slate-500">Visa, MasterCard, RuPay</p>
                  </div>
                </button>
                <button 
                  onClick={() => setMethod('netbanking')}
                  className={cn("w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left", method === 'netbanking' ? "border-blue-500 ring-1 ring-blue-500 bg-blue-50/30" : "border-slate-200 hover:border-slate-300")}
                >
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", method === 'netbanking' ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500")}>
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Netbanking</h4>
                    <p className="text-xs text-slate-500">All Indian Banks</p>
                  </div>
                </button>
              </div>

              {/* Pay Button */}
              <Button 
                onClick={handlePay} 
                disabled={processing}
                className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-500/25"
              >
                {processing ? (
                  <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Processing Payment...</span>
                ) : (
                  `Pay ₹${amount}`
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Checkout({ params }: { params: { id: string } }) {
  const router = useRouter();
  const supabase = createClient();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [trip, setTrip] = useState<any>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [seats, setSeats] = useState(1);
  const [participants, setParticipants] = useState([
    { name: "", phone: "", isLeader: true }
  ]);

  // Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCompletingBooking, setIsCompletingBooking] = useState(false);

  useEffect(() => {
    async function loadData() {
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Redirect to login if not authenticated
        router.push(`/login?next=/checkout/${params.id}`);
        return;
      }
      setUser(session.user);

      // Pre-fill leader name if available in user metadata
      const leaderName = session.user.user_metadata?.full_name || "";
      setParticipants([{ name: leaderName, phone: "", isLeader: true }]);

      // Get trip details
      const { data: tripData, error: tripError } = await supabase
        .from('trips')
        .select('*')
        .eq('id', params.id)
        .single();
        
      if (tripError || !tripData) {
        setError("Trip not found");
      } else {
        setTrip(tripData);
      }
      setLoading(false);
    }
    
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleSeatChange = (delta: number) => {
    if (!trip) return;
    
    const maxSeats = trip.capacity - 12; // Mock available seats logic
    const newSeats = seats + delta;
    
    if (newSeats >= 1 && newSeats <= maxSeats) {
      setSeats(newSeats);
      
      if (delta > 0) {
        setParticipants([...participants, { name: "", phone: "", isLeader: false }]);
      } else {
        setParticipants(participants.slice(0, -1));
      }
    }
  };

  const handleParticipantChange = (index: number, field: string, value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = { ...newParticipants[index], [field]: value };
    setParticipants(newParticipants);
  };

  // Triggers the payment modal instead of direct DB creation
  const handleInitiateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !trip) return;
    setError(null);
    setIsPaymentModalOpen(true);
  };

  // Called after successful simulated payment
  const handlePaymentSuccess = async (transactionId: string) => {
    setIsPaymentModalOpen(false);
    setIsCompletingBooking(true);

    const totalAmount = seats * trip.price;

    try {
      // 1. Create Booking record
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          trip_id: trip.id,
          user_id: user?.id,
          seats_booked: seats,
          total_amount: totalAmount,
          payment_status: 'Completed', 
          status: 'Confirmed'
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // 2. Add Participants
      const participantsToInsert = participants.map(p => ({
        booking_id: booking.id,
        name: p.name,
        phone_number: p.phone,
        is_primary: p.isLeader
      }));

      const { error: partError } = await supabase
        .from('participants')
        .insert(participantsToInsert);

      if (partError) throw partError;

      // 3. Save Real Payment record
      const { error: payError } = await supabase
        .from('payments')
        .insert({
          booking_id: booking.id,
          amount: totalAmount,
          provider: 'Razorpay',
          transaction_id: transactionId,
          status: 'Success'
        });
        
      if (payError) throw payError;

      // Success! Redirect to confirmation
      router.push(`/booking-confirmation/${booking.id}`);
      
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred during final booking setup";
      setError(errorMessage);
      setIsCompletingBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center py-32">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="flex-1 flex justify-center items-center py-32 text-slate-500">
        {error || "Something went wrong"}
      </div>
    );
  }

  const subtotal = seats * trip.price;
  const fees = 0;
  const total = subtotal + fees;
  const maxSeats = trip.capacity - 12; // Mock

  return (
    <>
      <main className="flex-1 bg-slate-50 pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Complete your booking</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
              {error}
            </div>
          )}
          
          <form onSubmit={handleInitiateCheckout} className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Forms */}
            <div className="flex-1 space-y-8">
              
              {/* Seat Selection */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Group Size</h2>
                    <p className="text-slate-500 text-sm">Select number of seats to book</p>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-full border border-slate-100">
                    <button 
                      type="button"
                      onClick={() => handleSeatChange(-1)}
                      disabled={seats <= 1 || isCompletingBooking}
                      className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 disabled:opacity-50 hover:bg-slate-100 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-8 text-center font-bold text-xl text-slate-900">{seats}</span>
                    <button 
                      type="button"
                      onClick={() => handleSeatChange(1)}
                      disabled={seats >= maxSeats || isCompletingBooking}
                      className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 disabled:opacity-50 hover:bg-slate-100 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-xl flex gap-2">
                  <Info className="w-5 h-5 shrink-0" />
                  <p>Booking multiple seats? You are the group leader. You can enter participant details now.</p>
                </div>
              </div>
  
              {/* Participants */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-slate-400" /> Participant Details
                </h2>
                
                <div className="space-y-6">
                  {participants.map((p, index) => (
                    <div key={index} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50">
                      <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        {p.isLeader ? "Group Leader (You)" : `Participant ${index + 1}`}
                        {p.isLeader && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">Primary</span>}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                          <input 
                            required
                            type="text" 
                            value={p.name}
                            onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                          <input 
                            required
                            type="tel" 
                            value={p.phone}
                            onChange={(e) => handleParticipantChange(index, 'phone', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        {p.isLeader && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">College/University</label>
                              <input 
                                required
                                type="text" 
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                placeholder="e.g. MANIT Bhopal"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact</label>
                              <input 
                                required
                                type="tel" 
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                placeholder="Parent/Guardian Phone"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Right Column: Order Summary */}
            <aside className="w-full lg:w-[400px] shrink-0">
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
                
                <div className="flex gap-4 mb-6 pb-6 border-b border-slate-100">
                  <img 
                    src={trip.cover_image || "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=2070"} 
                    alt="Trip" 
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 line-clamp-2">{trip.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{new Date(trip.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-sm mb-6 pb-6 border-b border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>₹{trip.price} × {seats} seats</span>
                    <span className="font-medium text-slate-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Taxes & Fees</span>
                    <span className="font-medium text-slate-900">₹{fees}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end mb-8">
                  <span className="text-lg font-bold text-slate-900">Total Amount</span>
                  <span className="text-3xl font-black text-slate-900">₹{total}</span>
                </div>
                
                <Button type="submit" disabled={isCompletingBooking} className="w-full h-14 rounded-full text-base font-semibold bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20">
                  {isCompletingBooking ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Finalizing Booking...</span>
                  ) : (
                    <>Pay Securely <ArrowRight className="w-5 h-5 ml-2" /></>
                  )}
                </Button>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <ShieldAlert className="w-4 h-4 text-emerald-500" />
                  Payments processed securely by Razorpay
                </div>
              </div>
            </aside>
          </form>
        </div>
      </main>

      <RazorpayMockModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        onSuccess={handlePaymentSuccess}
        amount={total}
        email={user?.email || ""}
        phone={participants[0]?.phone || ""}
      />
    </>
  );
}
