"use server";

import { redirect } from "next/navigation";
import { loginSchema, registerSchema, themeSchema } from "@/lib/validation/auth";
import { createSession, destroySession, getCurrentUser } from "@/lib/session";
import { authenticateUser, EmailTakenError, registerUser, updateTheme } from "@/services/auth.service";

export type FormState = { error?: string; fieldErrors?: Record<string, string[] | undefined> };

export async function registerAction(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors };
  try {
    const user = await registerUser(parsed.data);
    await createSession(user.id);
  } catch (e) {
    if (e instanceof EmailTakenError) return { fieldErrors: { email: ["Email sudah terdaftar."] } };
    console.error("register failed", e instanceof Error ? e.message : "unknown");
    return { error: "Terjadi kesalahan. Coba lagi." };
  }
  redirect("/dashboard");
}

export async function loginAction(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors };
  try {
    const user = await authenticateUser(parsed.data.email, parsed.data.password);
    if (!user) return { error: "Email atau password salah." };
    await createSession(user.id);
  } catch (e) {
    console.error("login failed", e instanceof Error ? e.message : "unknown");
    return { error: "Terjadi kesalahan. Coba lagi." };
  }
  redirect("/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}

export async function updateThemeAction(value: string) {
  const user = await getCurrentUser();
  const theme = themeSchema.safeParse(value);
  if (!user || !theme.success) return { ok: false };
  await updateTheme(user.id, theme.data);
  return { ok: true };
}
