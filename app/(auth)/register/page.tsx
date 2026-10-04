import { AuthForm } from "@/components/auth/auth-form";
import { registerAction } from "@/app/actions/auth";

export const metadata = { title: "Daftar — NEXUS" };

export default function RegisterPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Buat akun NEXUS</h1>
        <p className="text-sm text-muted-foreground">Satu sistem untuk seluruh kehidupan kuliahmu.</p>
      </div>
      <AuthForm mode="register" action={registerAction} />
    </>
  );
}
