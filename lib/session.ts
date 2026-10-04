import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { db } from "@/lib/db";

export const SESSION_COOKIE = "nexus_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) throw new Error("AUTH_SECRET harus diisi (minimal 32 karakter).");
  return new TextEncoder().encode(value);
}

export async function createSession(userId: string) {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}

/** User ID selalu berasal dari token yang diverifikasi server, bukan dari input client. */
async function getSessionUserId(): Promise<string | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

export const getCurrentUser = cache(async () => {
  const id = await getSessionUserId();
  if (!id) return null;
  return db.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      profile: { select: { name: true, university: true, major: true } },
      settings: { select: { theme: true, timezone: true, locale: true } },
    },
  });
});
