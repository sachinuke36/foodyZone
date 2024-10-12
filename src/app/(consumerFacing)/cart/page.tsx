import { auth } from "@/auth";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/formatter";
import { Food } from "@/models/foodModel";
import { User } from "@/models/userModel";
import { connectDB } from "@/utils/constants"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import Image from "next/image";
import AddAndRemoveButton from "../components/AddAndRemoveButton";
import { Button } from "@/components/ui/button";
import ProceedToCheckout from "../components/ProceedToCheckout";
import { Heading1 } from "lucide-react";

const CartPage = async() => {
    await connectDB();
    const session = await auth();
    // const cookis = cookies().get('authjs.session-token')
    // let user = await decode({token:cookis?.value!,
    //   salt:cookis?.name!,
    //   secret:process.env.AUTH_SECRET!

    // })
    // console.log("user from cartpage", user);
    // console.log("cartPage",session)
    const foodlist = await Food.find();
    // console.log("foodlist from cart page", foodlist);

    const user = await User.find({email: session?.user.email});
    const cartInfo = user[0]?.cartData;
    // console.log("from cartPage",cartInfo)
// console.log("cartData",cartInfo);

// if (Object.entries(cartInfo).every(([key, val]) => val == 0)) {
//   // console.log(val)
//   return (
//     <div className="w-[80%] mx-auto flex flex-col justify-center">
//         <h1 className="  text-center mt-[30vh] text-[22px] font-extrabold">Your cart is empty</h1>
//         <img src="https://cdn-icons-png.flaticon.com/512/2762/2762885.png" className="w-[200px]  mx-auto " alt="empty-cart" />
//     </div>
  
//   );
// }
 let subtotal = 0;
  return (
    <div className="flex flex-col gap-10 w-[80%] mx-auto  my-5">
      <Table className=" ">
         <TableHeader>
            <TableRow>
               <TableHead>Items</TableHead>
               <TableHead>Name</TableHead>
               <TableHead>Price</TableHead>
               <TableHead>Quantity</TableHead>
               <TableHead>Total</TableHead>
            </TableRow>
         </TableHeader>
           {
              foodlist.map((item)=>{

                if(cartInfo && cartInfo[item._id]>0){
                  subtotal += cartInfo[item._id]*item.price
                  return ( <TableBody key={item._id}>
                    <TableRow>
                      <TableCell className="font-medium"><Image alt='product image' height="40" width="40" src={item.image}/></TableCell>
                      <TableCell>{ item.name }</TableCell>
                      <TableCell>{ formatCurrency(item.price / 100) }</TableCell>
                      <AddAndRemoveButton foodId={item._id.toString()} userId={user[0]._id.toString()}  quantity={cartInfo[item._id]}/>
                      <TableCell >{formatCurrency((item.price / 100) * cartInfo[item._id])}</TableCell>
                    </TableRow>
                    <div/>
                  </TableBody>
                  )
                }
             })
           }
      </Table>
        <CartTotal subtotal={subtotal} />

    </div>

  )
}

export default CartPage


const CartTotal = ({subtotal}:{subtotal:number})=>{
  return <div className="w-[40%] flex flex-col gap-2">
    <h1 className="text-[22px] font-extrabold">Cart Total</h1>
     <Table>
        <TableBody>
          <TableRow>
           <TableCell>Subtotal</TableCell>
           <TableCell> {formatCurrency(subtotal/100)}</TableCell>
          </TableRow>
          <TableRow>
           <TableCell>Delivery charge</TableCell>
           <TableCell> {formatCurrency(2)}</TableCell>
          </TableRow>
          <TableRow className="font-extrabold">
           <TableCell >Total</TableCell>
           <TableCell> {formatCurrency(subtotal/100 + 2)}</TableCell>
          </TableRow>
        </TableBody>
     </Table>
     <ProceedToCheckout />
  </div>
}