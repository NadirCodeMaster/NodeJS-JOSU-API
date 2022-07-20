const { cassandraCursor, writeOptions } = require('../helpers/cassandra')

const INSERT_SPEAKERS = `INSERT INTO "speakers"
    (provider, account_nickname, id, created, description, first_name, is_deleted, last_name, photo_url) VALUES
    (:provider, :account_nickname, :id, :created, :description, :first_name, :is_deleted, :last_name, :photo_url)`

const SELECT_SPEAKERS = 'SELECT * FROM "speakers" WHERE provider = :provider AND account_nickname = :account_nickname'

const insertSpeaker = async function (params) {
    return await cassandraCursor.execute(INSERT_SPEAKERS, params, writeOptions)
}

const selectSpeaker = async function (params) {
    return await cassandraCursor.execute(SELECT_SPEAKERS, params, { prepare: true })
}

module.exports = { insertSpeaker, selectSpeaker }
