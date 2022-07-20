const {
    insertChannel, selectChannels, selectChannelsBySubscribed, updateChannelSubscription,
} = require('../models/slackChannels')
const {
    insertWorkspace, selectWorkspaces, selectWorkspacesBySubscribed, updateWorkspaceSubscription,
} = require('../models/slackWorkspaces')
const { selectUserAccounts } = require('../models/userAccounts')
const { dateOr } = require('../helpers/validators')

const { insertMessage } = require('../models/slackMessages')
const { insertQueue, deleteQueue } = require('../models/slackQueue')

const createChannel = async function (req, res) {
    const userAccounts = await selectUserAccounts({ provider: 'slack' })
    const account = userAccounts.rows.find(
        account => JSON.parse(account.account_nickname).user_id === req.body.user_id,
    )

    if (!account) {
        return res.status(404).json({})
    }

    const data = {
        creator: null,
        is_channel: null,
        is_group: null,
        is_private: null,
        name: null,
        previous_names: null,
        topic: null,
        ...req.body,
        is_subscribed: true,
        user_id: account?.user_id,
    }
    await insertChannel(data)
    res.status(201).json({ data })
}

const createMessage = async function (req, res) {
    const data = {
        is_edited: null,
        latest_reply: null,
        reactions: null,
        reply_count: null,
        reply_users: null,
        reply_users_count: null,
        ...req.body,
        created: dateOr(req.body.created),
        edited: dateOr(req.body.edited),
    }
    await insertMessage(data)
    res.status(201).json({ data })
}

const createWorkspace = async function (req, res) {
    const userAccounts = await selectUserAccounts({ provider: 'slack' })
    const account = userAccounts.rows.find(
        account => JSON.parse(account.account_nickname).user_id === req.body.user_id,
    )

    if (!account) {
        return res.status(404).json({})
    }

    const data = {
        ...req.body,
        created: new Date(),
        email_domain: req.body.email_domain.split(','),
        is_subscribed: true,
        user_id: account.user_id,
    }
    await insertWorkspace(data)
    res.status(201).json({ data })
}

const dequeueMessages = async function (req, res) {
    const messages = req.body
    await Promise.all(messages.map(x => deleteQueue(x)))
    res.sendStatus(204)
}

const enqueueMessage = async function (req, res) {
    const data = req.body
    await insertQueue(data)
    res.status(201).json({ data })
}

const getChannels = async function (req, res) {
    const channels = await selectChannels()
    res.json({ data: channels.rows })
}

const getSubscribedChannels = async function (req, res) {
    const channels = await selectChannelsBySubscribed()
    res.json({ data: channels.rows })
}

const getWorkspaces = async function (req, res) {
    const workspaces = await selectWorkspaces()
    res.json({ data: workspaces.rows })
}

const getSubscribedWorkspaces = async function (req, res) {
    const workspaces = await selectWorkspacesBySubscribed()
    res.json({ data: workspaces.rows })
}

const setChannelSubscription = async function (req, res) {
    const userAccounts = await selectUserAccounts({ provider: 'slack' })
    const account = userAccounts.rows.find(
        account => JSON.parse(account.account_nickname).user_id === req.body.user_id,
    )

    if (!account) {
        return res.status(404).json({})
    }

    await updateChannelSubscription({
        ...req.body,
        is_subscribed: false,
        user_id: account?.user_id,
    })
    res.status(201).json({ data: null })
}

const setWorkspaceSubscription = async function (req, res) {
    await updateWorkspaceSubscription({ ...req.body })
    res.status(201).json({ data: req.body })
}

module.exports = {
    createChannel, createMessage, createWorkspace, dequeueMessages,
    enqueueMessage, getChannels, getSubscribedChannels, getSubscribedWorkspaces, getWorkspaces,
    setChannelSubscription, setWorkspaceSubscription,
}
