const CustomAPIError = require('./customError')
const httpStatusCodes = require('http-status-codes')

class BadRequestError extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = httpStatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError