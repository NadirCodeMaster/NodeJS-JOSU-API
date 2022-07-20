const { cassandraCursor, writeOptions } = require('../helpers/cassandra')

const INSERT = `INSERT INTO "user_accounts"
    (provider, id, user_id, account_nickname, created, is_active, last_sync, refresh_token)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

const INSERT_BY_USER_ID = `INSERT INTO "user_accounts_byUserId"
    (provider, id, user_id, account_nickname, created, is_active, last_sync, refresh_token)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

const SELECT = 'SELECT * FROM "user_accounts" WHERE provider = :provider'
const SELECT_BY_USER_ID = 'SELECT * FROM "user_accounts_byUserId" WHERE user_id = :user_id AND provider = :provider'

const UPDATE = `UPDATE "user_accounts"
    SET account_nickname = :account_nickname,
        created = :created,
        is_active = :is_active,
        last_sync = :last_sync
    WHERE provider = :provider AND id = :id AND user_id = :user_id`

const UPDATE_BY_USER_ID = `UPDATE "user_accounts_byUserId"
    SET account_nickname = :account_nickname,
        created = :created,
        is_active = :is_active,
        last_sync = :last_sync
    WHERE provider = :provider AND id = :id AND user_id = :user_id`

const UPDATE_IS_ACTIVE = `UPDATE "user_accounts"
    SET is_active = ? WHERE provider = ? AND id = ? AND user_id = ?`

const UPDATE_BY_USER_ID_IS_ACTIVE = `UPDATE "user_accounts_byUserId"
    SET is_active = ? WHERE provider = ? AND id = ? AND user_id = ?`

const UPDATE_TOKEN = `UPDATE "user_accounts"
    SET refresh_token = ? WHERE provider = ? AND id = ? AND user_id = ?`

const UPDATE_BY_USER_TOKEN = `UPDATE "user_accounts_byUserId"
    SET refresh_token = ? WHERE provider = ? AND id = ? AND user_id = ?`

const DELETE_USER_ACCOUNT = 'DELETE FROM "user_accounts" WHERE id = ? AND provider = ?'
const DELETE_USER_ACCOUNT_BY_ID = `DELETE FROM "user_accounts_byUserId"
    WHERE id = ? AND user_id = ? AND provider = ?`

/* Create new user account. */
const insertUserAccounts = async function (
    provider, id, userId, accountNickname, created, isActive, lastSync, refreshToken,
) {
    const accounts = await selectUserAccountsByUserId({ provider, user_id: userId })
    const existingAccount = accounts.rows.find(x => x.account_nickname === accountNickname)

    // TODO split in two
    if (existingAccount) {
        const params = [refreshToken, provider, existingAccount.id, userId]
        const queries = [
            { query: UPDATE_TOKEN, params },
            { query: UPDATE_BY_USER_TOKEN, params },
        ]
        await cassandraCursor.batch(queries, writeOptions)
        return existingAccount.id
    }

    const params = [provider, id, userId, accountNickname, created, isActive, lastSync, refreshToken]
    const queries = [
        { query: INSERT, params },
        { query: INSERT_BY_USER_ID, params },
    ]
    await cassandraCursor.batch(queries, writeOptions)
    return id
}

const selectUserAccounts = async function (params) {
    return await cassandraCursor.execute(SELECT, params, { prepare: true })
}

const selectUserAccountsByUserId = async function (params) {
    return await cassandraCursor.execute(SELECT_BY_USER_ID, params, { prepare: true })
}

const updateUserAccount = async function (params) {
    const queries = [
        { query: UPDATE, params },
        { query: UPDATE_BY_USER_ID, params },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

/* Update is_active for user gmail account. */
const updateUserAccountsIsActive = async function (provider, id, userId, isActive) {
    const params = [isActive, provider, id, userId]
    const queries = [
        { query: UPDATE_IS_ACTIVE, params },
        { query: UPDATE_BY_USER_ID_IS_ACTIVE, params },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const deleteUserAccount = async function (id, userId, provider) {
    const queries = [
        { query: DELETE_USER_ACCOUNT, params: [id, provider] },
        { query: DELETE_USER_ACCOUNT_BY_ID, params: [id, userId, provider] },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

module.exports = {
    insertUserAccounts,
    selectUserAccounts,
    selectUserAccountsByUserId,
    updateUserAccount,
    updateUserAccountsIsActive,
    deleteUserAccount,
}
