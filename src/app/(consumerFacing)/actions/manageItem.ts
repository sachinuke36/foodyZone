"use server"

import { User } from "@/models/userModel";
import { connectDB } from "@/utils/constants"

export const addItem = async(quantity:number,foodId:string, userId:string)=>{
    await connectDB();
    await User.findByIdAndUpdate(userId
        ,{
       $inc:{[`cartData.${foodId}`]:1}
    });
}



export const removeItem = async(quantity:number,foodId:string, userId:string)=>{

    await connectDB();
    await User.findByIdAndUpdate(userId
        ,{
       $inc:{[`cartData.${foodId}`]:-1}
    });
}