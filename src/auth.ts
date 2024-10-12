import NextAuth, { AuthError } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {prisma} from "@/prisma"
import Google from "next-auth/providers/google"
import { connectDB, stripe } from "./utils/constants"
import { PrismaClient } from "@prisma/client"
import { User } from "./models/userModel"


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId:process.env.AUTH_GOOGLE_ID,
      clientSecret:process.env.AUTH_GOOGLE_SECRET,
      profile(profile) {
        return { id: profile.id,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            role: profile.role  }
      }
    })
  ],

  callbacks: {
    signIn: async({ user, account, profile, email })=>{
        if(account?.provider === "google"){
          try {
            const {email, name, image, id, role} = user;
            console.log("role from google",role)

            await connectDB();
            const alreadyUser = await User.findOne({email});
            if(!alreadyUser){
              const customer = await stripe.customers.create({
                email: user.email!,
                name: user.name!,
            })
              await User.create({
                email, name, image, googleId:id,role,stripeId:customer.id
              })

              
                // console.log("user create")
                  
                  
            }
            return true;
          } catch (error) {
            throw new AuthError("Error while creating user")

          }
        }
        return false;
    },
    
    async  jwt({token, user}){
      if(user){
        const u = await User.findOne({email:user.email});
        token.role = u.role as string;
      }
      return token;

    },
    // session({ session, user }) {
    //   session.user.role = user.role
    //   return session
    // }
  },
  // events:{
  //   createUser: async({user})=>{
  //     console.log("user create")
  //       const customer = await stripe.customers.create({
  //           email: user.email!,
  //           name: user.name!,
  //       })
  //       await User.findOneAndUpdate(
  //           {
  //               _id: user.id,
  //           },
  //           {
  //               stripeId:customer.id,
  //           }
  //       )
  //   }
  // }, // to implement this we need an adapter for mongoose but auth js doesn't have it but we can make our custom 
  session:{
    strategy:'jwt'
  },
  
})



// // auth.ts
// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/prisma";
// import GoogleProvider from "next-auth/providers/google"; // Ensure you're using the correct import for GoogleProvider
// import { stripe } from "./utils/constants";

// // NextAuth options
// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   events: {
//     createUser: async ({ user }) => {
//       const customer = await stripe.customers.create({
//         email: user.email!,
//         name: user.name!,
//       });
//       await prisma.user.update({
//         where: {
//           id: user.id,
//         },
//         data: {
//           stripeId: customer.id,
//         },
//       });
//     },
//   },
// };

// // Export handlers
// const authHandler = NextAuth(authOptions);
// export const handlers = {
//   GET: authHandler,
//   POST: authHandler,
// };

// export default authHandler; // Default export for API route usage
