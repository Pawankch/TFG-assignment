const axios = require("axios")
const common = require("../util/common");
const RESPONSE = require("../util/constants")
const GameData = require("../models/GameData")
const Auth = require("../services/auth");

const createEntry = async (req,res) => {
    try{
        
    let {email, win, loss} = req.body;
    
    let obj = {
        email,
        win: win? win : 0,
        loss: loss ? loss : 0
    }

    let data = await GameData.create(obj);

    return res.json(common.parse(true,RESPONSE.SUCCESS,'Entry created successfully',data))

    }catch(e){
        console.log(e)
        if(e.statusCode) return res.json(e)
        return res.json(common.parse(false,RESPONSE.SERVER_ERROR,'Something went wrong'))
    }
}

const getGameData = async (req,res) => {
    try{
    
        let email = req.emailId // Fetching email from auth middleware

        let data = await GameData.findOne(
          { email, isActive:true },
        );
        if(!data){
            return res.status(RESPONSE.BAD_REQUESTS).json(common.parse(false,RESPONSE.BAD_REQUESTS,'Invalid Email / No data found for given email'))
        }
        return res.json(common.parse(true,RESPONSE.SUCCESS,'gamedata fetched successfully',data))

    }catch(e){
        console.log(e);
        if(e.statusCode) return res.status(e.statusCode).json(e);
        return res.status(RESPONSE.SERVER_ERROR).json(common.parse(false,RESPONSE.SERVER_ERROR,'Something went wrong'))
    }
}

const updateGameData = async (req,res) => {
    try{
        let email = req.emailId // Fetching email from auth middleware

        let requiredParams = ['win','loss'];

        let {  win, loss }= common.checkParams(req.body,requiredParams);

        let data = await GameData.findOneAndUpdate(
          { email, isActive:true },
          { $set: { win, loss, totalMatch } },
          { new: true }
        );
        if(!data){
            return res.status(RESPONSE.BAD_REQUESTS).json(common.parse(false,RESPONSE.BAD_REQUESTS,'Invalid Email / No data found for given email'))
        }
        return res.json(common.parse(true,RESPONSE.SUCCESS,'gamedata updated successfully',data))

    }catch(e){
        console.log(e);
        if(e.statusCode) return res.status(e.statusCode).json(e);
        return res.status(RESPONSE.SERVER_ERROR).json(common.parse(false,RESPONSE.SERVER_ERROR,'Something went wrong'))
    }
}
//Soft delete /  Hard delete using flag
const deleteEntry = async (req,res) => {
    try{
        let email = req.emailId // Fetching email from auth middleware

        let requiredParams = ['type'];  // type=1 soft delete,  type=2 hard delete

        let { type }= common.checkParams(req.body,requiredParams);

        let response;
        if(type = 1){
            response = await GameData.findOneAndUpdate({email},{$set:{isActive:false}});
        }else{
            response =  await GameData.findOneAndDelete({email});
        }
        
        return res.json(common.parse(true,RESPONSE.SUCCESS,'deleted successfully',response));

    }catch(e){
        console.log(e);
        if(e.statusCode) return res.status(e.statusCode).json(e);
        return res.status(RESPONSE.SERVER_ERROR).json(common.parse(false,RESPONSE.SERVER_ERROR,'Something went wrong'))
    }
}





module.exports = {
    createEntry,
    getGameData,
    updateGameData,
    deleteEntry
}