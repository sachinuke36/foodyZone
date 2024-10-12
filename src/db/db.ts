import { PrismaClient } from "@prisma/client";
export const runtime = 'nodejs';
const PrismaClientSingleton = () =>{
    return new PrismaClient;
} 

declare global {
    var prisma : undefined | ReturnType<typeof PrismaClientSingleton>
}

const db = globalThis.prisma ?? PrismaClientSingleton()

export default db

if(process.env.NODE_ENV !== 'production') globalThis.prisma = db;