
import { NextApiRequest, NextApiResponse } from 'next';
import Order from '@/models/orderModel'; // Assuming you have an order model
import { connectDB } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';

export  async function POST(req: NextRequest, params:{params:{orderId:string}}, res: NextApiResponse) {
//   console.log("body of request",await req.json())
// console.log("jhihhk")
const {success} = await req.json()
 const orderId = params.params.orderId // This extracts `orderId` from the URL
//  console.log(success,orderId)

// return res.status(200);

// console.log("orderId",orderId)
  try {
   await connectDB()
    const order = await Order.findById(orderId);
    // console.log("order",order);
    if (!order) {
        return NextResponse.json({message:'Order not found'},{status:404})
    //   return res.status(404).json({ message: '' });
    }else{
        await Order.findByIdAndUpdate(orderId,{payment:true})
        return  NextResponse.json(order,{status:200})
    }
//    return res.status(200).json(order);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching order details' },{status:500})
//    return res.status(500).json({ message: 'Error fetching order details' });
  }
}
