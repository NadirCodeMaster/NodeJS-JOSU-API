const bcrypt = require('bcrypt')
const fetch = require('node-fetch')
const uuid = require('uuid')

const {
    fetchAccessTokenLegacy,
    fetchInstagramAccessToken,
    fetchLinkedinAccessToken,
    putAccessToken,
} = require('../../helpers/oauth')

const { insertUserLegacy, selectUserLegacy } = require('../../models/usersLegacy')
const { insertWorkspace } = require('../../models/slackWorkspaces')

const { FRONTEND_DOMAIN, INSTAGRAM_CLIENT_SECRET } = process.env

/* Register new user. */
const register = async function (req, res) {
    const { email: emailRaw, password, firstName, lastName } = req.body
    const email = emailRaw.toLowerCase()

    const oldUser = await selectUserLegacy(email)

    if (oldUser.rows.length) {
        throw Error(400)
    }

    const id = uuid.v4()
    const passwordHash = bcrypt.hashSync(password, 10)
    await insertUserLegacy(email, passwordHash, id, firstName, lastName)

    res.status(201).json({ data: { userId: id } })
}

/* Get Instagram OAuth2 token and store it. */
const createInstagramAccount = async function (req, res) {
    const tokens = await fetchInstagramAccessToken(req, 'instagram')
    const { access_token: accessToken } = tokens
    if (accessToken) {
        const queryString = new URLSearchParams({
            grant_type: 'ig_exchange_token',
            client_secret: INSTAGRAM_CLIENT_SECRET,
            access_token: accessToken,
        })
        const instagram = await fetch(`https://graph.instagram.com/access_token?${queryString.toString()}`)
        const { access_token: longLivedAccessToken } = await instagram.json()
        const instagramUser = await fetch(
            `https://graph.instagram.com/me?fields=id,username&access_token=${longLivedAccessToken}`,
        )
        if (instagramUser) {
            const { userId } = req.session
            const { username } = await instagramUser.json()
            await putAccessToken(userId, username, longLivedAccessToken, 'instagram')
        }
    }
    res.status(200).json({ status: 'success' })
}

/* Get Linkedin OAuth2 token and store it. */
const createLinkedinAccount = async function (req, res) {
    const tokens = await fetchLinkedinAccessToken(req, 'linkedin')

    const { access_token: accessToken } = tokens
    if (accessToken) {
        const linkedin = await fetch('https://api.linkedin.com/v2/me',
            { headers: { Authorization: `Bearer ${accessToken}` } },
        )

        const { localizedFirstName, localizedLastName } = await linkedin.json()
        const { userId } = req.session

        await putAccessToken(userId, `${localizedFirstName} ${localizedLastName}`, accessToken, 'linkedin')
    }
    res.status(200).json({ status: 'success' })
}

const createSlackAccount = async function (req, res) {
    const {
        access_token, authed_user: { id: user_id }, // eslint-disable-line camelcase
        team: { id: team_id }, // eslint-disable-line camelcase
    } = await fetchAccessTokenLegacy(req, 'slack')
    // TODO store team domain in user_accounts
    // make another call and store it at slack_workspaces
    const { userId } = req.session

    await putAccessToken(userId, JSON.stringify({ team_id, user_id }), access_token, 'slack')

    const response = await fetch(
        `https://slack.com/api/team.info?team_id=${team_id}&token=${access_token}`, // eslint-disable-line camelcase
    )
    const workspace = await response.json()

    await insertWorkspace({
        ...workspace.team,
        created: new Date(),
        email_domain: workspace.team.email_domain.split(','),
        is_subscribed: false,
        user_id: userId,
    })
    res.redirect(`${FRONTEND_DOMAIN}/slack`)
}

/* Store Twitter OAuth2 token. */
const createTwitterAccount = async function (req, res) {
    const { userId } = req.session
    const {
        oauth_token: oauthToken,
        oauth_token_secret: oauthTokenSecret,
        account_nickname: accountNickname,
        user_id: twitterUserId,
    } = req.body

    await putAccessToken(
        userId,
        accountNickname,
        `{"oauth_token": "${oauthToken}", "oauth_token_secret": "${oauthTokenSecret}", "user_id": "${twitterUserId}"}`,
        'twitter',
    )
    res.status(200).json({ status: 'success' })
}

const createZoomAccount = async function (req, res) {
    // TODO implement
    throw Error('Not Implemented')
}

module.exports = {
    createInstagramAccount,
    createLinkedinAccount,
    createSlackAccount,
    createTwitterAccount,
    createZoomAccount,
    register,
}
