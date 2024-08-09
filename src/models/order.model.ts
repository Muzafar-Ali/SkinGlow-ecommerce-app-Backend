import mongoose from "mongoose"
import { MakeupDocumentType } from "../types/types"

  
const orderSchema  = new mongoose.Schema({

  orderId: {
    type: String,
    required: [true, 'order id is required']
  },

  stripeId: {
    type: String,
    required: [true, 'Stripe id is required']
  },

  orderItems: [
    {
      title: {
          type: String,
          required: [true, 'Product title is required']
      },
      price: {
          type: Number,
          required: [true, 'Product price is required']
      },
      thumbnail: {
          type: String,
          required: [true, 'Product image is required']
      },
      quantity: {
          type: Number,
          required: [true, 'Product quantity is required']
      },
      itemPrice: {
          type: Number,
          required: [true, 'Product item price is required']
      },
      product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MakeupProduct',
          require: [true, 'Product id is required']
      }
    }
  ],

  totalAmount: {
    type: Number,
    default: 0,
    required: [true, 'Total amount is required']
  },

  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'processing'
  },
  
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid'
  },

  deliveredAt: Date,
  shippedAt: Date,

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }

})


export const Order = mongoose.model<MakeupDocumentType>("Order", orderSchema)  