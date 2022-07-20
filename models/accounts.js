const { cassandraCursor, readOptions, writeOptions } = require('../helpers/cassandra')
const { formatLog } = require('../helpers/formatters')
const { logger } = require('../helpers/logger')

const INSERT = `INSERT INTO josu_users.accounts (
    account, user_id
) VALUES (
    :account, :user_id
)`

const SELECT = `SELECT * FROM josu_users.accounts
    WHERE account = :account`

const DELETE = `DELETE FROM josu_users.accounts
    WHERE account = :account`

const selectAccount = async function (params) {
    const response = await cassandraCursor.execute(SELECT, params, readOptions)
    logger.debug('success', formatLog({ SELECT, params, info: response.info, rowLength: response.rowLength }))
    return response
}

const deleteAccount = async function (params) {
    const response = await cassandraCursor.execute(DELETE, params, writeOptions)
    logger.debug('success', formatLog({ DELETE, params, info: response.info }))
    return response
}

module.exports = { INSERT, DELETE, selectAccount, deleteAccount }
