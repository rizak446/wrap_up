import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardTabs } from "./DashboardTabs";

export const revalidate = 0;

export default async function Dashboard() {
  const supabase = await createClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect("/login?next=/dashboard");
  }

  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      *,
      trip:trips(*)
    `)
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  return (
    <main className="flex-1 bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">My Trips</h1>
            <p className="text-slate-600">Manage your bookings and view past adventures.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/settings">Profile Settings</Link>
            </Button>
            <Button className="rounded-full bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/trips">Book New Trip</Link>
            </Button>
          </div>
        </div>

        {/* Tabs and Content */}
        <DashboardTabs bookings={bookings || []} />

      </div>
    </main>
  );
}
