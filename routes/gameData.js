var express = require('express');
var router = express.Router();

const GameController = require("../controllers/GameData");
const Auth = require("../middleware/auth")
const {rateLimitMiddleware }= require("../middleware/rateLimiter")

router.post('/createEntry',rateLimitMiddleware,GameController.createEntry);

router.post('/getGameData',GameController.getGameData);

router.get('/updateGameData',Auth.checkAuthToken,GameController.updateGameData);

router.post('/deleteEntry',Auth.checkAuthToken,GameController.deleteEntry);

module.exports = router;
