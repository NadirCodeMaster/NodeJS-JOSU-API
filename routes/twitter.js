const express = require('express')

const {
    getSyncTwitterFriend,
    insertSyncTwitterFriend,
    getSyncTwitterFollower,
    insertSyncTwitterFollower,
    insertTwitterFriend,
    insertTwitterFollower,
    insertTwitterDirectMessage,
    getSyncDirectMessage,
    insertSyncDirectMessage,
} = require('../controllers/twitter')

const twitterRouter = new express.Router()

/**
 * @swagger
 * /v0/twitter/sync/friend/{user_id}/{user_account_id}:
 *   get:
 *     summary: Get Twitter Friend Sync Info
 *     tags:
 *       - twitter
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: |
 *           user id by kpr.ai
 *       - in: path
 *         name: user_account_id
 *         required: true
 *         schema:
 *           type: string
 *         description: kpr.ai user account id
 *     responses:
 *       200:
 *         description: Success
 */
twitterRouter.route('/sync/friend/:user_id/:user_account_id')
    .get(getSyncTwitterFriend)

/**
 * @swagger
 * /v0/twitter/sync/friend:
 *   post:
 *     summary: Insert/Update twitter sync friend
 *     tags:
 *       - twitter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               last_sync_friend_id:
 *                 type: string
 *               user_account_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *             required:
 *               - user_account_id
 *               - user_id
 *     responses:
 *       200:
 *         description: Success
 */
twitterRouter.route('/sync/friend')
    .post(insertSyncTwitterFriend)

/**
 * @swagger
 * /v0/twitter/sync/follower/{user_id}/{user_account_id}:
 *   get:
 *     summary: Get Twitter Follower Sync Info
 *     tags:
 *       - twitter
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: |
 *           user id by kpr.ai
 *       - in: path
 *         name: user_account_id
 *         required: true
 *         schema:
 *           type: string
 *         description: kpr.ai user account id
 *     responses:
 *       200:
 *         description: Success
 */
twitterRouter.route('/sync/follower/:user_id/:user_account_id')
    .get(getSyncTwitterFollower)

/**
 * @swagger
 * /v0/twitter/sync/follower:
 *   post:
 *     summary: Insert/Update twitter sync follower
 *     tags:
 *       - twitter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               last_sync_follower_id:
 *                 type: string
 *               user_account_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *             required:
 *               - user_account_id
 *               - user_id
 *     responses:
 *       200:
 *         description: Success
 */
twitterRouter.route('/sync/follower')
    .post(insertSyncTwitterFollower)

/**
 * @swagger
 * /v0/twitter/friend:
 *   post:
 *     summary: Insert twitter friend
 *     tags:
 *       - twitter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               twitter_id:
 *                 type: string
 *               twitter_name:
 *                 type: string
 *               user_account_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *             required:
 *               - twitter_id
 *               - twitter_name
 *               - user_account_id
 *               - user_id
 *     responses:
 *       200:
 *         description: Success
 */
twitterRouter.route('/friend')
    .post(insertTwitterFriend)

/**
 * @swagger
 * /v0/twitter/follower:
 *   post:
 *     summary: Insert twitter follower
 *     tags:
 *       - twitter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               twitter_id:
 *                 type: string
 *               twitter_name:
 *                 type: string
 *               user_account_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *             required:
 *               - twitter_id
 *               - twitter_name
 *               - user_account_id
 *               - user_id
 *     responses:
 *       200:
 *         description: Success
 */
twitterRouter.route('/follower')
    .post(insertTwitterFollower)

/**
 * @swagger
 * /v0/twitter/sync/direct_message/{user_id}/{user_account_id}:
 *   get:
 *     summary: Get Twitter Direct Message Sync Info
 *     tags:
 *       - twitter
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: |
 *           user id by kpr.ai
 *       - in: path
 *         name: user_account_id
 *         required: true
 *         schema:
 *           type: string
 *         description: kpr.ai user account id
 *     responses:
 *       200:
 *         description: Success
 */
twitterRouter.route('/sync/direct_message/:user_id/:user_account_id')
    .get(getSyncDirectMessage)

/**
 * @swagger
 * /v0/twitter/sync/direct_message:
 *   post:
 *     summary: Insert/Update twitter sync direct message
 *     tags:
 *       - twitter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               last_sync_direct_message_id:
 *                 type: string
 *               user_account_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *             required:
 *               - user_account_id
 *               - user_id
 *     responses:
 *       200:
 *         description: Success
 */
twitterRouter.route('/sync/direct_message')
    .post(insertSyncDirectMessage)

/**
 * @swagger
 * /v0/twitter/direct_message:
 *   post:
 *     summary: Insert twitter direct message
 *     tags:
 *       - twitter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               created_timestamp:
 *                 type: string
 *               message:
 *                 type: string
 *               message_id:
 *                  type: string
 *               recipient_id:
 *                  type: string
 *               sender_id:
 *                  type: string
 *               type:
 *                  type: string
 *               user_account_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *             required:
 *               - user_account_id
 *               - user_id
 *     responses:
 *       200:
 *         description: Success
 */
twitterRouter.route('/direct_message')
    .post(insertTwitterDirectMessage)

module.exports = twitterRouter
