import { auth } from "@/auth"
import DeliveryInformationForm from "../components/DeliveryInformationForm"
import { TableBody,Table, TableCell, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/formatter"
import { User } from "@/models/userModel"
import { connectDB } from "@/utils/constants"
import { Food } from "@/models/foodModel"
import getOrderInfo from "../actions/getOrderInfo"

const CheckoutPage =async () => {
const {cartData, total, user} = await getOrderInfo()

// console.log("total",formatCurrency(total/100))
// console.log("type of cartData", typeof(cartData))
  return (
    <div className=" md:w-[80%]  w-[90%] mt-10 mx-auto flex md:flex-row gap-2 flex-col   justify-evenly" >
      <DeliveryInformationForm orderItems={cartData} subtotal={total} userId={user[0]._id.toString()} />
      <div className="md:w-[50%] w-[90%]">
        <CartTotal subtotal={total}/>
      </div>
    </div>
  )
}

export default CheckoutPage



const CartTotal = ({subtotal}:{subtotal:number})=>{
  return <div className="w-[80%]  flex flex-col gap-2">
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
  </div>
}