const{ rateLimit } = require("express-rate-limit")

const rateLimitMiddleware = () => {

    //We can also use Redis server to handle rate limiting very well to write custom function
    return rateLimit({
        windowMs: 60 * 60 * 1000,         //Thousands request per minute/per Ip
        max: 10000,
        message: "You have exceeded your 10000 requests per minute limit.",
        headers: true,
    });
}


module.exports = {rateLimitMiddleware}