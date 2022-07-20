const { logger } = require('../helpers/logger')

const logRequest = function (req, res, next) {
    logger.info('started', req)
    return next()
}

const logResponse = function (req, res) {
    logger.info('success', res)
    return res.json(res.locals.body)
}

module.exports = { logRequest, logResponse }
