const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

const {
    createLogger,
    format: { colorize, combine, metadata, printf, timestamp },
    transports: { Console, File },
} = require('winston')
const { getNamespace } = require('cls-hooked')

const { IS_PROD, IS_TEST } = require('./dotenv')
const { copy } = require('./serializers')
const { getHandler, padHandler } = require('./formatters')

const APP_LOG = IS_PROD ? 'logs/app.log' : '/dev/null'

const accessLogger = IS_PROD
    ? morgan('combined', {
        stream: fs.createWriteStream(path.join(__dirname, '..', 'logs', 'access.log'), { flags: 'a' }),
    })
    : IS_TEST
        ? (req, res, next) => next()
        : morgan('dev')

const consoleFormat = function ({ level, message, metadata, timestamp }) {
    const { context, handler } = extractMetadata(metadata)
    const id = getNamespace('sessionId')?.get('requestId')

    if (handler && context) {
        return (
            `${timestamp} ${level}:\t${id} -> ${padHandler(handler)} -> ${message}\n` +
            `${JSON.stringify(context, null, 2)}`
        )
    } else if (handler) {
        return `${timestamp} ${level}:\t${id} -> ${padHandler(handler)} -> ${message}`
    } else {
        return `${timestamp} ${level}:\t${id} -> ${message}`
    }
}

const logfileFormat = function ({ level, message, metadata, timestamp }) {
    const { context, handler } = extractMetadata(metadata)
    const requestId = getNamespace('sessionId')?.get('requestId')
    return JSON.stringify({ timestamp, level, requestId, handler, message, metadata: copy(context) })
}

const extractMetadata = function (metadata) {
    const keys = Object.keys(metadata)
    if (keys.length === 0) {
        return {}
    } else if ('res' in metadata) {
        // Express request
        const { method, originalUrl, headers, body, params, query, auth } = metadata
        return {
            context: { method, originalUrl, headers, body, request: { params, query, auth } },
            handler: getHandler(metadata),
        }
    } else if ('req' in metadata) {
        // Express response
        const {
            statusCode,
            locals: { body },
            req,
        } = metadata
        return {
            context: { statusCode, body },
            handler: getHandler(req),
        }
    } else {
        return metadata
    }
}

const logger = createLogger({
    transports: [
        new Console({
            format: combine(colorize(), metadata(), timestamp(), printf(consoleFormat)),
            level: 'debug',
        }),
        new File({
            filename: APP_LOG,
            format: combine(metadata(), timestamp(), printf(logfileFormat)),
            level: 'debug',
        }),
    ],
})

module.exports = { accessLogger, logger }
