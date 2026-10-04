"use client";
import { useState, useTransition } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { updateThemeAction } from "@/app/actions/auth";

const OPTIONS = [
  { value: "LIGHT", label: "Light" },
  { value: "DARK", label: "Dark" },
  { value: "SYSTEM", label: "System" },
] as const;

type ThemeValue = (typeof OPTIONS)[number]["value"];

export function ThemeSelect({ initial }: { initial: ThemeValue }) {
  const { setTheme } = useTheme();
  const [value, setValue] = useState<ThemeValue>(initial);
  const [pending, start] = useTransition();
  const [error, setError] = useState("");

  const choose = (v: ThemeValue) => {
    setValue(v);
    setTheme(v.toLowerCase());
    setError("");
    start(async () => {
      const res = await updateThemeAction(v);
      if (!res.ok) setError("Gagal menyimpan preferensi.");
    });
  };

  return (
    <div>
      <div role="radiogroup" aria-label="Tema" className="inline-flex rounded-md bg-muted p-1">
        {OPTIONS.map((o) => (
          <button key={o.value} role="radio" aria-checked={value === o.value} disabled={pending} onClick={() => choose(o.value)}
            className={cn("h-9 rounded-sm px-4 text-sm", value === o.value ? "bg-card font-medium shadow-sm" : "text-muted-foreground")}>
            {o.label}
          </button>
        ))}
      </div>
      {error && <p role="alert" className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
