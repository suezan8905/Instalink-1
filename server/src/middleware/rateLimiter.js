import { rateLimit } from "express-rate-limit";

export const  rateLimiter = rateLimit({
    windows: 2 * 60 * 1000, //2 minutes
    max: 10, //10 attempts within a 2 min window
    message: "Too many requests attempts, please try again later",
});


// we installed npm i express-rate-limit (installed from npms)
// Rate limiter in React is used to control how often a function runs — to avoid spamming things like API calls or events.