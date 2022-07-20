const express = require('express')

const { breakdown } = require('../controllers/analytics')

const analyticsRouter = new express.Router()

/**
 * @swagger
 * /v0/analytics/talkbreakdown:
 *   post:
 *     summary: Get talk breakdown between speakers for a timeframe
 *     tags:
 *       - analytics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               speakers:
 *                 type: array
 *               start:
 *                 type: string
 *               end:
 *                 type: string
 *             required:
 *               - speakers
 *               - start
 *               - end
 *     responses:
 *       200:
 *         description: Success
 */
analyticsRouter.route('/talkbreakdown')
    .post(breakdown)

module.exports = analyticsRouter
