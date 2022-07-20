const { deleteAccountData } = require('./pipelines')
const { selectUser, deleteUser } = require('../../models/users')

const dropUserProfile = async function (req, res, next) {
    const users = await selectUser(req.params)
    const user = users.rows?.[0]

    await Promise.all(Object.values(user.__accounts_google).map(account => deleteAccountData(account, user)))
    await Promise.all(Object.values(user.__accounts_microsoft).map(account => deleteAccountData(account, user)))

    await deleteUser(user)

    res.locals.resource = req.originalUrl.replace('/profile', '')
    return next()
}

module.exports = { dropUserProfile }
