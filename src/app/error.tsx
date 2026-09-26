"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex-1 flex flex-col justify-center items-center min-h-[80vh] bg-slate-50 px-4 text-center">
      <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-8">
        <AlertTriangle className="w-12 h-12" />
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Oops! Something went wrong</h1>
      <p className="text-lg text-slate-500 max-w-md mx-auto mb-10">
        We encountered an unexpected error while trying to load this page. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} className="h-12 px-8 rounded-full bg-slate-900 hover:bg-slate-800 text-base">
          Try Again
        </Button>
        <Button variant="outline" className="h-12 px-8 rounded-full text-base" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}
