const bcrypt = require('bcrypt')

const { Error400, BAD_PASSWORD_CONFIRMATION, BAD_NEW_PASSWORD, BAD_OLD_PASSWORD } = require('../../helpers/errors')
const { orString } = require('../../helpers/combinators')
const { selectUser, updateUserPassword } = require('../../models/users')

const putUserPassword = async function (req, res, next) {
    const { password } = req.body.data

    if (password.new_password !== password.new_password_confirm) throw new Error400(BAD_PASSWORD_CONFIRMATION)
    if (password.new_password === password.old_password) new Error400(BAD_NEW_PASSWORD)

    const users = await selectUser(req.params)
    const user = users.rows?.[0]

    if (user.password) {
        if (!bcrypt.compareSync(orString(password.old_password), user.password)) {
            throw new Error400(BAD_OLD_PASSWORD)
        }
    } else {
        if (password.old_password) {
            throw new Error400(BAD_OLD_PASSWORD)
        }
    }

    await updateUserPassword({ ...user, password: bcrypt.hashSync(password.new_password, 12) })

    res.locals.resource = req.originalUrl.replace('/password', '')
    return next()
}

module.exports = { putUserPassword }
