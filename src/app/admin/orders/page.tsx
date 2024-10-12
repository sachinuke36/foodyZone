import { getFoodData } from "@/app/(consumerFacing)/actions/getFoodData";
import { auth } from "@/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell } from "@/components/ui/table";
import { formatNumber } from "@/lib/formatter";
import Order from "@/models/orderModel";
import { User } from "@/models/userModel";
import { connectDB } from "@/utils/constants";
import Image from "next/image";
import { redirect } from "next/navigation";

const AdminOrdersPage = async () => {
    const orderData = await Order.find({
        payment: true
    });
    console.log(orderData);
    const session = await auth();
    const userData = await User.find({ email: session?.user.email });

    const food = await getFoodData();





    return (
        <div className="w-[80%] mx-auto">
            <Table>
                {
                    orderData.map((order) => {
                        let foodMap = {};

                        order.items.forEach((item: Object) => {
                            Object.entries(item).forEach(([foodId, quantity]) => {
                                // Find the corresponding food item
                                const foodItem = food.find((f) => f._id == foodId);
                                if (foodItem) {
                                    foodMap[foodItem.name] = quantity;
                                }
                            });
                        });
                        let orderString = '';
                        let totalQuantity = 0
                        Object.entries(foodMap).forEach(([name, quantity]) => {
                            orderString += `${name}x${quantity}, `
                            totalQuantity += quantity as number
                        })
                        return (
                            <TableBody className="border" key={order._id}>
                                <TableCell>
                                    <Image src={'/parcel_icon.png'} alt="parcel" width={50} height={50} />
                                </TableCell>
                                <TableCell >
                                    <div>{orderString}</div>
                                    <div className="font-extrabold mb-4">{`${order.address.fname} ${order.address.lname}`}</div>
                                    <div className="">{`${order.address.street}`}</div>
                                    <div className="">{`${order.address.city}, ${order.address.state}, ${order.address.pin}`}</div>
                                    <div className="">{`${order.address.phone}`}</div>
                                </TableCell>
                                <TableCell>Rs.{formatNumber((order.amount / 100) * 80)}</TableCell>
                                <TableCell>{totalQuantity}</TableCell>
                                <TableCell>

                                    
                                <StatusForm status={order.status} orderId={order._id}/>
                                    
                                </TableCell>

                            </TableBody>
                        )
                    })
                }


            </Table>

        </div>
    )
}

export default AdminOrdersPage


const StatusForm = ({status,orderId}:{status:string,orderId:string})=>{
    return (<Select name='status' onValueChange={async(newStatus)=>{
            "use server"
            await connectDB();
            
           const res = await Order.findByIdAndUpdate(orderId,{status:newStatus});
           if(res) redirect('/admin/orders')

    }}  defaultValue={status} >
    <SelectTrigger className="w-[180px]">
        {status}
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="Food processing">Food processing</SelectItem>
        <SelectItem value="Out for delivery">Out for delivery</SelectItem>
        <SelectItem value="Delivered">Delivered</SelectItem>
    </SelectContent>
</Select>)
   
}
