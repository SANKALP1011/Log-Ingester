const CustomApiError = require("../customApi.error")

class DatabaseConnectionError extends CustomApiError{
    constructor(messgae,code){
        super(messgae,code)
    }
}

module.exports = {DatabaseConnectionError}