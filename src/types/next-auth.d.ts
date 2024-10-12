import NextAuth from "next-auth";


declare module "next-auth"{
    interface User{
        _id:string,
        name?: string;
        email?: string;
        image?: string;

    }
    interface Session{
        user: User
    }
}