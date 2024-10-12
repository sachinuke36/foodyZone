import db from "@/db/db"
import { Food } from "@/models/foodModel";
import { connectDB } from "@/utils/constants";

const getProductData = async () =>{
    await connectDB()
    const [activeCount, inActiveCount] = await Promise.all([ Food.countDocuments(
        { isAvailable:true}
      ),
      Food.countDocuments(
          { isAvailable:false}
      )])
     
      return{
          activeCount, inActiveCount
      }
  }
  export default getProductData;
