const twilio = require('twilio');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

//sending otp throup twilio on phone number 
const sendOTPVerification = async (phoneNumber, otp) => {
    try {
        const res = await client.messages.create({
            body: `Your OTP verification code is: ${otp}`,
            from: TWILIO_PHONE_NUMBER,
            to: phoneNumber,
        });

        return res;
    } catch (error) {
        return error;
    }

};


module.exports = sendOTPVerification;