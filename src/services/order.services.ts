import { Order } from "../models/order.model";
import { OrderItemType } from "../types/types";

export const createOrder = async (
  orderItems: OrderItemType[], 
  totalAmount: number, 
  orderId: number, 
  stripeId: string,
  paymentStatus: string
) => {
  try {
    const orderCreated = await Order.create({
      orderItems: orderItems.map((item) => ({
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail,
        quantity: item.quantity,
        itemPrice: item.itemPrice,
        product: item._id, 
      })),
      totalAmount: totalAmount,
      orderId, 
      stripeId,
      paymentStatus
    });
    
    return orderCreated
    
  } catch (error: any) {
    console.log('createOrder:', error);
  }
}

export const deleteUnpainOrders = async (unpaidOrders: any) => {

  for (let order of unpaidOrders) {
    await Order.deleteOne({ orderId: order.orderId }); // Assuming _id is the unique identifier for each order
  }
  console.log("All unpaid orders have been deleted.");
}