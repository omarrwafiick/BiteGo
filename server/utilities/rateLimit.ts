import  rateLimiter from 'express-rate-limit'; 

export const rateLimiting = rateLimiter({
    windowMs:15 * 60 * 1000, 
    max: 50,
    message: { error: 'Too many requests, please try again later.' }
});