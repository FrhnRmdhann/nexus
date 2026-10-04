import { notFound } from "next/navigation";

const MODULES: Record<string, { title: string; phase: string }> = {
  study: { title: "Study", phase: "Phase 2" },
  calendar: { title: "Calendar", phase: "Phase 3" },
  focus: { title: "Focus", phase: "Phase 3" },
  notes: { title: "Notes", phase: "Phase 4" },
  finance: { title: "Finance", phase: "Phase 4" },
  health: { title: "Health", phase: "Phase 4" },
};

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const mod = MODULES[(await params).module];
  if (!mod) notFound();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">{mod.title}</h1>
      <p className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        Modul ini belum diimplementasikan dan dijadwalkan di {mod.phase}.
      </p>
    </div>
  );
}
