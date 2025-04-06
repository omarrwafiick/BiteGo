export const sendOtp = async (otp:number, userPhone:string) => {
    const client = require('twilio')(process.env.ACCOUNT_SID_TWILIO, process.env.AUTH_TOKEN_TWILIO);
    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: process.env.PHONE_NUMBER_TWILIO ,
        to: `+20${userPhone}`
    });
    return response;
};