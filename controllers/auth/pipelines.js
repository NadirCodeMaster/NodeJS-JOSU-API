const { exchangeRefreshToken } = require('../../helpers/oauth')
const { formatLog } = require('../../helpers/formatters')
const { formatProfile } = require('./formatters')
const { insertProfile, selectProfile, updateProfile } = require('../../models/profiles')
const { logger } = require('../../helpers/logger')
const { queryCalendarApi, uploadS3 } = require('../../helpers/connections')
const { selectEmail } = require('../../models/emails')
const { updateUserCalendar } = require('../../models/users')

const getProfile = async function (user) {
    const emails = await selectEmail(user)
    const email = emails.rows?.[0]

    let profile

    if (email) {
        const profiles = await selectProfile(email)
        profile = profiles.rows?.[0]
        logger.debug('profile retrieved', formatLog({ profile }))
    } else {
        profile = formatProfile(user)
        logger.debug('profile formatted', formatLog({ profile }))
        await insertProfile(profile)
    }

    return profile.profile_id
}

const addProfile = async function (user, account) {
    const profiles = await selectProfile(user)
    const profile = profiles.rows?.[0]

    if (!profile.emails.includes(account.email)) {
        profile.emails.push(account.email)
        profile.names.push(account.name)
        await updateProfile(profile, { ...profile, ...account })
        logger.debug('profile added', formatLog({ profile }))
    }

    // TODO get profile by account email
    // replace profile_ids of meetings with main profile one
    // delete account-profile
}

const syncHistory = async function (data, provider) {
    const updatedUser = await queryCalendarApi('POST', `/v0/${provider}/subscribe`, data)
    await updateUserCalendar(updatedUser)
    logger.debug('user subscribed', formatLog({ updatedUser }))

    const key = `userdata/${data.user.user_id}/accounts_${provider}/${data.account.id}`
    await uploadS3(key, JSON.stringify(data.account))
    logger.debug('account dumped to s3', formatLog({ key }))

    const start = new Date('1970-01-01')
    const end = new Date(new Date().getTime() - 86400 * 1000)
    await queryCalendarApi('POST', `/v0/${provider}/history/${start.toISOString()}/${end.toISOString()}`, data)
    logger.debug('full history synced', formatLog({ start, end }))
}

const syncRecent = async function (user) {
    await Promise.all(
        Object.values(user.__accounts_google).map(account => syncAccount(account, user)),
    )
    logger.debug('recent Google Calendar meetings synced', formatLog({ user }))

    await Promise.all(
        Object.values(user.__accounts_microsoft).map(account => syncAccount(account, user)),
    )
    logger.debug('recent Microsoft Calendar meetings synced', formatLog({ user }))

    await new Promise(resolve => setTimeout(resolve, 3000))
    logger.debug('mandatory 3 second timeout ended', formatLog())
}

const syncAccount = async function (account, user) {
    const start = new Date(new Date().getTime() - 86400 * 1000)
    const end = new Date(start.getTime() + 30 * 86400 * 1000)

    const tokens = await exchangeRefreshToken(account, account.provider)
    const data = { account, tokens, user }

    const url = `/v0/${account.provider}/history/${start.toISOString()}/${end.toISOString()}`
    return await queryCalendarApi('POST', url, data)
}

module.exports = { addProfile, getProfile, syncHistory, syncRecent }
