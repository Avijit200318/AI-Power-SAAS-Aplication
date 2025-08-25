import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoutes = createRouteMatcher([
    "/",
    "/home",
    "/sign-up",
    "/sign-in"
]);

const isPublicApiRoutes = createRouteMatcher([
    "/api/videos"
])

// see documentation for specific secure routes
export default clerkMiddleware((auth, req) => {
    const { userId } = auth();
    const currentUrl = new URL(req.url);

    // if someone is requesting for dashboard which is also home for our project
    const isAccessingDashboard = currentUrl.pathname === "/home";
    const isApiRequest = currentUrl.pathname.startsWith("/api");

    // if user logged in and if he want to access public routes but not dashboard

    if(userId && isPublicRoutes(req) && !isAccessingDashboard){
        return NextResponse.redirect(new URL("/home", req.url));
    }
    // not logged in
    if(!userId){
        // if the user is not loggedin an dtry to access a protected route and also api
        if(!isPublicRoutes(req) && !isPublicApiRoutes(req)){
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }

        // if the user is not loggedin and try to access a protected api routes
        if(isApiRequest && !isPublicApiRoutes(req)){
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }
    }
    return NextResponse.next();
});

export const config = {
  matcher: [
  "/((?!.*\\..*|_next).*)", 
    //   This ensures middleware does NOT run on: static assets (/logo.png, /styles.css, /script.js). Next.js internals (/_next/...)
  "/",
    //   This explicitly includes the root route (/), so middleware always runs there.
  "/(api|trpc)(.*)"
    //   This matches all API routes: /api/...  /trpc/...   So middleware always runs for backend API calls too.
]
};