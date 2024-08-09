import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import config from "../config/config";
import { Order } from "../models/order.model";
import { createOrder, deleteUnpainOrders } from "../services/order.services";
import ErrorHandler from "../utils/errorClass";

const stripe = new Stripe(config.stripeSecretKey!, {
  apiVersion: '2024-06-20',
});

export const createOrderWithoutUserHandler = async (req: Request,  res: Response,  next: NextFunction ) => {
  
  const { orderItems, totalAmount, orderId } = req.body

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
    payment_method_types: ['card'],
    shipping_address_collection: { allowed_countries: ['US','AE'] },
  });

  const orderCreated = createOrder(orderItems, totalAmount, orderId, session.id, session.payment_status)

  if (!orderCreated) next(new ErrorHandler(400, 'Order not created'))
  
  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    stripeSession: session,
  })
  
}

const endpointSecret = config.endpointSecret!;

// STRIPE WEBHOOK
export const stripeWebhookHandler = async (req: Request, res: Response, next: NextFunction) => {
  const sig = req.headers['stripe-signature'] as string;
  // req.body should be a Buffer
  const buf = req.body as Buffer;
 
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the event
  switch (event.type) {
    // handle payment failure
    case 'checkout.session.expired':
      const checkoutSessionExpired = event.data.object;
      const unpaidOrderSessionExpired = await Order.find({ paymentStatus: 'unpaid' })

      if(unpaidOrderSessionExpired){
        deleteUnpainOrders(unpaidOrderSessionExpired)
      }      

      break;
    case 'charge.failed':
      const unpaidOrderChargeFailed = await Order.find({ paymentStatus: 'unpaid' })

      if(unpaidOrderChargeFailed){
        deleteUnpainOrders(unpaidOrderChargeFailed)
      }

      break;
    case 'checkout.session.async_payment_failed':
      const unpaidOrderSessionAsyncPaymentFailed = await Order.find({ paymentStatus: 'unpaid' })

      if(unpaidOrderSessionAsyncPaymentFailed){
        deleteUnpainOrders(unpaidOrderSessionAsyncPaymentFailed)
      }

      break;
    case 'payment_intent.payment_failed':
      const unpaidOrderPaymentFailed = await Order.find({ paymentStatus: 'unpaid' })
  
      if(unpaidOrderPaymentFailed){
        deleteUnpainOrders(unpaidOrderPaymentFailed)
      }

      break;

    // Handle payment success
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object
      
      // update payment status
      await Order.updateOne(
        { stripeId: checkoutSessionCompleted.id }, 
        { $set: { paymentStatus: checkoutSessionCompleted.payment_status } }
      )
      
      break;
    case 'charge.succeeded':
      const chargeSucceeded = event.data.object;

      break;
    case 'charge.updated':
      const chargeUpdated = event.data.object;
      
      break;
    case 'charge.refunded':
      const chargeRefunded = event.data.object;
      
      break;
    case 'charge.refund.updated':
      const chargeRefundUpdated = event.data.object;

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};

