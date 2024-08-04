import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import config from "../config/config";

const stripe = new Stripe(config.stripeSecretKey!, {
  apiVersion: '2024-06-20',
});


export const createOrderWithoutUserHandler = async (req: Request,  res: Response,  next: NextFunction ) => {
  
  const { orderItems, totalAmount, orderId, date} = req.body

  const session = await stripe.checkout.sessions.create({
    line_items: orderItems.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.thumbnail],
        },
        unit_amount: item.price * 100, // Convert to cents
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${config.clientUrl}/success`,
    cancel_url: `${config.clientUrl}/cancel`,
  });
  console.log('session', session);
  
  res.status(201).json({
    success: true,
    orderId,
    orderItems,
    totalAmount,
    date,
    stripeSession: session,
  })
  // console.log('orderItems', orderItems);
  // console.log('totalAmount', totalAmount);
  console.log('orderId', orderId);
  console.log('date', date);
  
}

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_24feb2f77660832117972446e2b6a74b643245fc1c0941f6fe1589f44fb091b0";

// STRIPE WEBHOOK
export const stripeWebhookHandler = async (req: Request, res: Response, next: NextFunction) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
}