"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Map, Users, CreditCard, Settings, LogOut, Ticket, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

export function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const supabase = createClient();

  const isActive = (path: string) => {
    if (path === '/admin') return pathname === '/admin';
    return pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="md:hidden flex items-center">
      <button onClick={() => setIsOpen(true)} className="p-2 -mr-2 text-slate-600">
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-slate-900/50" onClick={() => setIsOpen(false)}></div>
          
          {/* Sidebar */}
          <aside className="relative w-64 max-w-[80%] bg-slate-950 text-slate-300 flex flex-col h-full shadow-2xl">
            <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
              <span className="text-xl font-black tracking-widest text-white">WRAP-UP</span>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6 px-4">
              <div className="space-y-1 mb-8">
                <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Overview</p>
                <Link onClick={() => setIsOpen(false)} href="/admin" className={cn("flex items-center gap-3 px-3 py-2 rounded-lg font-medium", isActive('/admin') ? "bg-blue-600/10 text-blue-500" : "hover:bg-white/5 hover:text-white")}>
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </Link>
              </div>
              
              <div className="space-y-1 mb-8">
                <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Management</p>
                <Link onClick={() => setIsOpen(false)} href="/admin/trips" className={cn("flex items-center gap-3 px-3 py-2 rounded-lg font-medium", isActive('/admin/trips') ? "bg-blue-600/10 text-blue-500" : "hover:bg-white/5 hover:text-white")}>
                  <Map className="w-5 h-5" /> Trips
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/admin/bookings" className={cn("flex items-center gap-3 px-3 py-2 rounded-lg font-medium", isActive('/admin/bookings') ? "bg-blue-600/10 text-blue-500" : "hover:bg-white/5 hover:text-white")}>
                  <Ticket className="w-5 h-5" /> Bookings
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/admin/students" className={cn("flex items-center gap-3 px-3 py-2 rounded-lg font-medium", isActive('/admin/students') ? "bg-blue-600/10 text-blue-500" : "hover:bg-white/5 hover:text-white")}>
                  <Users className="w-5 h-5" /> Students
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/admin/payments" className={cn("flex items-center gap-3 px-3 py-2 rounded-lg font-medium", isActive('/admin/payments') ? "bg-blue-600/10 text-blue-500" : "hover:bg-white/5 hover:text-white")}>
                  <CreditCard className="w-5 h-5" /> Payments
                </Link>
              </div>
            </div>
            
            <div className="p-4 border-t border-white/10">
              <Link onClick={() => setIsOpen(false)} href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white mb-2">
                <Settings className="w-5 h-5" /> Settings
              </Link>
              <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-400/10 w-full text-left">
                <LogOut className="w-5 h-5" /> Sign out
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
