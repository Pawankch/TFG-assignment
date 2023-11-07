const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const SECRET = 'SECRET_ASSIGNMENT'
const moment = require("moment")
const common = require("../util/common");
const RESPONSE = require("../util/constants")
const users = require("../models/user")

const checkIfAlreadyLoggedIn = async (userId) => {
    let user = await Users.findOne({_id:userId});
    
    if(user.lastLoginAt){
        return true;
    }else{
        return false
    }
}

const generateAuthToken = async (email) => {
    let payload = email + " " + crypto.randomBytes(20).toString('hex');
    let token = await jwt.sign({ payload }, SECRET, { expiresIn: '1h' });
    let expiredTime = moment().add(1, 'hour').toDate();

    // let alreadyLoggedIn = await checkIfAlreadyLoggedIn(userId);
    // if(alreadyLoggedIn) throw common.parse(false,RESPONSE.ALREADY_LOGGEDIN,'Already LoggedIn')
    return token
}

const checkAuthToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    let statusCode = RESPONSE.NOT_AUTHENTICATED;

    if (token == null) {

        return res.status(statusCode).json(common.parse(false, statusCode, 'Not Authenticated'));
    }

    try {
        let user = await jwt.verify(token, SECRET);

        let decodedArray = user.payload.split(" ");
        let email = decodedArray[0];

        //check user db connection
        let Users = await users();
        let [userData] = await Users.execute(`Select * FROM users WHERE email = '${email}' LIMIT 1`);
        userData = userData[0]

        req.email = userData.email
        req.username = userData.username;
        next();


    } catch (e) {
        console.log(e);
        statusCode = RESPONSE.INVALID_TOKEN;
        return res.status(statusCode).json(common.parse(false, statusCode, 'Invalid Token'))
    }



}

module.exports = {
    generateAuthToken,
    checkAuthToken
}