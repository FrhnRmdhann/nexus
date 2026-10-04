export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="grid min-h-[40vh] place-items-center text-sm text-muted-foreground">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span className="sr-only">Memuat...</span>
    </div>
  );
}
