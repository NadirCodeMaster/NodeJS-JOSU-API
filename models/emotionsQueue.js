const { cassandraCursor, readOptions, writeOptions } = require('../helpers/cassandra')

const INSERT = `INSERT INTO "emotions_queue" (
    id, user_id, account_id, provider, speaker_id, text
) VALUES (
    :id, :user_id, :account_id, :provider, :speaker_id, :text
)`
const SELECT = 'SELECT * FROM "emotions_queue"'
const DELETE = `DELETE FROM "emotions_queue"
    WHERE id = :id AND user_id = :user_id AND provider = :provider`

const insertEmotionsQueue = async function (params) {
    return await cassandraCursor.execute(INSERT, params, writeOptions)
}

const selectEmotionsQueue = async function (userOptions) {
    const options = { ...readOptions, ...userOptions }
    return await cassandraCursor.execute(SELECT, null, options)
}

const deleteEmotionsQueue = async function (params) {
    return await cassandraCursor.execute(DELETE, params, writeOptions)
}

module.exports = { deleteEmotionsQueue, insertEmotionsQueue, selectEmotionsQueue }
