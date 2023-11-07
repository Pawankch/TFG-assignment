var express = require('express');
var router = express.Router();

const GameController = require("../controllers/GameData");
const Auth = require("../middleware/auth")
const {rateLimitMiddleware }= require("../middleware/rateLimiter")

//Authentication middleware has been used globally in app.js file for entire /game/* endpoints
router.post('/createEntry',GameController.createEntry);

router.post('/getGameData',GameController.getGameData);

router.get('/updateGameData',GameController.updateGameData);

router.post('/deleteEntry',GameController.deleteEntry);

module.exports = router;
