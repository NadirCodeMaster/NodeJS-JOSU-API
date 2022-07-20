const cookieParser = require('cookie-parser')
const cors = require('cors')
const cuid = require('cuid')
const express = require('express')
const session = require('cookie-session')

require('express-async-errors')
require('./helpers/dotenv')

const { accessLogger } = require('./helpers/logger')
const { validator } = require('./helpers/openapi')

const errorHandler = require('./controllers/errorHandler')
const v0 = require('./routes/v0')

const { SESSION_SECRET_ENCODE, SESSION_SECRET_VERIFY } = process.env

const app = express()

const { createNamespace, getNamespace } = require('cls-hooked')
createNamespace('sessionId')

app.use((req, res, next) => {
    const sess = getNamespace('sessionId')
    sess.bindEmitter(req)
    sess.bindEmitter(res)

    sess.run(() => {
        sess.set('requestId', cuid.slug())
        return next()
    })
})

app.use(session({
    name: 'userId',
    keys: [SESSION_SECRET_ENCODE, SESSION_SECRET_VERIFY],
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: false,
    secure: false,
}))

app.use(accessLogger)
app.use(cookieParser())
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: '*' }))
app.use(validator)

app.use('/v0', v0)
app.use(errorHandler)

module.exports = app
