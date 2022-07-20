const { cassandraCursor, writeOptions } = require('../helpers/cassandra')

const INSERT = `INSERT INTO "slack_channels"
    (id, user_id, created, creator, is_channel, is_group, is_im, is_private,
     is_subscribed, name, previous_names, topic, workspace) VALUES
    (:id, :user_id, :created, :creator, :is_channel, :is_group, :is_im, :is_private,
     :is_subscribed, :name, :previous_names, :topic, :workspace)`

const SELECT = 'SELECT * FROM "slack_channels"'

const UPDATE_SUBSCRIPTION = `UPDATE "slack_channels"
    SET is_subscribed = :is_subscribed WHERE id = :id AND user_id = :user_id`

const insertChannel = async function (params) {
    return await cassandraCursor.execute(INSERT, params, writeOptions)
}

const selectChannels = async function () {
    return await cassandraCursor.execute(SELECT)
}

const selectChannelsBySubscribed = async function (params) {
    const channels = await cassandraCursor.execute(SELECT, params, { prepare: true })
    return { rows: channels.rows?.filter(x => x.is_subscribed) }
}

const updateChannelSubscription = async function (params) {
    return await cassandraCursor.execute(UPDATE_SUBSCRIPTION, params, writeOptions)
}

module.exports = {
    insertChannel, selectChannels, selectChannelsBySubscribed, updateChannelSubscription,
}
