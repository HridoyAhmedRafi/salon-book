import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { auth } from "./lib/auth";
// import { headers } from "next/headers";

// export async function proxy(request: NextRequest) {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const user = session?.user;
//   const isBlocked = session?.user?.isBlocked;
//   const pathname = request.nextUrl.pathname;

//   if (!user) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   if (
//     isBlocked &&
//     pathname !== `/dashboard/${user.role}/profile` &&
//     pathname !== "/services"
//   ) {
//     return NextResponse.redirect(new URL("/blocked", request.url));
//   }

//   return NextResponse.next();
// }

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

type SessionResponse = {
  user?: {
    role?: string;
    isBlocked?: boolean;
  };
} | null;

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const redirectToSignIn = () => {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set(
      "redirect",
      `${pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(signInUrl);
  };

  // 1. Cookie na thakle kono API/DB call charai direct /sign-in e pathabe
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    return redirectToSignIn();
  }

  // 2. Direct auth.api.getSession() er bodole API route theke session fetch
  let session: SessionResponse = null;
  try {
    const res = await fetch(new URL("/api/auth/get-session", request.url), {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
      cache: "no-store",
    });

    if (res.ok) {
      session = await res.json();
    }
  } catch {
    return redirectToSignIn();
  }

  const user = session?.user;
  const isBlocked = user?.isBlocked;

  if (!user) {
    return redirectToSignIn();
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
