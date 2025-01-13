const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors'); // For handling cross-origin requests

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Twilio credentials
const accountSid = 'your_account_sid'; // Replace with your Twilio SID
const authToken = 'your_auth_token';   // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

// WhatsApp numbers
const twilioWhatsAppNumber = 'whatsapp:+14155238886'; // Twilio sandbox number
const yourWhatsAppNumber = 'whatsapp:+447466049367'; // Your phone number

// Endpoint to handle booking and cancellation notifications
app.post('/notify', (req, res) => {
    const { type, day, time, name, numberplate } = req.body;

    // Construct message
    let messageBody = '';
    if (type === 'booked') {
        messageBody = `New appointment booked!\nCustomer: ${name}\nCar: ${numberplate}\nDay: ${day}\nTime: ${time}`;
    } else if (type === 'cancelled') {
        messageBody = `An appointment has been cancelled.\nCustomer: ${name}\nCar: ${numberplate}\nDay: ${day}\nTime: ${time}`;
    } else {
        return res.status(400).send({ success: false, error: 'Invalid notification type' });
    }

    // Send the message via Twilio
    client.messages.create({
        from: twilioWhatsAppNumber,
        to: yourWhatsAppNumber,
        body: messageBody,
    })
    .then(message => {
        console.log(`Message sent: ${message.sid}`);
        res.status(200).send({ success: true, sid: message.sid });
    })
    .catch(err => {
        console.error('Error sending message:', err);
        res.status(500).send({ success: false, error: err.message });
    });
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
