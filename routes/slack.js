const express = require('express')

const {
    createChannel,
    createMessage,
    createWorkspace,
    dequeueMessages,
    enqueueMessage,
    getChannels,
    getSubscribedChannels,
    getSubscribedWorkspaces,
    getWorkspaces,
    setChannelSubscription,
    setWorkspaceSubscription,
} = require('../controllers/slack')

const slackRouter = new express.Router()

/**
 * @swagger
 * /v0/slack/channels:
 *   get:
 *     summary: Get all registred Slack channels
 *     tags:
 *       - channels
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create new Slack channel
 *     tags:
 *       - channels
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               user_id:
 *                 type: string
 *               created:
 *                 type: string
 *               creator:
 *                 type: string
 *               is_channel:
 *                 type: boolean
 *               is_group:
 *                 type: boolean
 *               is_im:
 *                 type: boolean
 *               is_private:
 *                 type: boolean
 *               name:
 *                 type: string
 *               previous_names:
 *                 type: array
 *                 items:
 *                   type: string
 *               topic:
 *                 type: string
 *               workspace:
 *                 type: string
 *             required:
 *               - id
 *               - user_id
 *               - created
 *               - is_im
 *               - workspace
 *     responses:
 *       200:
 *         description: Success
 */
slackRouter.route('/channels')
    .get(getChannels)
    .post(createChannel)

/**
 * @swagger
 * /v0/slack/channels/subscribed:
 *   get:
 *     summary: Get all Slack channels which are subscribed to
 *     tags:
 *       - channels
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update channel subscription status
 *     tags:
 *       - slack/channels
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               user_id:
 *                 type: string
 *             required:
 *               - id
 *               - user_id
 *     responses:
 *       200:
 *         description: Success
 */
slackRouter.route('/channels/subscribed')
    .get(getSubscribedChannels)
    .put(setChannelSubscription)

/**
 * @swagger
 * /v0/slack/messages:
 *   post:
 *     summary: Create new Slack message
 *     tags:
 *       - messages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               author:
 *                 type: string
 *               channel:
 *                 type: string
 *               created:
 *                 type: string
 *               is_edited:
 *                 type: boolean
 *               latest_reply:
 *                 type: string
 *               reactions:
 *                 type: array
 *                 items:
 *                   type: string
 *               reply_count:
 *                 type: number
 *               reply_users:
 *                 type: array
 *                 items:
 *                   type: string
 *               reply_users_count:
 *                 type: number
 *               speaker_id:
 *                 type: string
 *               text:
 *                 type: string
 *               type:
 *                 type: string
 *               word_count:
 *                 type: number
 *               workspace:
 *                 type: string
 *             required:
 *               - id
 *               - author
 *               - channel
 *               - created
 *               - speaker_id
 *               - text
 *               - type
 *               - word_count
 *               - workspace
 *     responses:
 *       200:
 *         description: Success
 */
slackRouter.route('/messages')
    .post(createMessage)

/**
 * @swagger
 * /v0/slack/queue:
 *   post:
 *     summary: Enqueue Slack messages for further processing
 *     tags:
 *       - queue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               text:
 *                 type: string
 *             required:
 *               - id
 *               - text
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Dequeue processed Slack messages
 *     tags:
 *       - queue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *               required:
 *                 - id
 *     responses:
 *       200:
 *         description: Success
 */
slackRouter.route('/queue')
    .post(enqueueMessage)
    .delete(dequeueMessages)

/**
 * @swagger
 * /v0/slack/workspaces:
 *   get:
 *     summary: Get all registred Slack workspaces
 *     tags:
 *       - workspaces
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create new Slack workspace
 *     tags:
 *       - workspaces
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               user_id:
 *                 type: string
 *               domain:
 *                 type: string
 *               email_domain:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - id
 *               - user_id
 *               - domain
 *               - email_domain
 *               - name
 *     responses:
 *       200:
 *         description: Success
 */
slackRouter.route('/workspaces')
    .get(getWorkspaces)
    .post(createWorkspace)

/**
 * @swagger
 * /v0/slack/workspaces/subscribed:
 *   get:
 *     summary: Get all Slack workspaces which are subscribed to
 *     tags:
 *       - workspaces
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update workspace subscription status
 *     tags:
 *       - workspaces
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               is_subscribed:
 *                 type: string
 *               user_id:
 *                 type: string
 *             required:
 *               - id
 *               - is_subscribed
 *               - user_id
 *     responses:
 *       200:
 *         description: Success
 */
slackRouter.route('/workspaces/subscribed')
    .get(getSubscribedWorkspaces)
    .put(setWorkspaceSubscription)

module.exports = slackRouter
