import mongoose, {Schema,Document} from "mongoose";

export interface IFood extends Document {
    name: string;
    _id: string;
    description: string;
    price: number;
    image: string;
    category: string;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
const FoodSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price: {type: Number, required:true},
    image: {type: String, required: true},
    category: {type: String, required: true},
    isAvailable:{type:Boolean, default:false},
    orders:{type:Object, default:{}}
},{timestamps:true});

export const Food = mongoose.models?.Food || mongoose.model('Food',FoodSchema);