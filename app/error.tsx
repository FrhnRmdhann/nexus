"use client";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="grid min-h-[60vh] place-items-center p-6 text-center">
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">Terjadi kesalahan</h1>
        <p className="text-sm text-muted-foreground">Coba muat ulang. Jika berlanjut, hubungi admin.</p>
        <Button onClick={reset}>Coba lagi</Button>
      </div>
    </div>
  );
}
