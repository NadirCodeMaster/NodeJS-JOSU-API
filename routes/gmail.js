const express = require('express')

const {
    createEmail,
    getByAccount,
    setEmailsCategory,
    setEmailsEmotions,
    setEmailsEntities,
    setEmailsGroundTruth,
    setEmailsKeywords,
    setEmailsPerson,
    setEmailsTopics,
    setEmailsWordCount,
} = require('../controllers/gmail')

const gmailRouter = new express.Router()

/**
 * @swagger
 * /v0/gmail:
 *   post:
 *     summary: Create Gmail email
 *     tags:
 *       - gmail
 *     security:
 *       - UserIdCookie: []
 *         UserIdSecCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 $ref: "#/components/schemas/GmailEmail"
 *             required:
 *               - data
 *     responses:
 *       201:
 *         $ref: "#/components/responses/201_Created"
 */
gmailRouter.route('/')
    .post(createEmail)

/**
 * @swagger
 * /v0/gmail/category:
 *   put:
 *     summary: Set category of Gmail emails
 *     tags:
 *       - analytics
 *     security:
 *       - UserIdCookie: []
 *         UserIdSecCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Category"
 *             required:
 *               - data
 *     responses:
 *       204:
 *         $ref: "#/components/responses/204_No_Content"
 */
gmailRouter.route('/category')
    .put(setEmailsCategory)

/**
 * @swagger
 * /v0/gmail/emotions:
 *   put:
 *     summary: Set emotions of Gmail emails
 *     tags:
 *       - analytics
 *     security:
 *       - UserIdCookie: []
 *         UserIdSecCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Emotion"
 *             required:
 *               - data
 *     responses:
 *       204:
 *         $ref: "#/components/responses/204_No_Content"
 */
gmailRouter.route('/emotions')
    .put(setEmailsEmotions)

/**
 * @swagger
 * /v0/gmail/entities:
 *   put:
 *     summary: Set named entities of Gmail emails
 *     tags:
 *       - analytics
 *     security:
 *       - UserIdCookie: []
 *         UserIdSecCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Entity"
 *             required:
 *               - data
 *     responses:
 *       204:
 *         $ref: "#/components/responses/204_No_Content"
 */
gmailRouter.route('/entities')
    .put(setEmailsEntities)

/**
 * @swagger
 * /v0/gmail/groundtruth:
 *   put:
 *     summary: Set ground truth of Gmail emails
 *     tags:
 *       - analytics
 *     security:
 *       - UserIdCookie: []
 *         UserIdSecCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/GroundTruth"
 *             required:
 *               - data
 *     responses:
 *       204:
 *         $ref: "#/components/responses/204_No_Content"
 */
gmailRouter.route('/groundtruth')
    .put(setEmailsGroundTruth)

/**
 * @swagger
 * /v0/gmail/keywords:
 *   put:
 *     summary: Set keywords of Gmail emails
 *     tags:
 *       - analytics
 *     security:
 *       - UserIdCookie: []
 *         UserIdSecCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Keyword"
 *             required:
 *               - data
 *     responses:
 *       204:
 *         $ref: "#/components/responses/204_No_Content"
 */
gmailRouter.route('/keywords')
    .put(setEmailsKeywords)

/**
 * @swagger
 * /v0/gmail/person:
 *   put:
 *     summary: Set person category of Gmail emails
 *     tags:
 *       - analytics
 *     security:
 *       - UserIdCookie: []
 *         UserIdSecCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Person"
 *             required:
 *               - data
 *     responses:
 *       204:
 *         $ref: "#/components/responses/204_No_Content"
 */
gmailRouter.route('/person')
    .put(setEmailsPerson)

/**
 * @swagger
 * /v0/gmail/topics:
 *   put:
 *     summary: Set topics of Gmail emails
 *     tags:
 *       - analytics
 *     security:
 *       - UserIdCookie: []
 *         UserIdSecCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Topic"
 *             required:
 *               - data
 *     responses:
 *       204:
 *         $ref: "#/components/responses/204_No_Content"
 */
gmailRouter.route('/topics')
    .put(setEmailsTopics)

/**
 * @swagger
 * /v0/gmail/wordcount:
 *   put:
 *     summary: Set word count of Gmail emails
 *     tags:
 *       - analytics
 *     security:
 *       - UserIdCookie: []
 *         UserIdSecCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Wordcount"
 *             required:
 *               - data
 *     responses:
 *       204:
 *         $ref: "#/components/responses/204_No_Content"
 */
gmailRouter.route('/wordcount')
    .put(setEmailsWordCount)

/**
 * @swagger
 * /v0/gmail/account/{account_id}:
 *   get:
 *     summary: Get emails by Gmail account
 *     tags:
 *       - gmail
 *     security:
 *       - UserIdCookie: []
 *         UserIdSecCookie: []
 *     parameters:
 *       - in: path
 *         name: account_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Gmail account
 *     responses:
 *       200:
 *         description: Success
 */
gmailRouter.route('/account/:account_id')
    .get(getByAccount)

module.exports = gmailRouter
