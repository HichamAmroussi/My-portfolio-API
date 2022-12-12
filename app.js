// Packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/message');
require('dotenv/config');
const nodemailer = require('./utils/nodemailer');

// Express app
const app = express();

// Settings
mongoose.set('strictQuery', true);

// Connect to mongodb
mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log("Connected to the database");
        app.listen(3000);
        console.log("Listening for requests");
    })
    .catch((err) => console.log(err));

// Middlewares
app.use(cors({
    origin: "*",
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.post('/messages', (req, res) => {
    const message = new Message(req.body);

    message.save()
        .then((result) => {
            nodemailer();
            res.json({ message: "Message sent!" });
        })
        .catch((err) => {
            console.log(err);
        })
})