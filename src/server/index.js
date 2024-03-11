require("dotenv").config();
const express = require('express');
const app = express();
const router = require("./routes/routes");
const cors = require("cors");
// const mongoose = require("mongoose");

// mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI).then(() => {
//     console.log("Connected to TK Mongo Backend!");
// }).catch(() => {
//     console.error("Error connecting to TK Mongo Backend!");
// });

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(3001, () => {
    console.log("Server Activated")
})