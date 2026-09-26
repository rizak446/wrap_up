import { Button } from "@/components/ui/Button";
import { CheckCircle, Download } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { BookingTicket } from "./BookingTicket";

export const revalidate = 0;

export default async function BookingConfirmation({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  // Fetch Booking with Trip and Participants
  const { data: booking, error } = await supabase
    .from('bookings')
    .select(`
      *,
      trip:trips(*),
      participants(*)
    `)
    .eq('id', params.id)
    .single();

  if (error || !booking) {
    notFound();
  }

  const trip = booking.trip;
  const primaryParticipant = booking.participants.find((p: { is_primary: boolean, name: string }) => p.is_primary) || booking.participants[0];

  return (
    <main className="flex-1 bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm shadow-emerald-200">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Booking Confirmed! 🎉</h1>
          <p className="text-lg text-slate-600">
            Your trip is locked in, {primaryParticipant?.name.split(' ')[0]}. We&apos;ve sent the details to your email.
          </p>
        </div>

        {/* Digital Ticket */}
        <BookingTicket booking={booking} trip={trip} />

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="h-14 rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-base" asChild>
            <Link href="/dashboard">Go to My Trips</Link>
          </Button>
          <Button variant="outline" className="h-14 rounded-full px-8 text-base border-slate-200">
            <Download className="w-5 h-5 mr-2" /> Download Ticket
          </Button>
        </div>

      </div>
    </main>
  );
}
