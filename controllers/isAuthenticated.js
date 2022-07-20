const authorization = require('auth-header')
const jwt = require('jsonwebtoken')

const { Error401, BAD_CREDENTIALS, BAD_BEARER_TOKEN, NO_CREDENTIALS } = require('../helpers/errors')
const { formatLog } = require('../helpers/formatters')
const { logger } = require('../helpers/logger')

require('../helpers/dotenv')

const { API_USERNAME, API_PASSWORD, JWT_SECRET } = process.env

const isAuthenticated = function (req, res, next) {
    const { userId, timestamp } = req.session

    if (userId && timestamp) {
        return next()
    } else {
        const auth = authorization.parse(req.get('authorization'))

        if (auth.scheme === 'Basic') {
            return authBasic(req, auth, next)
        } else if (auth.scheme === 'Bearer') {
            return authBearer(req, auth, next)
        } else {
            throw new Error401(NO_CREDENTIALS)
        }
    }
}

const authBasic = function (req, auth, next) {
    const [username, password] = Buffer.from(auth.token, 'base64').toString().split(':', 2)
    logger.debug('started', formatLog({ API_USERNAME, API_PASSWORD, auth, username, password }))

    if (username === API_USERNAME && password === API_PASSWORD) {
        req.auth = { username, password }
        logger.debug('success', formatLog({ auth: req.auth }))
        return next()
    } else {
        throw new Error401(BAD_CREDENTIALS)
    }
}

const authBearer = function (req, auth, next) {
    try {
        logger.debug('started', formatLog({ JWT_SECRET, auth }))
        req.jwt = jwt.verify(auth.token, JWT_SECRET)

        logger.debug('success', formatLog({ jwt: req.jwt }))
        return next()
    } catch {
        throw new Error401(BAD_BEARER_TOKEN)
    }
}

module.exports = { isAuthenticated }
