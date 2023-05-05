const CustomAPIError = require('./customError')
const httpStatusCodes = require('http-status-codes')

class AuthenticationError extends CustomAPIError {
    constructor(message){
        super(message)
        this.statusCode = httpStatusCodes.UNAUTHORIZED
    }
}

module.exports = AuthenticationError