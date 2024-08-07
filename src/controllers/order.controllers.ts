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
    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      console.log( 'checkoutSessionAsyncPaymentFailed', checkoutSessionAsyncPaymentFailed);
      
      break;
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      console.log('checkoutSessionAsyncPaymentSucceeded', checkoutSessionAsyncPaymentSucceeded);
      
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      console.log('checkoutSessionCompleted', checkoutSessionCompleted);
      
      break;
    case 'checkout.session.expired':
      const checkoutSessionExpired = event.data.object;
      // Then define and call a function to handle the event checkout.session.expired
      console.log('checkoutSessionExpired', checkoutSessionExpired);
      
      break;
    case 'invoice.created':
      const invoiceCreated = event.data.object;
      // Then define and call a function to handle the event invoice.created
      console.log('invoiceCreated', invoiceCreated);
      
      break;
    case 'invoice.deleted':
      const invoiceDeleted = event.data.object;
      // Then define and call a function to handle the event invoice.deleted
      console.log('invoiceDeleted', invoiceDeleted);
      
      break;
    case 'invoice.finalization_failed':
      const invoiceFinalizationFailed = event.data.object;
      // Then define and call a function to handle the event invoice.finalization_failed
      console.log('invoiceFinalizationFailed', invoiceFinalizationFailed);
      
      break;
    case 'invoice.finalized':
      const invoiceFinalized = event.data.object;
      // Then define and call a function to handle the event invoice.finalized
      console.log('invoiceFinalized', invoiceFinalized);
      
      break;
    case 'invoice.paid':
      const invoicePaid = event.data.object;
      // Then define and call a function to handle the event invoice.paid
      console.log('invoicePaid', invoicePaid);
      
      break;
    case 'invoice.payment_failed':
      const invoicePaymentFailed = event.data.object;
      // Then define and call a function to handle the event invoice.payment_failed
      console.log('invoicePaymentFailed', invoicePaymentFailed);
      
      invoicePaymentFailed
      break;
    case 'invoice.payment_succeeded':
      const invoicePaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event invoice.payment_succeeded
      console.log('invoicePaymentSucceeded', invoicePaymentSucceeded);
      
      break;
    case 'refund.created':
      const refundCreated = event.data.object;
      // Then define and call a function to handle the event refund.created
      console.log('refundCreated', refundCreated);
      
      break;
    case 'refund.updated':
      const refundUpdated = event.data.object;
      // Then define and call a function to handle the event refund.updated
      console.log('refundUpdated', refundUpdated);
      
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};