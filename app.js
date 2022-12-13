// Packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/message');
require('dotenv/config');
const nodemailer = require('nodemailer');

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

// Nodemailer
const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.NODEMAILER_ADDRESS,
        pass: process.env.NODEMAILER_PASSWORD
    }
});
const options = {
    from: process.env.NODEMAILER_ADDRESS,
    to: "hicham.amroussi@gmail.com",
    subject: "Portfolio New Message",
    text: "\n\n✉️  New message received on your portfolio.\n\n\n\nThis is an Automated Message, please don't respond to it."
};

// Routes
app.get('/', (req, res) => {
    Message.find()
        .then((response) => res.json(response));
});

app.post('/messages', (req, res) => {
    const message = new Message(req.body);

    message.save()
        .then((result) => {
            transporter.sendMail(options, (err, info) => {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log("Sent" + info.response);

                res.json({ message: "Message sent!" });
            })
        })
        .catch((err) => {
            console.log(err);
        })
});