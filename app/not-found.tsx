import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center p-6 text-center">
      <div className="space-y-3">
        <p className="text-5xl font-semibold">404</p>
        <p className="text-sm text-muted-foreground">Halaman tidak ditemukan.</p>
        <Link href="/dashboard" className="text-sm font-medium text-primary hover:underline">Kembali ke Dashboard</Link>
      </div>
    </div>
  );
}
