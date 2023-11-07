var express = require('express');
var router = express.Router();

const users = require("../controllers/Users");
const Auth = require("../middleware/auth")
const {rateLimitMiddleware }= require("../middleware/rateLimiter")

router.post('/createUser',users.createUser);

router.post('/loginUser',users.loginUser);

module.exports = router;
