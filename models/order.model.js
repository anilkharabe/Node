const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
  orderId:{
    type: String,
    required: true,
    unique: true,
  },
  user:{
    userId:{
        type: String,
        required: true,
    },
    name: String,
    email:{
        type: String,
    },
    address: {
        city: String,
        state: String,
        pin: Number
    }
  },
  items:[
    {
      productId: {
        type: String,
      },
      productName: String,
      category: String,
      price: Number,
      qty: Number
    }
  ],
  payment: {
    mode: {
        type: String,
        enum: ['UPI', 'CARD', 'COD', 'Internet Banking']
    },
    status: {
        type: String,
        enum: ['PAID', 'PENDING', 'FAILED']
    },
    transactionId: String,
    paidAt: Date
  },
  orderStatus: {
    type: String,
    enum: ['PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    default: 'DELIVERED'
  },
    deliveredAt: Date,
    createdAt: Date,
    tags: [String]
});

module.exports = mongoose.model("Order", orderSchema);


// const oneObj ={
//   orderId: "ORD987654",
//   user: {
//     userId: "USR101",
//     name: "Anil Kharabe",
//     email: "anil@example.com",
//     address: {
//       city: "Pune",
//       state: "MH",
//       pin: 411001
//     }
//   },
//   items: [
//     {
//       productId: "P1001",
//       productName: "iPhone 15",
//       category: "Mobiles",
//       price: 79999,
//       qty: 1
//     },
//     {
//       productId: "P2001",
//       productName: "Sony Headphones",
//       category: "Audio",
//       price: 7990,
//       qty: 2
//     }
//   ],
//   payment: {
//     mode: "UPI",
//     status: "PAID",
//     transactionId: "TXN999888",
//     paidAt: ISODate("2024-12-09T10:22:17Z")
//   },
//   orderStatus: "DELIVERED",
//   deliveredAt: ISODate("2024-12-15T08:15:00Z"),
//   createdAt: ISODate("2024-12-09T09:55:00Z"),
//   tags: ["electronics", "urgent", "gift"]
// }