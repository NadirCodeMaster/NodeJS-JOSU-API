const express = require('express')
const {
    createEmotions, getEmotions, getByTopic, getBySpeaker,
} = require('../controllers/emotion')

const emotionRouter = new express.Router()

/**
 * @swagger
 * /v0/emotion/speaker/{speaker_id}:
 *   get:
 *     summary: Get emotional analysis by speaker
 *     tags:
 *       - emotions
 *     parameters:
 *       - in: path
 *         name: speaker_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Speaker id
 *     responses:
 *       200:
 *         description: Success
 */
emotionRouter.route('/speaker/:speaker_id')
    .get(getBySpeaker)

/**
 * @swagger
 * /v0/emotion/topic/{topic_id}:
 *   get:
 *     summary: Get emotional analysis by topic
 *     tags:
 *       - emotions
 *     parameters:
 *       - in: path
 *         name: topic_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic id
 *     responses:
 *       200:
 *         description: Success
 */
emotionRouter.route('/topic/:topic_id')
    .get(getByTopic)

/**
 * @swagger
 * /v0/emotion/watson:
 *   post:
 *     summary: Get IMB Watson record
 *     tags:
 *       - emotions
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
 *                   document_tone_ids:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: string
 *                   document_tone_names:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: string
 *                   document_tone_scores:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: number
 *                   sentences_id:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: number
 *                   sentences:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: string
 *                   sentences_score:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: string
 *                   sentences_tone_id:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: string
 *                   sentences_tone_name:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: string
 *                   speaker_id:
 *                     type: string
 *                 required:
 *                   - user_id
 *                   - provider
 *                   - id
 *                   - account_id
 *                   - document_tone_ids
 *                   - document_tone_names
 *                   - document_tone_scores
 *                   - sentences_id
 *                   - sentences
 *                   - sentences_score
 *                   - sentences_tone_id
 *                   - sentences_tone_name
 *                   - speaker_id
 *             required:
 *               - data
 *     responses:
 *       201:
 *         description: Success
 */
emotionRouter.route('/watson')
    .post(createEmotions)

/**
 * @swagger
 * /v0/emotion/watson/{user_id}:
 *   get:
 *     summary: Get IBM Watson emotions by user_id
 *     tags:
 *       - emotions
 *     parameters:
 *       - in: path
 *         name: topic_id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       200:
 *         description: Success
 */
emotionRouter.route('/watson/:user_id')
    .get(getEmotions)

module.exports = emotionRouter
