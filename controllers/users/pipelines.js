const { deleteS3, deleteRecursiveS3, queryCalendarApi } = require('../../helpers/connections')
const { deleteMeeting, selectMeetings } = require('../../models/meetings')
const { deleteUserAccount, updateUserCalendar } = require('../../models/users')
const { exchangeRefreshToken, revokeRefreshToken } = require('../../helpers/oauth')
const { formatLog } = require('../../helpers/formatters')
const { logger } = require('../../helpers/logger')

const deleteAccountData = async function (account, user) {
    await deleteS3(`userdata/${user.user_id}/accounts_${account.provider}/${account.id}`)
    await deleteRecursiveS3(`userdata/${user.user_id}/calendars_${account.provider}/${account.id}`)
    await deleteRecursiveS3(`userdata/${user.user_id}/calendar_metadata/${account.id}`)
    logger.debug('meetings and calendars deleted from S3', formatLog({ account }))

    await deleteAccountMeetings(account, user)
    logger.debug('meetings deleted from Cassandra', formatLog({ account }))

    const tokens = await exchangeRefreshToken(account, account.provider)
    const data = { account, tokens, user }
    const updatedUser = await queryCalendarApi('DELETE', `/v0/${account.provider}/subscribe`, data)
    await updateUserCalendar(updatedUser)
    logger.debug('account calendar subscription revoked', formatLog({ tokens }))

    await revokeRefreshToken(account.refresh_token)
    logger.debug('access tokens and grants revoked', formatLog({ account }))

    delete updatedUser[`__accounts_${account.provider}`]?.[account.id]
    await deleteUserAccount(updatedUser, { account: account.id })
    logger.debug('account deleted from user record', formatLog({ updatedUser }))

    return updatedUser
}

const deleteAccountMeetings = async function (account, user) {
    let pageState
    do {
        const resultSet = await selectMeetings(user, { pageState })
        pageState = resultSet.pageState

        const meetings = resultSet.rows?.filter(meeting => meeting.__account === account.id)
        await Promise.all(meetings.map(deleteMeeting))

        logger.debug('page of meetings deleted from Cassandra', formatLog({ pageState }))
    } while (pageState)
}

module.exports = { deleteAccountData }
