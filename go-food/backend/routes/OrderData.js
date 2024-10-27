const express = require("express");
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    let userEmail = req.body.email;

    console.log("Received data:", data);
    console.log("Received email:", userEmail);

    // Check if email and order data are provided
    if (!userEmail) {
        console.log("Email not provided.");
        return res.status(400).send({ error: "Email is required" });
    }
    if (!data || data.length === 0) {
        console.log("Order data is empty.");
        return res.status(400).send({ error: "Order data is empty" });
    }

    // Insert order date at the beginning of the order data
    data.splice(0, 0, { Order_date: req.body.order_date });
    console.log("Data after adding order date:", data);

    try {
        // Check if an order exists for the user
        let eId = await Order.findOne({ email: userEmail });
        console.log("Existing order ID:", eId);

        if (eId === null) {
            console.log("Creating a new order...");
            await Order.create({
                email: userEmail,
                order_data: [data],
            });
            res.json({ success: true });
        } else {
            console.log("Updating existing order...");
            await Order.findOneAndUpdate(
                { email: userEmail },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error("Error creating or updating order:", error);  // Detailed error message
        res.status(500).send({ error: "Server Error", message: error.message });
    }
});



router.post('/myOrderData', async(req, res) => {
    try{
        let myData = await Order.findOne({'email': req.body.email})
        res.json({orderData: myData})
    }catch(error){
        res.send("Server Error", error.message)
    }
})
module.exports = router;
