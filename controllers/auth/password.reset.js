const uuid = require('uuid')

const { Error400, UNKNOWN_USER_ERROR } = require('../../helpers/errors')
const { insertResetToken } = require('../../models/resetTokens')
const { querySenderApi } = require('../../helpers/connections')
const { selectUser } = require('../../models/users')

const { API_HOSTNAME } = process.env

const passwordReset = async function (req, res, next) {
    const users = await selectUser(req.body.data)
    const user = users.rows?.[0]

    if (user) {
        const token = formatResetToken(user, req.body.data)
        await insertResetToken(token)

        const email = formatEmail(user, token.reset_token)
        await querySenderApi('POST', '/v0/josu/admin', email)
    } else {
        throw new Error400(UNKNOWN_USER_ERROR)
    }

    return next()
}

const formatResetToken = function (user, data) {
    return {
        reset_token: uuid.v1(),
        base_uri: data.base_uri,
        user_id: user.user_id,
        valid_until: new Date(new Date().getTime() + 1800 * 1000),
    }
}

const formatEmail = function (user, token) {
    return {
        from: 'admin@josu.ai',
        to: [user.email],
        subject: 'Password reset',
        content: `You've requested password reset.
                  Please follow ${API_HOSTNAME}/v0/auth/password/reset/${token} in order to reset your password.
                  The link would expire in 30 minutes.`,
    }
}

module.exports = { passwordReset }
