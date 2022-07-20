const { cassandraCursor, readOptions } = require('../helpers/cassandra')
const { formatLog } = require('../helpers/formatters')
const { logger } = require('../helpers/logger')

const INSERT = `INSERT INTO josu_users.usernames (
    username, user_id
) VALUES (
    :username, :user_id
)`

const SELECT = `SELECT * FROM josu_users.usernames
    WHERE username = :username`

const DELETE = `DELETE FROM josu_users.usernames
    WHERE username = :username`

const selectUsername = async function (params) {
    const response = await cassandraCursor.execute(SELECT, params, readOptions)
    logger.debug('success', formatLog({ SELECT, params, info: response.info, rowLength: response.rowLength }))
    return response
}

module.exports = { INSERT, DELETE, selectUsername }
