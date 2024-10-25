import NextAuth, { AuthError } from "next-auth"
import Google from "next-auth/providers/google"
import { connectDB, stripe } from "./utils/constants"
import { User } from "./models/userModel"


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId:process.env.AUTH_GOOGLE_ID,
      clientSecret:process.env.AUTH_GOOGLE_SECRET,
    async  profile(profile) {
      console.log(profile);
      await connectDB();
      const existingUser = await User.findOne({ email: profile.email });
      // console.log("existingUser",existingUser);
      console.log("auth_google id",process.env.AUTH_GOOGLE_ID)
      if (existingUser) {
        return {
          id: existingUser.googleId,
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          image: existingUser.image,
          role: existingUser.role,
        };
      }
      return {
        id: profile.sub,
        _id: null,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        role: "user", 
      };
    },
  }),
  ],

  callbacks: {
    signIn: async({ user, account, profile, email })=>{
        if(account?.provider === "google"){
          try {
            const {email, name, image, id, role} = user;
            // console.log("role from google",role)

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
        token.role = u?.role as string ?? "user";
      }
      return token;

    },
    session({ session, user }) {
      session.user.role = user.role
      return session
    }
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



