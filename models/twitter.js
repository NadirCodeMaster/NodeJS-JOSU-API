const { cassandraCursor, writeOptions } = require('../helpers/cassandra')

const INSERT_SYNC_TWITTER_FRIEND_INFO = `INSERT INTO "sync_twitter_friend_infos"
    (id, last_sync_friend_id, user_account_id, user_id)
    VALUES (?, ?, ?, ?)`

const UPDATE_SYNC_TWITTER_FRIEND_INFO = `UPDATE "sync_twitter_friend_infos"
    SET last_sync_friend_id = ?
    WHERE id = ? AND user_id = ? AND user_account_id = ?`

const SELECT_SYNC_TWITTER_FRIEND_INFO = `SELECT * FROM "sync_twitter_friend_infos"
    WHERE user_id =:user_id AND user_account_id=:user_account_id`

const INSERT_TWITTER_FRIEND = `INSERT INTO "twitter_friends"
    (user_id, user_account_id, id, twitter_id, twitter_name)
    VALUES (?, ?, ?, ?, ?)`

const INSERT_SYNC_TWITTER_FOLLOWER_INFO = `INSERT INTO "sync_twitter_follower_infos"
    (id, last_sync_follower_id, user_account_id, user_id)
    VALUES (?, ?, ?, ?)`

const UPDATE_SYNC_TWITTER_FOLLOWER_INFO = `UPDATE "sync_twitter_follower_infos"
    SET last_sync_follower_id = ?
    WHERE id = ? AND user_id = ? AND user_account_id = ?`

const SELECT_SYNC_TWITTER_FOLLOWER_INFO = `SELECT * FROM "sync_twitter_follower_infos"
    WHERE user_id =:user_id AND user_account_id=:user_account_id`

const INSERT_TWITTER_FOLLOWER = `INSERT INTO "twitter_followers"
    (user_id, user_account_id, id, twitter_id, twitter_name)
    VALUES (?, ?, ?, ?, ?)`

const INSERT_SYNC_TWITTER_DIRECT_MESSAGE_INFO = `INSERT INTO "sync_twitter_direct_message_infos"
    (id, last_sync_message_id, user_account_id, user_id)
    VALUES (?, ?, ?, ?)`

const UPDATE_SYNC_TWITTER_DIRECT_MESSAGE_INFO = `UPDATE "sync_twitter_direct_message_infos"
    SET last_sync_message_id = ?
    WHERE id = ? AND user_id = ? AND user_account_id = ?`

const SELECT_SYNC_TWITTER_DIRECT_MESSAGE_INFO = `SELECT * FROM "sync_twitter_direct_message_infos"
    WHERE user_id =:user_id AND user_account_id=:user_account_id`

const INSERT_TWITTER_DIRECT_MESSAGE = `INSERT INTO "twitter_direct_messages"
    (user_id, user_account_id, id, created_timestamp, message, message_id, recipient_id, sender_id, type)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

const insertSyncTwitterFriendInfo = async function (
    id,
    lastSyncFriendId,
    userAccountId,
    userId,
) {
    const queries = [
        {
            query: INSERT_SYNC_TWITTER_FRIEND_INFO,
            params: [id, lastSyncFriendId, userAccountId, userId],
        },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const updateSyncTwitterFriendInfo = async function (
    id,
    lastSyncFriendId,
    userAccountId,
    userId,
) {
    const queries = [
        {
            query: UPDATE_SYNC_TWITTER_FRIEND_INFO,
            params: [lastSyncFriendId, id, userId, userAccountId],
        },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const selectSyncTwitterFriendInfo = async function (params) {
    return await cassandraCursor.execute(SELECT_SYNC_TWITTER_FRIEND_INFO, params, { prepare: true })
}

const insertTwitterFriendInfo = async function (
    userId,
    userAccountId,
    id,
    twitterId,
    twitterName,
) {
    const queries = [
        {
            query: INSERT_TWITTER_FRIEND,
            params: [userId, userAccountId, id, twitterId, twitterName],
        },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const insertSyncTwitterFollowerInfo = async function (
    id,
    lastSyncFollowerId,
    userAccountId,
    userId,
) {
    const queries = [
        {
            query: INSERT_SYNC_TWITTER_FOLLOWER_INFO,
            params: [id, lastSyncFollowerId, userAccountId, userId],
        },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const updateSyncTwitterFollowerInfo = async function (
    id,
    lastSyncFollowerId,
    userAccountId,
    userId,
) {
    const queries = [
        {
            query: UPDATE_SYNC_TWITTER_FOLLOWER_INFO,
            params: [lastSyncFollowerId, id, userId, userAccountId],
        },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const selectSyncTwitterFollowerInfo = async function (params) {
    return await cassandraCursor.execute(SELECT_SYNC_TWITTER_FOLLOWER_INFO, params, { prepare: true })
}

const insertTwitterDirectMessageInfo = async function (
    userId,
    userAccountId,
    id,
    createdTimestamp,
    message,
    messageId,
    recipientId,
    senderId,
    type,
) {
    const queries = [
        {
            query: INSERT_TWITTER_DIRECT_MESSAGE,
            params: [
                userId,
                userAccountId,
                id,
                createdTimestamp,
                message,
                messageId,
                recipientId,
                senderId,
                type,
            ],
        },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const insertTwitterFollowerInfo = async function (
    userId,
    userAccountId,
    id,
    twitterId,
    twitterName,
) {
    const queries = [
        {
            query: INSERT_TWITTER_FOLLOWER,
            params: [userId, userAccountId, id, twitterId, twitterName],
        },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const insertSyncTwitterDirectMessageInfo = async function (
    id,
    lastSyncMessageId,
    userAccountId,
    userId,
) {
    const queries = [
        {
            query: INSERT_SYNC_TWITTER_DIRECT_MESSAGE_INFO,
            params: [id, lastSyncMessageId, userAccountId, userId],
        },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const updateSyncTwitterDirectMessageInfo = async function (
    id,
    lastSyncMessageId,
    userAccountId,
    userId,
) {
    const queries = [
        {
            query: UPDATE_SYNC_TWITTER_DIRECT_MESSAGE_INFO,
            params: [lastSyncMessageId, id, userId, userAccountId],
        },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const selectSyncTwitterDirectMessageInfo = async function (params) {
    return await cassandraCursor.execute(SELECT_SYNC_TWITTER_DIRECT_MESSAGE_INFO, params, { prepare: true })
}

module.exports = {
    insertSyncTwitterFriendInfo,
    updateSyncTwitterFriendInfo,
    selectSyncTwitterFriendInfo,
    insertTwitterFriendInfo,
    insertSyncTwitterFollowerInfo,
    updateSyncTwitterFollowerInfo,
    selectSyncTwitterFollowerInfo,
    insertTwitterFollowerInfo,
    insertSyncTwitterDirectMessageInfo,
    updateSyncTwitterDirectMessageInfo,
    selectSyncTwitterDirectMessageInfo,
    insertTwitterDirectMessageInfo,
}
