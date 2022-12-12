const nodemailer = require('nodemailer');

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

const automatedEmail = () => {
    transporter.sendMail(options, (err, info) => {
        if(err) {
            console.log(err);
            return;
        }
        console.log("Sent" + info.response);
    })
}

module.exports = automatedEmail;