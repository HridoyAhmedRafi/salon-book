import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const isBlocked = session?.user?.isBlocked;
  const pathname = request.nextUrl.pathname;

  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (
    isBlocked &&
    pathname !== `/dashboard/${user.role}/profile` &&
    pathname !== "/services"
  ) {
    return NextResponse.redirect(new URL("/blocked", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/services/:path", "/dashboard/:path*"],
};
