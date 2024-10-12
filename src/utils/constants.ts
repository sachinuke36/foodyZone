import mongoose from 'mongoose';
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
    apiVersion:"2024-09-30.acacia"
});
console.log(process.env.STRIPE_SECRET_KEY);
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key is missing. Please set STRIPE_SECRET_KEY in your environment variables.');
  }


export const connectDB = async()=>{
    try {
        if(mongoose.connections && mongoose.connections[0].readyState) return
        const {connection} = await mongoose.connect(
            process.env.MONGO_URI as string,
        )

        console.log(`Connected to database: ${connection.host}`);

    } catch (error) {
        console.log(error);
        throw new Error('Error connecting Database');
    }
}