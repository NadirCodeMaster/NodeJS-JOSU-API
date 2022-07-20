const uuid = require('uuid')

const {
    insertSyncTwitterFriendInfo,
    updateSyncTwitterFriendInfo,
    selectSyncTwitterFriendInfo,
    insertTwitterFriendInfo,
    insertSyncTwitterFollowerInfo,
    updateSyncTwitterFollowerInfo,
    selectSyncTwitterFollowerInfo,
    insertTwitterFollowerInfo,
    selectSyncTwitterDirectMessageInfo,
    updateSyncTwitterDirectMessageInfo,
    insertSyncTwitterDirectMessageInfo,
    insertTwitterDirectMessageInfo,
} = require('../models/twitter')

const getSyncTwitterFriend = async function (req, res) {
    const account = await selectSyncTwitterFriendInfo(req.params)
    const { rows } = account
    const result = rows.length ? rows[0] : null
    res.json({ data: result })
}

const insertSyncTwitterFriend = async function (req, res) {
    const {
        last_sync_friend_id: lastSyncFriendId,
        user_account_id: userAccountId,
        user_id: userId,
    } = req.body

    const account = await selectSyncTwitterFriendInfo({
        user_id: userId,
        user_account_id: userAccountId,
    })
    const { rows } = account
    if (rows.length) {
        const info = rows[0]
        updateSyncTwitterFriendInfo(
            info.id,
            lastSyncFriendId,
            userAccountId,
            userId,
        )
    } else {
        const id = uuid.v4()
        insertSyncTwitterFriendInfo(id, lastSyncFriendId, userAccountId, userId)
    }
    res.json({ data: req.body })
}

const insertTwitterFriend = async function (req, res) {
    const {
        twitter_id: twitterId,
        twitter_name: twitterName,
        user_account_id: userAccountId,
        user_id: userId,
    } = req.body

    const id = uuid.v4()
    insertTwitterFriendInfo(userId, userAccountId, id, twitterId, twitterName)
    res.json({ data: req.body })
}

const getSyncTwitterFollower = async function (req, res) {
    const account = await selectSyncTwitterFollowerInfo(req.params)
    const { rows } = account
    const result = rows.length ? rows[0] : null
    res.json({ data: result })
}

const insertSyncTwitterFollower = async function (req, res) {
    const {
        last_sync_follower_id: lastSyncFollowerId,
        user_account_id: userAccountId,
        user_id: userId,
    } = req.body

    const account = await selectSyncTwitterFollowerInfo({
        user_id: userId,
        user_account_id: userAccountId,
    })
    const { rows } = account
    if (rows.length) {
        const info = rows[0]
        updateSyncTwitterFollowerInfo(
            info.id,
            lastSyncFollowerId,
            userAccountId,
            userId,
        )
    } else {
        const id = uuid.v4()
        insertSyncTwitterFollowerInfo(id, lastSyncFollowerId, userAccountId, userId)
    }
    res.json({ data: req.body })
}

const insertTwitterFollower = async function (req, res) {
    const {
        twitter_id: twitterId,
        twitter_name: twitterName,
        user_account_id: userAccountId,
        user_id: userId,
    } = req.body

    const id = uuid.v4()
    insertTwitterFollowerInfo(userId, userAccountId, id, twitterId, twitterName)
    res.json({ data: req.body })
}

const getSyncDirectMessage = async function (req, res) {
    const account = await selectSyncTwitterDirectMessageInfo(req.params)
    const { rows } = account
    const result = rows.length ? rows[0] : null
    res.json({ data: result })
}

const insertSyncDirectMessage = async function (req, res) {
    const {
        last_sync_direct_message_id: lastSyncMessageId,
        user_account_id: userAccountId,
        user_id: userId,
    } = req.body

    const account = await selectSyncTwitterDirectMessageInfo({
        user_id: userId,
        user_account_id: userAccountId,
    })
    const { rows } = account
    if (rows.length) {
        const info = rows[0]
        updateSyncTwitterDirectMessageInfo(
            info.id,
            lastSyncMessageId,
            userAccountId,
            userId,
        )
    } else {
        const id = uuid.v4()
        insertSyncTwitterDirectMessageInfo(id, lastSyncMessageId, userAccountId, userId)
    }
    res.json({ data: req.body })
}

const insertTwitterDirectMessage = async function (req, res) {
    const {
        user_account_id: userAccountId,
        user_id: userId,
        created_timestamp: createdTimestamp,
        message,
        message_id: messageId,
        recipient_id: recipientId,
        sender_id: senderId,
        type,
    } = req.body

    const id = uuid.v4()
    insertTwitterDirectMessageInfo(
        userId,
        userAccountId,
        id,
        createdTimestamp,
        message,
        messageId,
        recipientId,
        senderId,
        type,
    )
    res.json({ data: req.body })
}

module.exports = {
    getSyncTwitterFriend,
    insertSyncTwitterFriend,
    insertTwitterFriend,
    getSyncTwitterFollower,
    insertSyncTwitterFollower,
    insertTwitterFollower,
    getSyncDirectMessage,
    insertSyncDirectMessage,
    insertTwitterDirectMessage,
}
