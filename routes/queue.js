const express = require('express')
const {
    createEmailsQueue,
    createEmotionsQueue,
    createTopicsQueue,
    dropEmailsQueue,
    dropEmotionsQueue,
    dropTopicsQueue,
    getEmailsQueue,
    getEmotionsQueue,
    getTopicsQueue,
} = require('../controllers/queue')

const queueRouter = new express.Router()

/**
 * @swagger
 * /v0/queue/emails:
 *   post:
 *     summary: Create entries in emails queue
 *     tags:
 *       - emails
 *     security:
 *       - Basic: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/Queue"
 *     responses:
 *       201:
 *         $ref: "#/components/responses/201_Created"
 *   get:
 *     summary: Get entries from emails queue
 *     tags:
 *       - emails
 *     security:
 *       - Basic: []
 *     parameters:
 *       - $ref: "#/components/parameters/FetchSize"
 *       - $ref: "#/components/parameters/PageState"
 *     responses:
 *       200:
 *         $ref: "#/components/responses/200_OK_Queue"
 *   delete:
 *     summary: Delete entries from emails queue
 *     tags:
 *       - emails
 *     security:
 *       - Basic: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/Queue"
 *     responses:
 *       204:
 *         $ref: "#/components/responses/204_No_Content"
 */
queueRouter.route('/emails')
    .post(createEmailsQueue)
    .get(getEmailsQueue)
    .delete(dropEmailsQueue)

/**
 * @swagger
 * /v0/queue/emotions:
 *   post:
 *     summary: Create entries in emotions queue
 *     tags:
 *       - emotions
 *     security:
 *       - Basic: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/Queue"
 *     responses:
 *       201:
 *         $ref: "#/components/responses/201_Created"
 *   get:
 *     summary: Get entries from emotions queue
 *     tags:
 *       - emotions
 *     security:
 *       - Basic: []
 *     parameters:
 *       - $ref: "#/components/parameters/FetchSize"
 *       - $ref: "#/components/parameters/PageState"
 *     responses:
 *       200:
 *         $ref: "#/components/responses/200_OK_Queue"
 *   delete:
 *     summary: Delete entries from emotions queue
 *     tags:
 *       - emotions
 *     security:
 *       - Basic: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/Queue"
 *     responses:
 *       204:
 *         $ref: "#/components/responses/204_No_Content"
 */
queueRouter.route('/emotions')
    .post(createEmotionsQueue)
    .get(getEmotionsQueue)
    .delete(dropEmotionsQueue)

/**
 * @swagger
 * /v0/queue/topics:
 *   post:
 *     summary: Create entries in topics queue
 *     tags:
 *       - topics
 *     security:
 *       - Basic: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/Queue"
 *     responses:
 *       201:
 *         $ref: "#/components/responses/201_Created"
 *   get:
 *     summary: Get entries from topics queue
 *     tags:
 *       - topics
 *     security:
 *       - Basic: []
 *     parameters:
 *       - $ref: "#/components/parameters/FetchSize"
 *       - $ref: "#/components/parameters/PageState"
 *     responses:
 *       200:
 *         $ref: "#/components/responses/200_OK_Queue"
 *   delete:
 *     summary: Delete entries from topics queue
 *     tags:
 *       - topics
 *     security:
 *       - Basic: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/Queue"
 *     responses:
 *       204:
 *         $ref: "#/components/responses/204_No_Content"
 */
queueRouter.route('/topics')
    .post(createTopicsQueue)
    .get(getTopicsQueue)
    .delete(dropTopicsQueue)

module.exports = queueRouter
