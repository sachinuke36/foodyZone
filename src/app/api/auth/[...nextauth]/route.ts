import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers


// import { auth } from "@/auth"
 
// export default auth((req) => {
//   if (req.auth?.user?.isAdmin && req.nextUrl.pathname.startsWith("/admin")) {
//     const newUrl = new URL("/admin", req.nextUrl.origin)
//     return Response.redirect(newUrl)
//   }
// })





// import { NextResponse } from 'next/server';
// // import { currentUser, auth } from '@clerk/nextjs';
// import { PrismaClient } from '@prisma/client';
// import { auth, currentUser } from '@clerk/nextjs/server';
// import db from '@/db/db';

// // const prisma = new PrismaClient();

// export async function GET() {
//   const { userId,  } = auth();
//   // console.log("yaha aya tha")
//   if (!userId) {
//     return new NextResponse('Unauthorized', { status: 401 });
//   }

//   // Get user's information
//   const user = await currentUser();
//   if (!user) {
//     return new NextResponse('User not exist', { status: 404 });
//   }

//   let dbUser = await db.user.findUnique({
//     where: { id: user.id },
//   });

// //   if (!dbUser) {
// //     dbUser = await db.user.create({
// //       data: {
// //         id: user.id,
// //         name: user.firstName ?? '',
// //         // lastName: user.lastName ?? '',
// //         email: user.emailAddresses[0].emailAddress ?? '',
       

// //       },
// //     });
// //   }

//   if (!dbUser) {
//     return new NextResponse(null, {
//       status: 302, // 302 Found - temporary redirect
//       headers: {
//         Location: 'https://go.bradi.tech/api/auth/new-user',
//       },
//     });
//   }
//   // Perform your Route Handler's logic with the returned user object

//   return new NextResponse(null, {
//     status: 302, // 302 Found - temporary redirect
//     headers: {
//       Location: 'https://go.bradi.tech/dashboard',
//     },
//   });

// }

