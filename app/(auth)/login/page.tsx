import { AuthForm } from "@/components/auth/auth-form";
import { loginAction } from "@/app/actions/auth";

export const metadata = { title: "Masuk — NEXUS" };

export default function LoginPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Selamat datang kembali</h1>
        <p className="text-sm text-muted-foreground">Masuk untuk melanjutkan ke NEXUS.</p>
      </div>
      <AuthForm mode="login" action={loginAction} />
    </>
  );
}
