import { LayoutDashboard, Map, Users, CreditCard, Settings, LogOut, CalendarDays, Ticket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

import { AdminSidebar } from "./AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased text-slate-900">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Admin Header (Mobile Nav) */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="md:hidden font-black text-slate-900 tracking-widest">WRAP-UP <span className="text-blue-600 font-bold text-sm ml-1">ADMIN</span></div>
          <div className="hidden md:block"></div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                A
              </div>
              <span className="text-sm font-medium text-slate-700 hidden sm:block">Admin User</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
