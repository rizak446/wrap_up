"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  
  // Checking if on home page for transparent nav effect
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const navClasses = cn(
    "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
    isScrolled || !isHome
      ? "bg-white/80 backdrop-blur-md border-slate-200 py-4 shadow-sm"
      : "bg-transparent border-transparent py-6"
  );
  
  const linkClasses = cn(
    "text-sm font-medium transition-colors hover:text-blue-500",
    isScrolled || !isHome ? "text-slate-600" : "text-white/90 hover:text-white"
  );
  
  const logoClasses = cn(
    "text-2xl font-black tracking-tight",
    isScrolled || !isHome ? "text-slate-900" : "text-white"
  );

  return (
    <header className={navClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className={logoClasses}>
            WRAP-UP
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className={linkClasses}>Home</Link>
            <Link href="/trips" className={linkClasses}>Explore Trips</Link>
            <Link href="/#how-it-works" className={linkClasses}>How It Works</Link>
            <Link href="/about" className={linkClasses}>About</Link>
            <Link href="/support" className={linkClasses}>Support</Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className={cn("text-sm font-medium flex items-center gap-2", isScrolled || !isHome ? "text-slate-900" : "text-white")}>
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  Dashboard
                </Link>
                  <Link href="/settings" className={linkClasses}>Settings</Link>
                  <button onClick={handleLogout} className={linkClasses}>Logout</button>
                </div>
              ) : (
                <Link href="/login" className={linkClasses}>
                  Login
                </Link>
              )}
              
              <Button className={cn("rounded-full px-6", isScrolled || !isHome ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-white text-slate-900 hover:bg-slate-100")} asChild>
                <Link href="/trips">
                  Explore Trips
                </Link>
              </Button>
            </div>
  
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 -mr-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className={cn("w-6 h-6", isScrolled || !isHome ? "text-slate-900" : "text-white")} />
            </button>
          </div>
        </div>
  
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white flex flex-col">
            <div className="p-4 flex justify-between items-center border-b border-slate-100">
              <Link href="/" className="text-2xl font-black tracking-tight text-slate-900" onClick={() => setMobileMenuOpen(false)}>
                WRAP-UP
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 -mr-2 text-slate-500 hover:text-slate-900">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col p-6 gap-6 overflow-y-auto">
              <Link href="/" className="text-xl font-medium text-slate-900" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/trips" className="text-xl font-medium text-slate-900" onClick={() => setMobileMenuOpen(false)}>Explore Trips</Link>
              <Link href="/#how-it-works" className="text-xl font-medium text-slate-900" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
              <Link href="/about" className="text-xl font-medium text-slate-900" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/support" className="text-xl font-medium text-slate-900" onClick={() => setMobileMenuOpen(false)}>Support</Link>
              
              <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-8">
                {user ? (
                  <>
                    <Button variant="outline" className="w-full justify-center h-14 rounded-full text-base" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-center h-14 rounded-full text-base" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link href="/settings">Settings</Link>
                    </Button>
                    <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-slate-500 font-medium py-2">
                      Logout
                    </button>
                  </>
                ) : (
                <Button variant="outline" className="w-full justify-center h-14 rounded-full text-base" asChild onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/login">Login</Link>
                </Button>
              )}
              <Button className="w-full justify-center h-14 rounded-full text-base" asChild onClick={() => setMobileMenuOpen(false)}>
                <Link href="/trips">Explore Trips</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
