import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, className, id, ...props },
  ref,
) {
  const auto = useId();
  const inputId = id ?? auto;
  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="text-sm font-medium">{label}</label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn("h-10 w-full rounded-md border bg-card px-3 text-sm placeholder:text-muted-foreground", error && "border-destructive", className)}
        {...props}
      />
      {error && <p id={`${inputId}-error`} role="alert" className="text-xs text-destructive">{error}</p>}
    </div>
  );
});
