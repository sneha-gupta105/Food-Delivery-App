const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://AppDatabase:FlkMxQCruriRLL4A@cluster0.mvywh.mongodb.net/goFoodMERN?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected Successfully");

        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        //console.log(fetched_data); // Log the fetched data

    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = mongoDB;
