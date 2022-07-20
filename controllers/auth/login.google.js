const jwt = require('jsonwebtoken')

const { Error400 } = require('../../helpers/errors')
const { fetchAccessToken } = require('../../helpers/oauth')
const { formatUserGoogle } = require('./formatters')
const { getProfile, syncHistory, syncRecent } = require('./pipelines')
const { insertUser, selectUser } = require('../../models/users')
const { queryJsonApi } = require('../../helpers/connections')
const { selectAccount } = require('../../models/accounts')

const { JWT_SECRET } = process.env
const { REFRESH_TOKEN_ERROR } = require('../../helpers/errors')

const loginGoogle = async function (req, res, next) {
    const tokens = await fetchAccessToken(req, 'google')
    const account = await queryJsonApi('GET', 'https://www.googleapis.com/oauth2/v1/userinfo', tokens.access_token)

    const userAccounts = await selectAccount({ account: account.id })
    const userAccount = userAccounts.rows?.[0]

    if (isExistingAccount(userAccount)) {
        const users = await selectUser(userAccount)
        res.locals.user = users.rows?.[0]
    } else {
        if (tokens.refresh_token) {
            res.locals.user = formatUserGoogle(account, tokens)
            res.locals.user.profile_id = await getProfile(res.locals.user)
            // TODO save userpic to public s3
            await insertUser(res.locals.user, { account: account.id, user_id: res.locals.user.user_id })
        } else {
            throw new Error400(REFRESH_TOKEN_ERROR)
        }
    }

    res.locals.account = res.locals.user.__accounts_google[account.id]
    res.locals.jwtToken = jwt.sign({ user_id: res.locals.user.user_id }, JWT_SECRET)

    const data = { account: res.locals.account, tokens, user: res.locals.user }
    await syncRecent(res.locals.user)

    res.set('X-Auth-Token', res.locals.jwtToken)
    next()

    if (!isExistingAccount(userAccount)) await syncHistory(data, 'google')
}

const isExistingAccount = function (account) {
    return Boolean(account)
}

module.exports = { loginGoogle }
