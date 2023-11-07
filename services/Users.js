const RESPONSE = require("../util/constants");
const common = require("../util/common")

const checkParams = (obj,requiredParams) => {

    let missingKeys = [];

    for(let key of requiredParams){
        if(!obj[key]){
            missingKeys.push(key)
        }
    }

    if(missingKeys.length){
        throw common.parse(false,RESPONSE.BAD_REQUESTS,`${missingKeys.toString()} are missing`,'')
    }

    return obj;
}

const ifUserAlreadyExists = async (email) => {
    let user = await Users.findOne({email});
    if(user){
        throw common.parse(false,RESPONSE.BAD_REQUESTS,`User Already Exists with this email id`,'')
    }

    return false;
}

module.exports = {
    checkParams,
    ifUserAlreadyExists
}
