"use client";

import { LayoutDashboard, Map, Users, CreditCard, Settings, LogOut, Ticket } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col hidden md:flex shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <span className="text-xl font-black tracking-widest text-white">WRAP-UP <span className="text-blue-500 font-bold text-sm ml-2">ADMIN</span></span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-1 mb-8">
          <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Overview</p>
          <Link 
            href="/admin" 
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
              isActive('/admin') 
                ? "bg-blue-600/10 text-blue-500" 
                : "hover:bg-white/5 hover:text-white"
            )}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
        </div>
        
        <div className="space-y-1 mb-8">
          <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Management</p>
          <Link 
            href="/admin/trips" 
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
              isActive('/admin/trips') 
                ? "bg-blue-600/10 text-blue-500" 
                : "hover:bg-white/5 hover:text-white"
            )}
          >
            <Map className="w-5 h-5" /> Trips
          </Link>
          <Link 
            href="/admin/bookings" 
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
              isActive('/admin/bookings') 
                ? "bg-blue-600/10 text-blue-500" 
                : "hover:bg-white/5 hover:text-white"
            )}
          >
            <Ticket className="w-5 h-5" /> Bookings
          </Link>
          <Link 
            href="/admin/students" 
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
              isActive('/admin/students') 
                ? "bg-blue-600/10 text-blue-500" 
                : "hover:bg-white/5 hover:text-white"
            )}
          >
            <Users className="w-5 h-5" /> Students
          </Link>
          <Link 
            href="/admin/payments" 
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
              isActive('/admin/payments') 
                ? "bg-blue-600/10 text-blue-500" 
                : "hover:bg-white/5 hover:text-white"
            )}
          >
            <CreditCard className="w-5 h-5" /> Payments
          </Link>
        </div>
      </div>
      
      <div className="p-4 border-t border-white/10">
        <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white transition-colors mb-2">
          <Settings className="w-5 h-5" /> Settings
        </Link>
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors w-full text-left"
        >
          <LogOut className="w-5 h-5" /> Sign out
        </button>
      </div>
    </aside>
  );
}
