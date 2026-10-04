"use client";
import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FormState } from "@/app/actions/auth";

type Props = { mode: "login" | "register"; action: (s: FormState, f: FormData) => Promise<FormState> };

export function AuthForm({ mode, action }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  const isRegister = mode === "register";
  const err = (k: string) => state.fieldErrors?.[k]?.[0];

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {state.error && (
        <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{state.error}</p>
      )}
      {isRegister && <Input name="name" label="Nama" autoComplete="name" required error={err("name")} />}
      <Input name="email" type="email" label="Email" autoComplete="email" required error={err("email")} />
      <Input name="password" type="password" label="Password" required
        autoComplete={isRegister ? "new-password" : "current-password"} error={err("password")} />
      <Button type="submit" loading={pending} className="w-full">
        {pending ? "Memproses..." : isRegister ? "Buat akun" : "Masuk"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {isRegister ? "Sudah punya akun? " : "Belum punya akun? "}
        <Link href={isRegister ? "/login" : "/register"} className="font-medium text-primary underline-offset-4 hover:underline">
          {isRegister ? "Masuk" : "Daftar"}
        </Link>
      </p>
    </form>
  );
}
