const { cassandraCursor, writeOptions } = require('../helpers/cassandra')

const INSERT = `INSERT INTO "slack_workspaces"
    (id, user_id, created, domain, email_domain, is_subscribed, name) VALUES
    (:id, :user_id, :created, :domain, :email_domain, :is_subscribed, :name)`

const SELECT = 'SELECT * FROM "slack_workspaces"'

const UPDATE_SUBSCRIPTION = `UPDATE "slack_workspaces"
    SET is_subscribed = :is_subscribed WHERE id = :id AND user_id = :user_id`

const insertWorkspace = async function (params) {
    return await cassandraCursor.execute(INSERT, params, writeOptions)
}

const selectWorkspaces = async function () {
    return await cassandraCursor.execute(SELECT)
}

const selectWorkspacesBySubscribed = async function (params) {
    const workspaces = await cassandraCursor.execute(SELECT, params, { prepare: true })
    return { rows: workspaces.rows?.filter(x => x.is_subscribed) }
}

const updateWorkspaceSubscription = async function (params) {
    return await cassandraCursor.execute(UPDATE_SUBSCRIPTION, params, writeOptions)
}

module.exports = {
    insertWorkspace, selectWorkspaces, selectWorkspacesBySubscribed, updateWorkspaceSubscription,
}
