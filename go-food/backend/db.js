const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://AppDatabase:FlkMxQCruriRLL4A@cluster0.mvywh.mongodb.net/goFoodMERN?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected Successfully");

        const fetched_data = await mongoose.connection.db.collection("food_items");
        const food_items = await fetched_data.find({}).toArray();

        const foodCategory = await mongoose.connection.db.collection("categories");
        const food_Category = await foodCategory.find({}).toArray();

        global.food_items = food_items;
        global.food_Category = food_Category;

        console.log("Data fetched and stored globally");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = mongoDB;
