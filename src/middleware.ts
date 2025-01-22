import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));


// console.log(matchers);

export default clerkMiddleware(async (auth, req) => {
  // if (isProtectedRoute(req)) {
  //   await auth().protect()
  // }

  const authObject = await auth();
  const { sessionClaims } = authObject;

  const role = (sessionClaims?.metadate as { role?: string })?.role;
  
  // console.log("Session Claims:", sessionClaims);
  // console.log("Extracted Role:", role);

  

  for (const { matcher, allowedRoles } of matchers) {
    // if (matcher(req) && !allowedRoles.includes(role!)) {
    //   return NextResponse.redirect(new URL(`/${role}`, req.url));
    // }

    if (matcher(req)) {
      console.log(`Route matched: ${req.url}`);
      console.log(`Allowed roles for route: ${allowedRoles}`);
      console.log(!allowedRoles.includes(role!))
      if (!allowedRoles.includes(role!)) {
        if (!role) {
          return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.redirect(new URL(`/${role}`, req.url));
      }
    }
  }

  return NextResponse.next();
}); 

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};