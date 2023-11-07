const UserServices = require("../services/Users");
const bcrypt = require("bcrypt");
const common = require("../util/common");
const RESPONSE = require("../util/constants");
const Auth = require("../middleware/auth");
const users = require("../models/user");

const createUser = async (req,res) => {
    let requiredParams = ['username','password','email'];
    let { username, email, password}= UserServices.checkParams(req.body,requiredParams);
    console.log("HERE")
    try{

    //check if users db connected;
    let Users = await users();

    //Check if user exists already
    let [userRow] = await Users.execute(`SELECT * FROM users WHERE email = '${email}' LIMIT 1;`);
    
    if(!userRow || !userRow.length){
       //create user
       password = await bcrypt.hash(password.toString(),10);
       let token = await Auth.generateAuthToken(email)
       await Users.execute(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`);

       //Publish to mq
       let eventData = JSON.stringify({event:'userRegistered',data:{username,email}})
       publishRabbitMQ(eventData,'userRegister')

       return res.json(common.parse(true,RESPONSE.SUCCESS,'LoggedIn successfull',{username,email,token}));

    }else{
        return res.status(RESPONSE.BAD_REQUESTS).json(common.parse(false,RESPONSE.BAD_REQUESTS,'User already exists with given email'))
    }

    } catch (error) {
        console.log(error)
        return res.status(RESPONSE.SERVER_ERROR).json(common.parse(false,RESPONSE.SERVER_ERROR,'Something went wrong'))
    }
}

const loginUser = async (req,res) => {
    let requiredParams = ['email','password'];
    let {email, password} = UserServices.checkParams(req.body,requiredParams);

    //check if users db connected;
    let Users = await users();

    //Check if user exists already
    let [userRow] = await Users.execute(`SELECT * FROM users WHERE email = '${email}' LIMIT 1;`);


    if(!userRow || !userRow.length) 
        return res.status(RESPONSE.BAD_REQUESTS).json(common.parse(false,RESPONSE.BAD_REQUESTS,'Invalid Email/Password'))

    let user = userRow[0]
    let matched = await bcrypt.compare(password.toString(),user.password);

    if(!matched) 
        return res.status(RESPONSE.BAD_REQUESTS).json(common.parse(false,RESPONSE.BAD_REQUESTS,'Invalid Email/Password'))

    let token = await Auth.generateAuthToken(user.email);

    return res.json(common.parse(true,RESPONSE.SUCCESS,'LoggedIn successfull',{username:user.username,email,token}));
}

module.exports = {
    createUser,
    loginUser
}