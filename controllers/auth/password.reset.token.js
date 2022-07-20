const jwt = require('jsonwebtoken')

const { Error400, BAD_RESET_TOKEN } = require('../../helpers/errors')
const { selectResetToken, deleteResetToken } = require('../../models/resetTokens')
const { updateUserPassword } = require('../../models/users')

const { JWT_SECRET } = process.env

const passwordResetToken = async function (req, res) {
    const tokens = await selectResetToken(req.params)
    const token = tokens.rows?.[0]

    if (token?.valid_until > new Date()) {
        await deleteResetToken(req.params)
        await updateUserPassword({ user_id: token.user_id, password: null })

        const jwtToken = jwt.sign({ user_id: token.user_id }, JWT_SECRET)
        res.set('X-Auth-Token', jwtToken)
    } else {
        throw new Error400(BAD_RESET_TOKEN)
    }

    return res.redirect(token.base_uri)
}

module.exports = { passwordResetToken }
