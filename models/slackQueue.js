const { cassandraCursor, writeOptions } = require('../helpers/cassandra')

const INSERT = 'INSERT INTO "slack_queue" (id, text) VALUES (:id, :text)'
const DELETE = 'DELETE FROM "slack_queue" WHERE id = :id'

const insertQueue = async function (params) {
    return await cassandraCursor.execute(INSERT, params, writeOptions)
}

const deleteQueue = async function (params) {
    return await cassandraCursor.execute(DELETE, params, writeOptions)
}

module.exports = { insertQueue, deleteQueue }
