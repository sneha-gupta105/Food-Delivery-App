const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

router.post('/foodData', async (req, res) => {
    try {
        const fetched_data = await mongoose.connection.db.collection("food_items");
        const food_items = await fetched_data.find({}).toArray();

        const foodCategory = await mongoose.connection.db.collection("categories");
        const food_Category = await foodCategory.find({}).toArray();

        res.send([food_items, food_Category]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
