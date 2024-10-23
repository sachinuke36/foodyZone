import db from "@/db/db"
import Order from "@/models/orderModel";
import { connectDB } from "@/utils/constants";

const getSalesData = async()=>{
    await connectDB()
    let data:any
    if(await Order.find()){
         data =   await Order?.aggregate([
            { $group: {
                _id:null,
                sum: { $sum: "$amount"},
                count: {$sum: 1}
            }}
     ])
    }

// console.log(data)
    // const data = await db.order.aggregate({
        // _sum:{pricePaid:true},
        // _count:true
    // });
    // console.log("data",data);
    return {amount: ((data[0]?.sum || 0)/ 100)*80,
        numberOfSales: Number(data[0]?.count)
    };
}
export default getSalesData; 