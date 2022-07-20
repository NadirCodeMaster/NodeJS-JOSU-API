const { cassandraCursor, readOptions, writeOptions } = require('../helpers/cassandra')
const { formatLog } = require('../helpers/formatters')
const { logger } = require('../helpers/logger')

const INSERT = `INSERT INTO josu_users.stripe_subscriptions (
    id, user_id, name, ends_at, plan_id, quantity, subscription_id, subscription_status, trial_ends_at
) VALUES (
    :id, :user_id, :name, :ends_at, :plan_id, :quantity, :subscription_id, :subscription_status, :trial_ends_at
)`

const SELECT = `SELECT * FROM josu_users.stripe_subscriptions
    WHERE user_id = :user_id`

const UPDATE = `UPDATE josu_users.stripe_subscriptions
    SET ends_at = :ends_at,
        plan_id = :plan_id,
        subscription_id = :subscription_id,
        subscription_status = :subscription_status,
        trial_ends_at = :trial_ends_at
    WHERE
        id = :id AND user_id = :user_id
`

const addSubscription = async function (params) {
    const response = await cassandraCursor.execute(INSERT, params, writeOptions)
    logger.debug('success', formatLog({ INSERT, params, info: response.info }))
    return response
}

const selectSubscription = async function (params, query) {
    const response = await cassandraCursor.execute(SELECT, params, { ...readOptions, ...query })
    logger.debug('success', formatLog({
        SELECT, params, query, info: response.info, rowLength: response.rowLength,
    }))
    return response
}

const updateSubscription = async function (params) {
    const response = await cassandraCursor.execute(UPDATE, params, writeOptions)
    logger.debug('success', formatLog({ UPDATE, params, info: response.info }))
    return response
}

module.exports = {
    addSubscription,
    selectSubscription,
    updateSubscription,
}
