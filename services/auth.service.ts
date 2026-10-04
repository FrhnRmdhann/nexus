import "server-only";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

const COST = 12;
// Hash tiruan agar waktu respons login tidak membocorkan apakah email terdaftar.
const DUMMY_HASH = bcrypt.hashSync("nexus-dummy-password", COST);

export class EmailTakenError extends Error {}

export async function registerUser(input: { name: string; email: string; password: string }) {
  const passwordHash = await bcrypt.hash(input.password, COST);
  try {
    return await db.user.create({
      data: {
        email: input.email,
        passwordHash,
        profile: { create: { name: input.name } },
        settings: { create: {} },
      },
      select: { id: true },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") throw new EmailTakenError();
    throw e;
  }
}

export async function authenticateUser(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email }, select: { id: true, passwordHash: true } });
  const valid = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
  return user && valid ? { id: user.id } : null;
}

export async function updateTheme(userId: string, theme: "LIGHT" | "DARK" | "SYSTEM") {
  await db.userSettings.update({ where: { userId }, data: { theme } });
}
