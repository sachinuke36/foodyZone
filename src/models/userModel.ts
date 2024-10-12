import mongoose from 'mongoose'
import { Schema, Document, Types } from 'mongoose';

export interface IUser {
    _id: Types.ObjectId; // Include the _id field
    name: string;
    email: string;
    password?: string; // Optional because `select: false` makes it non-required when querying
    isAdmin: boolean;
    googleId?: string; // Optional field if Google OAuth isn't used
    image?: string; // Optional profile image
    stripeId?: string; // Optional Stripe customer ID
    role: string; // Defaults to 'user'
    isVerified: boolean; // Indicates if email is verified
    cartData?: object; // Can store cart-related information
    createdAt?: Date; // Added due to timestamps (from Mongoose schema)
    updatedAt?: Date; // Added due to timestamps (from Mongoose schema)
  }


const UserSchema = new mongoose.Schema({
    name:{type:String, required: true},
    email:{type:String, required: true, unique:true},
    password:{type:String, required:false, select:false},
    isAdmin:{type:Boolean, required:true, default:false},
    googleId:{type: String},
    image:{type:String},
    stripeId:{type:String, required:false},
    role:{type:String, required:true, default:'user'},
    isVerified:{type: Boolean, default:false},
    cartData:{type:Object, defaul:{}},

},{minimize:false,timestamp:true});


export const User = mongoose.models?.User || mongoose.model("User",UserSchema);