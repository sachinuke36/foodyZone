// app/api/webhooks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectDB } from '@/utils/constants';
import Order from '@/models/orderModel'; // Your Order model
// import { buffer } from 'micro';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-09-30.acacia',
});

// Disable the body parser (required for Stripe signature validation)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Webhook Handler
export async function POST(req: NextRequest) {
  console.log("webhook se")
  const sig = req.headers.get('stripe-signature') || '';
  let event;

  try {
    const buf = await req.arrayBuffer(); // Use arrayBuffer for raw body
    const rawBody = Buffer.from(buf);
    
    // Verify Stripe signature
    event = stripe.webhooks.constructEvent(
      rawBody.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error('Error verifying webhook signature:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    // Get the orderId from metadata
    const orderId = paymentIntent.metadata.orderId;
    console.log("orderId",orderId)

    // Update the order in the database
    await connectDB();
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { payment: true }, // Update the payment field to true
        { new: true } // Return the updated document
      );

      console.log('Order payment updated:', updatedOrder);
    } catch (error) {
      console.error('Error updating order payment status:', error);
      return NextResponse.json({ error: 'Error updating order' }, { status: 500 });
    }
  }

  // Return 200 response to Stripe
  return NextResponse.json({ received: true }, { status: 200 });
}
