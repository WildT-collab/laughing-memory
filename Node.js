const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());

// Twilio credentials
const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const client = twilio(accountSid, authToken);

// WhatsApp numbers
const twilioWhatsAppNumber = 'whatsapp:+14155238886'; // Twilio sandbox number
const yourWhatsAppNumber = 'whatsapp:+447466049367'; // Your WhatsApp number

app.post('/notify', (req, res) => {
    const { type, day, time } = req.body;

    let messageBody = '';
    if (type === 'booked') {
        messageBody = `New appointment booked:\nDay: ${day}\nTime: ${time}`;
    } else if (type === 'cancelled') {
        messageBody = `An appointment has been cancelled:\nDay: ${day}\nTime: ${time}`;
    } else {
        return res.status(400).send({ error: 'Invalid notification type' });
    }

    client.messages
        .create({
            from: twilioWhatsAppNumber,
            to: yourWhatsAppNumber,
            body: messageBody,
        })
        .then(message => res.status(200).send({ success: true, sid: message.sid }))
        .catch(err => res.status(500).send({ success: false, error: err.message }));
});

app.listen(3000, () => console.log('Server running on port 3000'));
