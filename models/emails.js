const { cassandraCursor, readOptions, writeOptions } = require('../helpers/cassandra')
const { formatLog } = require('../helpers/formatters')
const { logger } = require('../helpers/logger')

const INSERT = `INSERT INTO josu_profiles.emails (
    email, profile_id
) VALUES (
    :email, :profile_id
)`

const SELECT = `SELECT * FROM josu_profiles.emails
    WHERE email = :email`

const DELETE = `DELETE FROM josu_profiles.emails
    WHERE email = :email`

const selectEmail = async function (params) {
    const response = await cassandraCursor.execute(SELECT, params, readOptions)
    logger.debug('success', formatLog({ SELECT, params, info: response.info, rowLength: response.rowLength }))
    return response
}

const deleteEmail = async function (params) {
    const response = await cassandraCursor.execute(DELETE, params, writeOptions)
    logger.debug('success', formatLog({ DELETE, params, info: response.info }))
    return response
}

module.exports = { INSERT, DELETE, selectEmail, deleteEmail }
