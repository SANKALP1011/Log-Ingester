class CustomApiError extends Error{
    constructor(message,code){
        super(message,code)
    }
}

module.exports = CustomApiError