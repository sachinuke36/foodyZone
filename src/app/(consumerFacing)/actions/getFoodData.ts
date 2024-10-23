import { auth } from "@/auth";
import { Food } from "@/models/foodModel";
import { User } from "@/models/userModel";
import { connectDB } from "@/utils/constants"

export const getFoodData = async()=>{
    await connectDB();
    const session = await auth();
    await User.find({email:session?.user.email});
    const foodData = await Food.find({});
    // console.log("foodData",foodData)
    return foodData;
}

