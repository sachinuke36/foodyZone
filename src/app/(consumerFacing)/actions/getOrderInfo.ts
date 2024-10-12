import { auth } from "@/auth";
import { Food } from "@/models/foodModel";
import { User } from "@/models/userModel";
import { connectDB } from "@/utils/constants";

const getOrderInfo = async () => {
await connectDB();
const session = await auth();
const foodData = await Food.find({});
// console.log("foodData",foodData)
// console.log(session)
const user = await User.find({email:session?.user.email});
const cartData = user[0].cartData;
let total = 0;
 foodData.forEach((item)=>{
  if(cartData[item._id] > 0){
      total += item.price * cartData[item._id]
  }
})
  return {
    user,cartData,total
  }
}

export default getOrderInfo
