import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MapPinOff } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center min-h-[80vh] bg-slate-50 px-4 text-center">
      <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-8">
        <MapPinOff className="w-12 h-12" />
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">404 - Lost your way?</h1>
      <p className="text-lg text-slate-500 max-w-md mx-auto mb-10">
        We can&apos;t seem to find the page you&apos;re looking for. It might have been moved, deleted, or never existed in the first place.
      </p>
      <div className="flex gap-4">
        <Button className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-base" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button variant="outline" className="h-12 px-8 rounded-full text-base" asChild>
          <Link href="/trips">Explore Trips</Link>
        </Button>
      </div>
    </main>
  );
}
