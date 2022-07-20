const { cassandraCursor, writeOptions } = require('../helpers/cassandra')

const INSERT_USERS = 'INSERT INTO "users_legacy" (email, password, id, first_name, last_name) VALUES (?, ?, ?, ?, ?)'
const SELECT_USERS = 'SELECT * FROM "users_legacy" WHERE email = ?'
const UPDATE_USERS = 'UPDATE "users_legacy" SET password = ? WHERE email = ? AND id = ?'

/* Insert new user. */
const insertUserLegacy = async function (email, password, id, firstName, lastName) {
    const params = [email, password, id, firstName, lastName]
    return await cassandraCursor.execute(INSERT_USERS, params, writeOptions)
}

/* Select user by email. */
const selectUserLegacy = async function (email) {
    const params = [email]
    return await cassandraCursor.execute(SELECT_USERS, params)
}

/* Update user password. */
const updateUserLegacy = async function (email, password, id) {
    const params = [password, email, id]
    return await cassandraCursor.execute(UPDATE_USERS, params, writeOptions)
}

module.exports = { insertUserLegacy, selectUserLegacy, updateUserLegacy }
