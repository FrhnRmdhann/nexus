import { getCurrentUser } from "@/lib/session";

export const metadata = { title: "Dashboard — NEXUS" };

function greeting(timezone: string) {
  const hour = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: timezone }).format(new Date()));
  return hour < 11 ? "Good morning" : hour < 15 ? "Good afternoon" : hour < 19 ? "Good evening" : "Good night";
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  const tz = user.settings?.timezone ?? "Asia/Jakarta";
  const date = new Intl.DateTimeFormat(user.settings?.locale ?? "id-ID", { dateStyle: "full", timeZone: tz }).format(new Date());
  const name = user.profile?.name.split(" ")[0] ?? "there";

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-muted-foreground">{date}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{greeting(tz)}, {name}.</h1>
      </header>
      <section className="rounded-lg border bg-card p-6">
        <h2 className="font-medium">Foundation siap</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Akun, sesi, dan database sudah berjalan. Statistik task, fokus, keuangan, dan kesehatan
          akan muncul di Phase 2–4 dari data nyata; belum ada angka yang ditampilkan di sini.
        </p>
      </section>
    </div>
  );
}
