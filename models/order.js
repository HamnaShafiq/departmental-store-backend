const mongoose = require('mongoose');

// Shipping Address Subschema
const shippingAddressSchema = new mongoose.Schema({
    fullName: { type: String },
    address: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
    lat: { type: Number },
    lng: { type: Number }
});

// Item Subschema
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } // Reference to Product Model
});

// Payment Result Subschema
const paymentResultSchema = new mongoose.Schema({
    paymentId: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String }
});

// Order Schema
const orderSchema = new mongoose.Schema(
    {
        orderItems: [itemSchema],
        shippingAddress: shippingAddressSchema,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User Model
        paymentMethod: { type: String, required: true },
        paymentResult: paymentResultSchema,
        itemsPrice: { type: Number, required: true, default: 0 },
        shippingPrice: { type: Number, required: true, default: 0 },
        taxPrice: { type: Number, required: true, default: 0 },
        totalPrice: { type: Number, required: true, default: 0 },
        isPaid: { type: Boolean, required: true, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, required: true, default: false },
        deliveredAt: { type: Date }
    },
    {
        timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
    }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
