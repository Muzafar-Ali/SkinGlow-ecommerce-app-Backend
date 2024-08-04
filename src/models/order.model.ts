import mongoose, { Schema } from "mongoose";
  
const orderSchema  = new Schema({

  orderItems: [
    {
      id: {
          type: String,
          required: [true, 'Product id is required']
      },
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
      // product: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: 'Products',
      //     require: [true, 'Product id is required']
      // }
    }
  ],

  totalAmount: {
    type: Number,
    default: 0,
    required: [true, 'Total amount is required']
  },

  // orderStatus: {
  //   type: String,
  //   enum: ['processing', 'shipped', 'delivered', 'cancelled', 'returned'],
  //   default: 'processing'
  // },

  // deliveredAt: Date,
  // shippedAt: Date,

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }

})


export const Order = mongoose.model("Order", orderSchema)  