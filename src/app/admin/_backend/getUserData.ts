import db from "@/db/db";
import { Food } from "@/models/foodModel";
import Order from "@/models/orderModel";
import { User } from "@/models/userModel";
import { connectDB } from "@/utils/constants";

const getUserData = async()=>{
     await connectDB();
    const userCount  = await User.countDocuments({});

         let orderdata:any
         if(await Order.find()){
           orderdata =   await Order?.aggregate([
                { $group: {
                    _id:null,
                    sum: { $sum: "$amount"}
                }}
         ])
         }

    return {
     userCount,
     averageValuePerUser: userCount === 0 ? 0: ((((orderdata[0]?.sum || 0) / userCount )/ 100)*80)
    }
 }

 export default getUserData