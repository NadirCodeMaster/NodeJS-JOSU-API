const { cassandraCursor, writeOptions } = require('../helpers/cassandra')

const INSERT = `INSERT INTO "slack_messages"
    (id, author, channel, created, edited, is_edited, latest_reply, reactions,
     reply_count, reply_users, reply_users_count, speaker_id, text, type, word_count, workspace) VALUES
    (:id, :author, :channel, :created, :edited, :is_edited, :latest_reply, :reactions,
     :reply_count, :reply_users, :reply_users_count, :speaker_id, :text, :type, :word_count, :workspace)`

const insertMessage = async function (params) {
    return await cassandraCursor.execute(INSERT, params, writeOptions)
}

module.exports = { insertMessage }
