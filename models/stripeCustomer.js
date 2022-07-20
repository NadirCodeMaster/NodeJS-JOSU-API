const { cassandraCursor, readOptions, writeOptions } = require('../helpers/cassandra')
const { formatLog } = require('../helpers/formatters')
const { logger } = require('../helpers/logger')

const INSERT = `INSERT INTO josu_users.stripe_customers (
    user_id, customer_id, customer_name, id
) VALUES (
    :user_id, :customer_id, :customer_name, :id
)`

const UPDATE = `UPDATE josu_users.stripe_customers
    SET card_brand = :card_brand,
        card_last4 = :card_last4
    WHERE
        id = :id AND user_id = :user_id
`

const SELECT = `SELECT * FROM josu_users.stripe_customers
    WHERE user_id = :user_id`

const DELETE = `DELETE FROM josu_users.stripe_customers
    WHERE
        id = :id
        user_id = :user_id
`

const insertCustomer = async function (params) {
    const response = await cassandraCursor.execute(INSERT, params, writeOptions)
    logger.debug('success', formatLog({ INSERT, params, info: response.info }))
    return response
}

const selectCustomer = async function (params, query) {
    const response = await cassandraCursor.execute(SELECT, params, { ...readOptions, ...query })
    logger.debug('success', formatLog({
        SELECT, params, query, info: response.info, rowLength: response.rowLength,
    }))
    return response
}

const updateCustomer = async function (params) {
    const response = await cassandraCursor.execute(UPDATE, params, writeOptions)
    logger.debug('success', formatLog({ UPDATE, params, info: response.info }))
    return response
}

const deleteCustomer = async function (params) {
    const response = await cassandraCursor.execute(DELETE, params, writeOptions)
    logger.debug('success', formatLog({ DELETE, params, info: response.info }))
    return response
}

module.exports = {
    insertCustomer,
    selectCustomer,
    updateCustomer,
    deleteCustomer,
}
