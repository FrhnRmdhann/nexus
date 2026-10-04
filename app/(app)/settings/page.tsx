import { ThemeSelect } from "@/components/layout/theme-select";
import { getCurrentUser } from "@/lib/session";

export const metadata = { title: "Settings — NEXUS" };

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
      <section className="space-y-3 rounded-lg border bg-card p-6">
        <h2 className="font-medium">Profil</h2>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div><dt className="text-muted-foreground">Nama</dt><dd>{user.profile?.name}</dd></div>
          <div><dt className="text-muted-foreground">Email</dt><dd>{user.email}</dd></div>
        </dl>
      </section>
      <section className="space-y-3 rounded-lg border bg-card p-6">
        <h2 className="font-medium">Appearance</h2>
        <ThemeSelect initial={user.settings?.theme ?? "SYSTEM"} />
      </section>
    </div>
  );
}
