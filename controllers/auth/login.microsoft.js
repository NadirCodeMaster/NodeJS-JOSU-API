const jwt = require('jsonwebtoken')

const { fetchAccessToken } = require('../../helpers/oauth')
const { fetchMicrosoftUserpic, queryJsonApi } = require('../../helpers/connections')
const { formatUserMicrosoft } = require('./formatters')
const { insertUser, selectUser } = require('../../models/users')
const { selectAccount } = require('../../models/accounts')
const { getProfile, syncHistory, syncRecent } = require('./pipelines')

const { JWT_SECRET } = process.env

const loginMicrosoft = async function (req, res, next) {
    const tokens = await fetchAccessToken(req, 'microsoft')
    const account = await queryJsonApi('GET', 'https://graph.microsoft.com/v1.0/me', tokens.access_token)

    const userAccounts = await selectAccount({ account: account.id })
    const userAccount = userAccounts.rows?.[0]

    if (isExistingAccount(userAccount)) {
        const users = await selectUser(userAccount)
        res.locals.user = users.rows?.[0]
    } else {
        res.locals.user = formatUserMicrosoft(account, tokens)
        res.locals.user.profile_id = await getProfile(res.locals.user)
        res.locals.user.userpic_url = await fetchMicrosoftUserpic(res.locals.user, tokens.access_token)
        await insertUser(res.locals.user, { account: account.id, user_id: res.locals.user.user_id })
    }

    res.locals.account = res.locals.user.__accounts_microsoft[account.id]
    res.locals.jwtToken = jwt.sign({ user_id: res.locals.user.user_id }, JWT_SECRET)

    const data = { account: res.locals.account, tokens, user: res.locals.user }
    await syncRecent(res.locals.user)

    res.set('X-Auth-Token', res.locals.jwtToken)
    next()

    if (!isExistingAccount(account)) await syncHistory(data, 'microsoft')
}

const isExistingAccount = function (userAccount) {
    return Boolean(userAccount)
}

module.exports = { loginMicrosoft }
