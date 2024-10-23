
"use server"

import { auth } from "@/auth"
import { Food } from "@/models/foodModel";
import Order from "@/models/orderModel"
import { User } from "@/models/userModel"
import { z } from "zod";
import getOrderInfo from "./getOrderInfo";
import Stripe from "stripe";
import { connectDB } from "@/utils/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


const frontend_url = 'http://localhost:3000'

// Schema for adding a new food item
 const indianAddressSchema = z.object({
    fname: z.string().min(1, { message: "First name is required" }),
    lname: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    street: z.string().min(1, { message: "Street is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    pin: z.string()
      .regex(/^\d{6}$/, { message: "Invalid PIN code" }), 
    country: z.string().min(1, { message: "Country is required" }).default("India"), 
    phone: z.string()
      .regex(/^(?:\+91|91|0)?[6789]\d{9}$/, { message: "Invalid phone number" }) 
  });

export const placeOrder = async ( orderItems: Object,subtotal: number, formData: FormData) => {
    // console.log("yaha aya tha")
    console.log(formData)
   await connectDB()
    const formDataObject = Object.fromEntries(formData.entries());


    const result = indianAddressSchema.safeParse(formDataObject);
    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }
      const data = result.data;
      console.log(data)


       const session = await auth()
       const user = await User.find({email:session?.user.email});
       const food = await Food.find({});
       const {cartData} = await getOrderInfo();

    //    console.log("hiiiiiiiii",{
    //     userId: user[0]._id.toString(),
    //     items: orderItems,
    //     amount: subtotal,
    //     address: data
    //    })

       const newOrder =  await  Order.create({
            userId: user[0]._id,
            items: orderItems,
            amount: (subtotal + 200) ,
            address: data   
        })
        // console.log("New order created:", newOrder); // Debugging
        await User.findByIdAndUpdate(user[0]._id,{cartData:{}}); // empty cart

        // console.log("cartData",cartData)
        // let line_item = food.map((item)=>{
        //     if(cartData[item._id]>0){

        //         return ({ price_data:{
        //             currency : "inr",
        //             product_data :{
        //                 name: item.name
        //             },
        //             unit_amount : item.price * 100 
        //         },
        //         quantity: cartData[item._id]
        //     })}}) 
            // console.log("line-items-first",line_item);


            let line_item = food.map(item => {
                if (cartData[item._id] > 0) {
                    return {
                        price_data: {
                            currency: "inr",
                            product_data: {
                                name: item.name,
                            },
                            unit_amount: item.price * 80, 
                        },
                        quantity: cartData[item._id],
                    };
                }
                return null; 
            }).filter(item => item !== null); 

            line_item.push({ price_data:{
                currency : "inr",
                product_data :{
                    name: 'Delivery Charge'
                },
                unit_amount : 2 * 100 * 80 
            },
            quantity:  1
               })

               const StripeSession = await stripe.checkout.sessions.create({line_items: line_item,
                mode:'payment',
                success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
            })
            return {success:true, session_url: StripeSession.url}

    
    
      }