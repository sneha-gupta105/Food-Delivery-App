const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const mongoDB = require('./db');

// Call mongoDB and only start the server once it's done
mongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.log("Failed to connect to MongoDB:", err);
});

// Use CORS middleware
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these HTTP methods
    credentials: true, // Allow credentials (if you need them)
}));

app.use(express.json());

// Set up routes
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData"));
app.use('/api', require("./routes/GetLocation"));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
