const express = require('express')
const { createTopics, getTopics } = require('../controllers/topics')

const topicsRouter = new express.Router()

/**
 * @swagger
 * /v0/topics:
 *   post:
 *     summary: Create topic
 *     tags:
 *       - topics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: string
 *                   provider:
 *                     type: string
 *                     enum:
 *                       - gmail
 *                       - googlecalendar
 *                       - instagram
 *                       - linkedin
 *                       - microsoftcalendar
 *                       - outlook
 *                       - twitter
 *                       - zoom
 *                   id:
 *                     type: string
 *                   account_id:
 *                     type: string
 *                   created:
 *                     type: string
 *                   end_time:
 *                     type: string
 *                   kind:
 *                     type: string
 *                   speaker_id:
 *                     type: string
 *                   start_time:
 *                     type: string
 *                   topic:
 *                     type: string
 *                   type:
 *                     type: string
 *                   weight:
 *                     type: number
 *                 required:
 *                   - user_id
 *                   - provider
 *                   - id
 *                   - account_id
 *                   - kind
 *                   - speaker_id
 *                   - topic
 *                   - type
 *                   - weight
 *             required:
 *               - data
 *     responses:
 *       201:
 *         description: Topic created
 */
topicsRouter.route('/')
    .post(createTopics)

/**
 * @swagger
 * /v0/topics/{user_id}:
 *   get:
 *     summary: Get topics by user_id
 *     tags:
 *       - topics
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       200:
 *         description: Success
 */
topicsRouter.route('/:user_id')
    .get(getTopics)

module.exports = topicsRouter
