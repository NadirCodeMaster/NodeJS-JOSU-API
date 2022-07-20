/* eslint-disable max-len */
const BAD_BEARER_TOKEN = 'Invalid or expired authentication token'
const BAD_CREDENTIALS = 'Incorrect username or password'
const BAD_NEW_PASSWORD = 'New password equals to old one'
const BAD_OLD_PASSWORD = 'Incorrect old password'
const BAD_PASSWORD_CONFIRMATION = 'New password differs from confirmation'
const BAD_RESET_TOKEN = 'Reset token does not exists or is invalid'
const DIFFERENT_USER = 'You are trying to access data of the user different from yourself'
const NO_CREDENTIALS = 'No authentication credentials provided'
const REFRESH_TOKEN_ERROR = 'Refresh token is missing. Please revoke permissions you\'ve given to Josu at https://myaccount.google.com/permissions and add account again'
const UNKNOWN_SPEAKER = 'Speaker does not exist'
const UNKNOWN_USER_ERROR = 'User does not exist. Most likely you haven\'t log in for a while. Try removing your account and creating it again'
/* eslint-enable max-len */

class CustomError extends Error {}

class Error400 extends CustomError {
    constructor(args) {
        super(args)
        this.status = 400
        this.name = 'Bad Request'
    }
}

class Error401 extends CustomError {
    constructor(args) {
        super(args)
        this.status = 401
        this.name = 'Unauthorized'
    }
}

class Error403 extends CustomError {
    constructor(args) {
        super(args)
        this.status = 403
        this.name = 'Forbidden'
    }
}

class Error404 extends CustomError {
    constructor(args) {
        super(args)
        this.status = 404
        this.name = 'Not Found'
    }
}

module.exports = {
    BAD_BEARER_TOKEN,
    BAD_CREDENTIALS,
    BAD_NEW_PASSWORD,
    BAD_OLD_PASSWORD,
    BAD_PASSWORD_CONFIRMATION,
    BAD_RESET_TOKEN,
    DIFFERENT_USER,
    NO_CREDENTIALS,
    REFRESH_TOKEN_ERROR,
    UNKNOWN_SPEAKER,
    UNKNOWN_USER_ERROR,
    CustomError,
    Error400,
    Error401,
    Error403,
    Error404,
}
