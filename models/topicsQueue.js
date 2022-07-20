const { cassandraCursor, readOptions, writeOptions } = require('../helpers/cassandra')

const INSERT = `INSERT INTO "topics_queue" (
    id, user_id, provider, account_id, speaker_id, text
) VALUES (
    :id, :user_id, :provider, :account_id, :speaker_id, :text
)`
const SELECT = 'SELECT * FROM "topics_queue"'
const DELETE = `DELETE FROM "topics_queue"
    WHERE id = :id AND user_id = :user_id AND provider = :provider`

const insertTopicsQueue = async function (params) {
    return await cassandraCursor.execute(INSERT, params, writeOptions)
}

const selectTopicsQueue = async function (userOptions) {
    const options = { ...readOptions, ...userOptions }
    return await cassandraCursor.execute(SELECT, null, options)
}

const deleteTopicsQueue = async function (params) {
    return await cassandraCursor.execute(DELETE, params, writeOptions)
}

module.exports = { deleteTopicsQueue, insertTopicsQueue, selectTopicsQueue }
