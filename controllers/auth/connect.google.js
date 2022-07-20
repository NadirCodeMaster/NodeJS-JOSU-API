const jwt = require('jsonwebtoken')

const { Error400, UNKNOWN_USER_ERROR } = require('../../helpers/errors')
const { addAccountGoogle } = require('./formatters')
const { fetchAccessToken } = require('../../helpers/oauth')
const { queryJsonApi } = require('../../helpers/connections')
const { selectUser, updateUserAccount } = require('../../models/users')
const { addProfile, syncHistory, syncRecent } = require('./pipelines')

const { JWT_SECRET } = process.env
const { REFRESH_TOKEN_ERROR } = require('../../helpers/errors')

const connectGoogle = async function (req, res, next) {
    const tokens = await fetchAccessToken(req, 'google')
    const account = await queryJsonApi('GET', 'https://www.googleapis.com/oauth2/v1/userinfo', tokens.access_token)

    if (!tokens.refresh_token) throw new Error400(REFRESH_TOKEN_ERROR)
    const userToken = jwt.verify(req.query.state, JWT_SECRET)

    const users = await selectUser({ user_id: userToken.user_id })
    const user = users.rows?.[0]

    if (user) {
        res.locals.user = addAccountGoogle(user, account, tokens)
        await addProfile(user, res.locals.user.__accounts_google[account.id])
        await updateUserAccount(res.locals.user, { account: account.id, user_id: res.locals.user.user_id })
    } else {
        throw new Error400(UNKNOWN_USER_ERROR)
    }

    res.locals.account = res.locals.user.__accounts_google[account.id]
    res.locals.jwtToken = jwt.sign({ user_id: res.locals.user.user_id }, JWT_SECRET)

    const data = { account: res.locals.account, tokens, user: res.locals.user }
    await syncRecent(res.locals.user)

    res.set('X-Auth-Token', res.locals.jwtToken)
    next()

    if (!isExistingAccount(account, user)) await syncHistory(data, 'google')
}

const isExistingAccount = function (account, user) {
    return account.id in user.__accounts_google
}

module.exports = { connectGoogle }
