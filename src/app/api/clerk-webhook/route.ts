// import { NextRequest, NextResponse } from 'next/server';
// import db from "@/db/db"; // Prisma client

// // Clerk SDK for webhook verification
// import { Webhook } from '@clerk/clerk-sdk-node';
// import { auth } from '@clerk/nextjs/server';
// // import { Webhook } from '@';
// const {userId} = auth()

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     // Verify Clerk webhook and get event
//     const clerkEvent = Webhook.verify(body, process.env.CLERK_API_KEY!);

//     // Only handle the `user.created` event
//     if (clerkEvent.type === 'user.created') {
//       const { id, email_addresses, first_name, last_name } = clerkEvent.data;

//       // Create a new address for the user (You may want to customize this)
//       const newAddress = await db.address.create({
//         data: {
//           street: 'default street', // Replace with actual data or form input
//           city: 'default city',     // Replace with actual data or form input
//           postalCode: '12345',
//           country:'india',
//           userId : userId || ""        
//         },
//       });

//       // Store the new user in your Prisma SQLite database
//       const newUser = await db.user.create({
//         data: {
//         //   clerkId: id, // Store the Clerk user ID
//           email: email_addresses[0]?.email_address, // User's primary email
//           name: `${first_name} ${last_name}`, // Concatenated first and last name
//           addressId: newAddress.id, // Associate with newly created address
//           password: '', // Leave empty if you're using Clerk for authentication
//           isAdmin: false, // By default, users aren't admins
//         },
//       });

//       return NextResponse.json({ message: 'User saved to the database.', user: newUser });
//     }

//     return NextResponse.json({ message: 'No action taken.' }, { status: 200 });
//   } catch (error) {
//     console.error('Error saving user:', error);
//     return NextResponse.json({ error: 'Error processing webhook.' }, { status: 500 });
//   }
// }
