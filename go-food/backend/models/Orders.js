const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true
    }
    // order_date: { // Add this field
    //     type: String, // You could use Date if you want to store it as a Date type
    //     required: true
    // },
});

module.exports = mongoose.model('order', OrderSchema);
