const { cassandraCursor, readOptions, writeOptions } = require('../helpers/cassandra')
const { deserializeDunderFields, serializeDunderFields } = require('../helpers/serializers')
const { formatLog } = require('../helpers/formatters')
const { logger } = require('../helpers/logger')

const { INSERT: INSERT_ACCOUNT, DELETE: DELETE_ACCOUNT } = require('./accounts')
const { INSERT: INSERT_USERNAME, DELETE: DELETE_USERNAME } = require('./usernames')

const INSERT = `INSERT INTO josu_users.users (
    user_id,
    "__accounts_google", "__accounts_microsoft",
    "__calendars_google", "__calendars_microsoft",
    autojoin_zoom, email, first_name, last_name, devices, password,
    profile_id, username, userpic_url
) VALUES (
    :user_id,
    :"__accounts_google", :"__accounts_microsoft",
    :"__calendars_google", :"__calendars_microsoft",
    :autojoin_zoom, :email, :first_name, :last_name, :devices, :password,
    :profile_id, :username, :userpic_url
)`

const SELECT = 'SELECT * FROM josu_users.users'

const SELECT_USER_ID = `SELECT * FROM josu_users.users
    WHERE user_id = :user_id`

const UPDATE = `UPDATE josu_users.users
    SET "__accounts_google" = :"__accounts_google",
        "__accounts_microsoft" = :"__accounts_microsoft",
        "__calendars_google" = :"__calendars_google",
        "__calendars_microsoft" = :"__calendars_microsoft",
        autojoin_zoom = :autojoin_zoom,
        devices = :devices,
        email = :email,
        first_name = :first_name,
        last_name = :last_name,
        password = :password,
        profile_id = :profile_id,
        username = :username,
        userpic_url = :userpic_url
    WHERE user_id = :user_id`

const UPDATE_ACCOUNTS = `UPDATE josu_users.users
    SET "__accounts_google" = :"__accounts_google",
        "__accounts_microsoft" = :"__accounts_microsoft"
    WHERE user_id = :user_id`

const UPDATE_AUTOJOIN = `UPDATE josu_users.users
    SET autojoin_zoom = :autojoin_zoom
    WHERE user_id = :user_id`

const UPDATE_CALENDAR = `UPDATE josu_users.users
    SET "__calendars_google" = :"__calendars_google",
        "__calendars_microsoft" = :"__calendars_microsoft"
    WHERE user_id = :user_id`

const UPDATE_DEVICES = `UPDATE josu_users.users
    SET devices = :devices
    WHERE user_id = :user_id`

const UPDATE_PASSWORD = `UPDATE josu_users.users
    SET password = :password
    WHERE user_id = :user_id`

const UPDATE_USERNAME = `UPDATE josu_users.users
    SET username = :username
    WHERE user_id = :user_id`

const DELETE = `DELETE FROM josu_users.users
    WHERE user_id = :user_id`

const insertUser = async function (user, account) {
    const queries = [
        { query: INSERT, params: deserializeDunderFields(user) },
        { query: INSERT_ACCOUNT, params: account },
    ]
    const response = await cassandraCursor.batch(queries, writeOptions)

    logger.debug('success', formatLog({ user, account, queries, info: response.info }))
    return response
}

const selectUser = async function (params) {
    const response = await cassandraCursor.execute(SELECT_USER_ID, params, readOptions)
    response.rows = response.rows?.map(serializeDunderFields)

    logger.debug('success', formatLog({ SELECT_USER_ID, params, info: response.info, rowLength: response.rowLength }))
    return response
}

const selectUsers = async function (userOptions) {
    const options = { ...readOptions, ...userOptions }
    const response = await cassandraCursor.execute(SELECT, null, options)
    response.rows = response.rows?.map(serializeDunderFields)

    logger.debug('success', formatLog({ SELECT, userOptions, info: response.info, rowLength: response.rowLength }))
    return response
}

const updateUser = async function (params) {
    const response = await cassandraCursor.execute(UPDATE, deserializeDunderFields(params), writeOptions)
    logger.debug('success', formatLog({ UPDATE, params, info: response.info }))
    return response
}

const updateUserAccount = async function (user, account) {
    const queries = [
        { query: UPDATE_ACCOUNTS, params: deserializeDunderFields(user) },
        { query: INSERT_ACCOUNT, params: account },
    ]
    const response = await cassandraCursor.batch(queries, writeOptions)

    logger.debug('success', formatLog({ user, account, queries, info: response.info }))
    return response
}

const updateUserAutojoin = async function (params) {
    const response = await cassandraCursor.execute(UPDATE_AUTOJOIN, params, writeOptions)
    logger.debug('success', formatLog({ UPDATE_AUTOJOIN, params, info: response.info }))
    return response
}

const updateUserCalendar = async function (params) {
    const response = await cassandraCursor.execute(UPDATE_CALENDAR, deserializeDunderFields(params), writeOptions)
    logger.debug('success', formatLog({ UPDATE_CALENDAR, params, info: response.info }))
    return response
}

const updateUserDevices = async function (params) {
    const response = await cassandraCursor.execute(UPDATE_DEVICES, params, writeOptions)
    logger.debug('success', formatLog({ UPDATE_DEVICES, params, info: response.info }))
    return response
}

const updateUserPassword = async function (params) {
    const response = await cassandraCursor.execute(UPDATE_PASSWORD, params, writeOptions)
    logger.debug('success', formatLog({ UPDATE_PASSWORD, params, info: response.info }))
    return response
}

const updateUserUsername = async function (username, oldUsername) {
    const queries = [
        { query: UPDATE_USERNAME, params: username },
        { query: INSERT_USERNAME, params: username },
    ]
    if (oldUsername.username) {
        queries.push({ query: DELETE_USERNAME, params: oldUsername })
    }
    const response = await cassandraCursor.batch(queries, writeOptions)

    logger.debug('success', formatLog({ username, oldUsername, queries, info: response.info }))
    return response
}

const deleteUser = async function (params) {
    const queries = [
        { query: DELETE, params },
    ]
    if (params.username) {
        queries.push({ query: DELETE_USERNAME, params })
    }
    const response = await cassandraCursor.batch(queries, writeOptions)

    logger.debug('success', formatLog({ params, queries, info: response.info }))
    return response
}

const deleteUserAccount = async function (user, account) {
    const queries = [
        { query: UPDATE_ACCOUNTS, params: deserializeDunderFields(user) },
        { query: DELETE_ACCOUNT, params: account },
    ]
    const response = await cassandraCursor.batch(queries, writeOptions)

    logger.debug('success', formatLog({ user, account, queries, info: response.info }))
    return response
}

module.exports = {
    insertUser,
    selectUser,
    selectUsers,
    updateUser,
    updateUserAccount,
    updateUserAutojoin,
    updateUserCalendar,
    updateUserDevices,
    updateUserPassword,
    updateUserUsername,
    deleteUser,
    deleteUserAccount,
}
