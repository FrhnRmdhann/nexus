import { z } from "zod";

const email = z.string().trim().toLowerCase().email("Email tidak valid.").max(254);

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter.").max(80),
  email,
  // bcrypt hanya memproses 72 byte pertama
  password: z.string().min(8, "Password minimal 8 karakter.").max(72, "Password maksimal 72 karakter."),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password wajib diisi.").max(72),
});

export const themeSchema = z.enum(["LIGHT", "DARK", "SYSTEM"]);
