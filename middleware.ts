import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED = ["/dashboard", "/study", "/calendar", "/focus", "/notes", "/finance", "/health", "/settings"];
const AUTH_PAGES = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("nexus_session")?.value;
  let authed = false;
  if (token && process.env.AUTH_SECRET) {
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_SECRET));
      authed = true;
    } catch {}
  }
  if (!authed && PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (authed && AUTH_PAGES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };
