

const parse = (success,statusCode,message,data) => {
    return {
        success: success ? true : false,
        statusCode,
        message,
        data: data ? data : {}
    }
}

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

module.exports = { parse ,checkParams}