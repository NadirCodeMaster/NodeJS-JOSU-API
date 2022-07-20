const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { Error401, BAD_CREDENTIALS } = require('../../helpers/errors')
const { selectUser } = require('../../models/users')

const { JWT_SECRET } = process.env

const loginPassword = async function (req, res, next) {
    const users = await selectUser(req.body.data.user_id)
    const user = users.rows?.[0]

    if (isAuthenticated(req.body.data, user)) {
        res.locals.resource = `/v0/users/${user.user_id}`
    } else {
        throw new Error401(BAD_CREDENTIALS)
    }

    res.locals.jwtToken = jwt.sign({ user_id: user.user_id }, JWT_SECRET)

    res.set('X-Auth-Token', res.locals.jwtToken)
    return next()
}

const isAuthenticated = function (data, user) {
    return data.username === user.username && bcrypt.compareSync(data.password, user.password)
}

module.exports = { loginPassword }
