import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { getCurrentUser } from "@/lib/session";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login"); // pertahanan kedua selain middleware
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="md:pl-64">
        <div className="mx-auto max-w-5xl p-4 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
