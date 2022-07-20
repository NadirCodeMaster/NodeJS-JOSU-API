const { cassandraCursor, readOptions, writeOptions } = require('../helpers/cassandra')

const INSERT_EMAILS_QUEUE = `INSERT INTO "emails_queue" (
    id, user_id, provider, account_id, speaker_id
) VALUES (
    :id, :user_id, :provider, :account_id, :speaker_id
)`
const SELECT_EMAILS_QUEUE = 'SELECT * FROM "emails_queue"'
const DELETE_EMAILS_QUEUE = `DELETE FROM "emails_queue"
    WHERE id = :id AND user_id = :user_id AND provider = :provider`

const insertEmailsQueue = async function (params) {
    return await cassandraCursor.execute(INSERT_EMAILS_QUEUE, params, writeOptions)
}

const selectEmailsQueue = async function (userOptions) {
    const options = { ...readOptions, ...userOptions }
    return await cassandraCursor.execute(SELECT_EMAILS_QUEUE, null, options)
}

const deleteEmailsQueue = async function (params) {
    return await cassandraCursor.execute(DELETE_EMAILS_QUEUE, params, writeOptions)
}

module.exports = { deleteEmailsQueue, insertEmailsQueue, selectEmailsQueue }
