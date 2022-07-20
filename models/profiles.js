const { cassandraCursor, readOptions, writeOptions } = require('../helpers/cassandra')
const { formatLog } = require('../helpers/formatters')
const { logger } = require('../helpers/logger')

const { INSERT: INSERT_EMAIL, DELETE: DELETE_EMAIL } = require('./emails')

const INSERT = `INSERT INTO josu_profiles.profiles (
    profile_id, email, emails, name, names
) VALUES (
    :profile_id, :email, :emails, :name, :names
)`

const SELECT = `SELECT * FROM josu_profiles.profiles
    WHERE profile_id = :profile_id`

const UPDATE = `UPDATE josu_profiles.profiles
    SET email = :email,
        emails = :emails,
        name = :name,
        names = :names
    WHERE profile_id = :profile_id`

const DELETE = `DELETE FROM josu_profiles.profiles
    WHERE profile_id = :profile_id`

const insertProfile = async function (params) {
    const queries = [
        { query: INSERT, params },
        { query: INSERT_EMAIL, params },
    ]
    const response = await cassandraCursor.batch(queries, writeOptions)
    logger.debug('success', formatLog({ params, queries, info: response.info }))
    return response
}

const selectProfile = async function (params) {
    const response = await cassandraCursor.execute(SELECT, params, readOptions)
    logger.debug('success', formatLog({ SELECT, params, info: response.info, rowLength: response.rowLength }))
    return response
}

const updateProfile = async function (profile, identity) {
    const queries = [
        { query: UPDATE, params: profile },
        { query: INSERT_EMAIL, params: identity },
    ]
    const response = await cassandraCursor.batch(queries, writeOptions)
    logger.debug('success', formatLog({ profile, identity, queries, info: response.info }))
    return response
}

const deleteProfile = async function (profile, identity) {
    const queries = [
        { query: DELETE, params: profile },
        { query: DELETE_EMAIL, params: identity },
    ]
    const response = await cassandraCursor.batch(queries, writeOptions)
    logger.debug('success', formatLog({ profile, identity, queries, info: response.info }))
    return response
}

module.exports = { insertProfile, selectProfile, updateProfile, deleteProfile }
