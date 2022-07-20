const { cassandraCursor, readOptions, writeOptions } = require('../helpers/cassandra')
const { formatLog } = require('../helpers/formatters')
const { logger } = require('../helpers/logger')

const INSERT = `INSERT INTO josu_users.reset_tokens (
    reset_token, base_uri, user_id, valid_until
) VALUES (
    :reset_token, :base_uri, :user_id, :valid_until
)`

const SELECT = `SELECT * FROM josu_users.reset_tokens
    WHERE reset_token = :reset_token`

const DELETE = `DELETE FROM josu_users.reset_tokens
    WHERE reset_token = :reset_token`

const insertResetToken = async function (params) {
    const response = await cassandraCursor.execute(INSERT, params, writeOptions)
    logger.debug('success', formatLog({ INSERT, params, info: response.info }))
    return response
}

const selectResetToken = async function (params) {
    const response = await cassandraCursor.execute(SELECT, params, readOptions)
    logger.debug('success', formatLog({ SELECT, params, info: response.info, rowLength: response.rowLength }))
    return response
}

const deleteResetToken = async function (params) {
    const response = await cassandraCursor.execute(DELETE, params, writeOptions)
    logger.debug('success', formatLog({ DELETE, params, info: response.info }))
    return response
}

module.exports = { insertResetToken, selectResetToken, deleteResetToken }
