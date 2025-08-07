import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId, redirectToSignIn } = await auth();

  const url = req.nextUrl;

  // Protect all non-public routes
  if (!isPublicRoute(req)) {
    await auth();
    return NextResponse.next();
  }

  // === Redirect authenticated users away from "/" ===
  if (url.pathname === "/" && userId) {
    if (orgId) {
      // User has an active organization — redirect to it
      return NextResponse.redirect(new URL(`/organization/${orgId}`, req.url));
    } else {
      // No active organization — redirect to /select-org
      return NextResponse.redirect(new URL("/select-org", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip static and internal Next.js files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
