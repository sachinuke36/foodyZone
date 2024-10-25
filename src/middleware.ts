export const runtime = 'nodejs'
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
import { auth } from "./auth";

// export { auth as middleware } from "@/auth"

 const middleware = async (req:NextRequest)=>{
    const cookis = cookies().get('_Secure-authjs.session-token');
    // console.log(cookis, process.env.AUTH_SECRET)
    let user = await decode({token:cookis?.value!,
      salt:cookis?.name!,
      secret:process.env.AUTH_SECRET!

    })
    const session = await auth();
    console.log(cookis, "cookis");
    console.log("from middleware",user)
    console.log("from middleware", session)
    if(req.nextUrl.pathname.startsWith('/admin')){
      const url = new URL("/admin", req.nextUrl.origin);
      if(user?.role !== "admin") return NextResponse.redirect('http://localhost:3000/')
      else return NextResponse.next();
    }

    if(!user){
      return NextResponse.redirect(new URL('/usernotfound',req.nextUrl.origin))
    }


}
export default middleware;


export const config={
  matcher:['/admin(.*)','/orders','/cart','/checkout','/verify(.*)']
}








// export default middleware= async((req:NextRequest) => {
 
// console.log()
//   if (req.auth?.user.role ==="admin" && req.nextUrl.pathname.startsWith("/admin")) {
//     const newUrl = new URL("/admin", req.nextUrl.origin)
//     return Response.redirect(newUrl)
//   }
//   return Response.redirect('/')
// })


// export default function middleware(req:NextRequest){
//     auth((req)=>{
//         console.log(req)
//     })
// }



// import { NextRequest, NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import { auth } from '@/auth';
// import { headers } from 'next/headers'
// import { NextRequest } from 'next/server';


// export async function middleware(req:NextRequest) {
//   const token = await getToken({ req, secret: process.env.AUTH_SECRET });
//   console.log("token",token)
//   const headers =  headers();
//   const proto = headers.get('x-forwarded-proto');
//   const host = headers.get('x-forwarded-host');

//   // Define your protected routes
//   const protectedRoutes = ['/admin'];

//   if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) && !token) {
//     // Redirect to login if not authenticated
//     return NextResponse.redirect(new URL('/', req.url));
//   }

//   if (token && token.role === 'admin') {
//     return NextResponse.next();
//   }

//   // Redirect if not admin and trying to access admin routes
//   return NextResponse.redirect(new URL('/', req.url));
// }

// export const config = {
//   matcher: ['/admin/:path*'], // Apply to all admin routes
// };




// import type { NextRequest } from 'next/server'
 
// export function middleware(request: NextRequest) {
    
//   const currentUser = request.cookies.get('currentUser')?.value
//   console.log(currentUser)
 
//   if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
//     return Response.redirect(new URL('/dashboard', request.url))
//   }
 
//   if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
//     return Response.redirect(new URL('/login', request.url))
//   }
// }
 
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }


// // middleware.ts
// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt"; // Import getToken to check session token
// import { auth } from "@/auth"; // Import auth from your auth module

// // Define your middleware function
// export const middleware = auth(async (req) => {
//   // Get the user's token from the request
// //   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
// // console.log("chal rja")
//   // If the user is accessing the admin route
//   if (req.nextUrl.pathname.startsWith("/admin")) {
//     // Check if the user is authenticated and is an admin
//     if (req.auth?.user.role ==="admin" && req.nextUrl.pathname.startsWith("/admin")) {
//             const newUrl = new URL("/admin", req.nextUrl.origin)
//             return Response.redirect(newUrl)
//           }
//   }

//   // Proceed to the requested page if the user is an admin
//   return NextResponse.next();
// });

// // Define the matcher to apply middleware to specific routes
// export const config = {
//   matcher: ['/admin/:path*'], // Protect all routes under /admin
// };




