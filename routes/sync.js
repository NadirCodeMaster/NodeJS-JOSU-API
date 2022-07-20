const express = require('express')

const {
    getCreds,
    getCredsByUser,
    removeUserAccount,
    setAccount,
    setAccountStatus,
    setSocialLastSynced,
} = require('../controllers/sync')

const syncRouter = new express.Router()

/**
 * @swagger
 * /v0/sync/{provider}:
 *   get:
 *     summary: Get all accounts for given *provider*
 *     tags:
 *       - accounts
 *     parameters:
 *       - in: path
 *         name: provider
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - gmail
 *             - googlecalendar
 *             - instagram
 *             - linkedin
 *             - microsoftcalendar
 *             - outlook
 *             - slack
 *             - twitter
 *             - zoom
 *         description: |
 *           Provider of data where speaker was identified
 *           by kpr.ai
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Accounts"
 */
syncRouter.route('/:provider')
    .get(getCreds)

/**
 * @swagger
 * /v0/sync/social/active:
 *   put:
 *     summary: Set is_active status of social account
 *     tags:
 *       - social
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account:
 *                 type: object
 *               status:
 *                 type: boolean
 *             required:
 *               - account
 *               - status
 *     responses:
 *       200:
 *         description: Success
 */
syncRouter.route('/social/active')
    .put(setAccountStatus)

/**
 * @swagger
 * /v0/sync/social/remove:
 *   post:
 *     summary: Remove social account
 *     tags:
 *       - social
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account:
 *                 type: object
 *             required:
 *               - account
 *     responses:
 *       200:
 *         description: Success
 */
syncRouter.route('/social/remove')
    .post(removeUserAccount) // TODO delete

/**
 * @swagger
 * /v0/sync/social/synced:
 *   put:
 *     summary: Update timestamp of last sync for Social account
 *     tags:
 *       - social
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               userId:
 *                 type: string
 *               lastSync:
 *                 type: string
 *               provider:
 *                 type: string
 *             required:
 *               - id
 *               - userId
 *               - lastSync
 *               - provider
 *     responses:
 *       200:
 *         description: Success
 */
syncRouter.route('/social/synced')
    .put(setSocialLastSynced)

/**
 * @swagger
 * /v0/sync/{provider}/{user_id}:
 *   get:
 *     summary: Get all *provider* accounts associated with user *user_id*
 *     tags:
 *       - accounts
 *     parameters:
 *       - in: path
 *         name: provider
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - gmail
 *             - googlecalendar
 *             - instagram
 *             - linkedin
 *             - microsoftcalendar
 *             - outlook
 *             - slack
 *             - twitter
 *             - zoom
 *         description: Data provider
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: kpr.ai user id
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *   put:
 *     summary: Update user account
 *     tags:
 *       - accounts
 *     parameters:
 *       - in: path
 *         name: provider
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - gmail
 *             - googlecalendar
 *             - instagram
 *             - linkedin
 *             - microsoftcalendar
 *             - outlook
 *             - slack
 *             - twitter
 *             - zoom
 *         description: Account provider
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: kpr.ai user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 $ref: "#/components/schemas/Account"
 *             required:
 *               - data
 *     responses:
 *       200:
 *         description: Success
 */
syncRouter.route('/:provider/:user_id')
    .get(getCredsByUser)
    .put(setAccount)


module.exports = syncRouter
