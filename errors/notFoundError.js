const CustomAPIError = require('./customError')
const httpStatusCodes = require('http-status-codes')

class NotFoundError extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = httpStatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError