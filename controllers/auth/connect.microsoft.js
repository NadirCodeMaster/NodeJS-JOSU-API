const jwt = require('jsonwebtoken')

const { Error400, UNKNOWN_USER_ERROR } = require('../../helpers/errors')
const { addAccountMicrosoft } = require('./formatters')
const { fetchAccessToken } = require('../../helpers/oauth')
const { queryJsonApi } = require('../../helpers/connections')
const { selectUser, updateUserAccount } = require('../../models/users')
const { addProfile, syncHistory, syncRecent } = require('./pipelines')

const { JWT_SECRET } = process.env

const connectMicrosoft = async function (req, res, next) {
    const tokens = await fetchAccessToken(req, 'microsoft')
    const account = await queryJsonApi('GET', 'https://graph.microsoft.com/v1.0/me', tokens.access_token)

    const userToken = jwt.verify(req.query.state, JWT_SECRET)

    const users = await selectUser({ user_id: userToken.user_id })
    const user = users.rows?.[0]

    if (user) {
        res.locals.user = addAccountMicrosoft(user, account, tokens)
        await addProfile(user, res.locals.user.__accounts_microsoft[account.id])
        await updateUserAccount(res.locals.user, { account: account.id, user_id: res.locals.user.user_id })
    } else {
        throw new Error400(UNKNOWN_USER_ERROR)
    }

    res.locals.account = res.locals.user.__accounts_microsoft[account.id]
    res.locals.jwtToken = jwt.sign({ user_id: res.locals.user.user_id }, JWT_SECRET)

    const data = { account: res.locals.account, tokens, user: res.locals.user }
    await syncRecent(res.locals.user)

    res.set('X-Auth-Token', res.locals.jwtToken)
    next()

    if (!isExistingAccount(account, user)) await syncHistory(data, 'microsoft')
}

const isExistingAccount = function (account, user) {
    return account.id in user.__accounts_microsoft
}

module.exports = { connectMicrosoft }
