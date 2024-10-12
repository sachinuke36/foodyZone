import { IUser, User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
     const {email, items} = await req.json();
     let userData = await User.find({email});
     if(!userData[0]?.cartData){
        await User.findOneAndUpdate(
            {email:email},
            {
                cartData: items
            },{
                new:true
            })
     }else{
        Object.entries(items).forEach(([key,val])=>{
                if(userData[0].cartData[key] !== undefined){
                    userData[0].cartData[key] += val;
                }else{
                    userData[0].cartData[key] = val;
                }
        })
          await User.findOneAndUpdate(
            {email:email},
            {
                cartData: userData[0].cartData
            },{
                new:true
            })
     }
     return NextResponse.json({message:"Items added to cart successfull"},{status:200})
    } catch (error) {
        console.log(error)
    }

}