"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CalendarDays, HeartPulse, LayoutDashboard, LogOut, Menu, NotebookPen, Settings, Timer, Wallet, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/actions/auth";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/study", label: "Study", icon: BookOpen },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/focus", label: "Focus", icon: Timer },
  { href: "/notes", label: "Notes", icon: NotebookPen },
  { href: "/finance", label: "Finance", icon: Wallet },
  { href: "/health", label: "Health", icon: HeartPulse },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const item = (href: string, label: string, Icon: LucideIcon) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return (
      <Link key={href} href={href} onClick={onNavigate} aria-current={active ? "page" : undefined}
        className={cn("flex h-10 items-center gap-3 rounded-md px-3 text-sm transition",
          active ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
        <Icon className="h-4 w-4" aria-hidden /> {label}
      </Link>
    );
  };
  return (
    <>
      <nav aria-label="Navigasi utama" className="flex-1 space-y-1">{NAV.map((n) => item(n.href, n.label, n.icon))}</nav>
      <div className="space-y-1 border-t pt-3">
        {item("/settings", "Settings", Settings)}
        <form action={logoutAction}>
          <button type="submit" className="flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
            <LogOut className="h-4 w-4" aria-hidden /> Keluar
          </button>
        </form>
      </div>
    </>
  );
}

const Logo = () => (
  <div className="flex items-center gap-2 font-semibold tracking-tight">
    <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">N</span> NEXUS
  </div>
);

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col gap-4 border-r bg-card p-4 md:flex">
        <div className="px-2 py-2"><Logo /></div>
        <NavLinks />
      </aside>

      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-card px-4 md:hidden">
        <Logo />
        <button ref={toggleRef} onClick={() => setOpen(true)} aria-label="Buka menu" aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-md hover:bg-muted"><Menu className="h-5 w-5" /></button>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col gap-4 bg-card p-4 shadow-xl">
            <div className="flex items-center justify-between px-2 py-2">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Tutup menu" className="grid h-11 w-11 place-items-center rounded-md hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
