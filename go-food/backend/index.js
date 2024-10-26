
const express = require('express');
const app = express();
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

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested_With, Content-Type, Accept"
    );
    next();
});

app.use(express.json());

app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData"));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
