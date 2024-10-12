import NextAuth from "next-auth";
import { DefaultUser } from "next-auth";
import { User as AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User extends AdapterUser {
    role?: string; // Optional, as it might not always be defined
  }
}