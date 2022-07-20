const { cassandraCursor, writeOptions } = require('../helpers/cassandra')

const INSERT = `INSERT INTO "topics" (
    user_id, provider, id, account_id, created, end_time,
    kind, speaker_id, start_time, topic, type, weight
) VALUES (
    :user_id, :provider, :id, :account_id, :created, :end_time,
    :kind, :speaker_id, :start_time, :topic, :type, :weight
)`

const SELECT_BY_USER_ID = 'SELECT * FROM "topics" WHERE user_id = :user_id'

const insertTopic = async function (params) {
    return await cassandraCursor.execute(INSERT, params, writeOptions)
}

const selectTopicByUser = async function (params) {
    return await cassandraCursor.execute(SELECT_BY_USER_ID, params, writeOptions)
}

module.exports = { insertTopic, selectTopicByUser }
