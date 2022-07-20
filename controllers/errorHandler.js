const { error: OpenApiErrors } = require('express-openapi-validator')
const { CustomError } = require('../helpers/errors')
const { logger } = require('../helpers/logger')

const errorHandler = function (err, req, res, next) {
    if (err.constructor.name in OpenApiErrors) {
        logger.error(JSON.stringify(err, null, 2), req)
        return res.status(err.status).json({
            ...err,
            level: 'error',
            timestamp: new Date(),
        })
    } else if (err instanceof CustomError) {
        logger.error(err.stack, req)
        return res.status(err.status).json({
            ...err,
            path: req.originalUrl,
            errors: [{ path: req.originalUrl, message: err.message }],
            level: 'error',
            timestamp: new Date(),
        })
    } else {
        logger.error(err.stack, req)
        return res.status(500).json({
            name: 'Internal Server Error',
            status: 500,
            path: req.originalUrl,
            errors: [{ path: req.originalUrl, message: err.message }],
            level: 'error',
            timestamp: new Date(),
        })
    }
}

module.exports = errorHandler
