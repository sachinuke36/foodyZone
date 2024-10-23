import { auth } from "@/auth"
import { Table, TableBody, TableCell } from "@/components/ui/table"
import Order from "@/models/orderModel";
import { User } from "@/models/userModel";
import { getFoodData } from "../actions/getFoodData";
import Image from "next/image";
import { formatNumber } from "@/lib/formatter";
import { connectDB } from "@/utils/constants";

const OrderPage = async() => {
    await connectDB()
    const session = await auth();
    const userData = await User.find({email:session?.user.email});
    const orderData = await Order.find({
        userId:userData[0]._id,
        payment:true
    }).sort({date:-1});
    const food = await getFoodData();
    

  return (
    <div className="w-[100%] px-2 md:w-[80%] mt-5 mx-auto">
        <h1 className="text-[22px] font-extrabold">My orders</h1>
       
        <Table className=" my-5">
        

            {
                orderData.map((order)=>{
                    let foodMap:{[name:string]:number} = {};

                    order.items.forEach((item:Object) => {
                        Object.entries(item).forEach(([foodId, quantity]) => {
                            // Find the corresponding food item
                            const foodItem = food.find((f) => f._id == foodId);
                            if (foodItem) {
                                foodMap[foodItem.name] = quantity;
                            }
                        });
                    });
                    let orderString='';
                    let totalQuantity= 0
                     Object.entries(foodMap).forEach(([name,quantity])=>{
                     orderString += `${name}x${quantity}, `
                     totalQuantity += quantity as number
                    })
                    return (
                        <TableBody className="border" key={order._id}>
                            <TableCell>{orderString}</TableCell>
                            <TableCell>Rs.{formatNumber((order.amount / 100)*80)}</TableCell>
                            <TableCell>{totalQuantity}</TableCell>
                            <TableCell>{order.status}</TableCell>
                        </TableBody>
                    )
                })
            }


        
            
        </Table>
        
    </div>
  )
}

export default OrderPage
