const express = require('express')

const {
    createEmail,
    getEmailsByAccountId,
    setEmailsCategory,
    setEmailsEmotions,
    setEmailsEntities,
    setEmailsGroundTruth,
    setEmailsKeywords,
    setEmailsPerson,
    setEmailsTopics,
    setEmailsWordCount,
} = require('../controllers/outlook')

const outlookRouter = new express.Router()

/**
 * @swagger
 * /v0/outlook:
 *   post:
 *     summary: Create Outlook email
 *     tags:
 *       - outlook
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
 *                   id:
 *                     type: string
 *                   user_id:
 *                     type: string
 *                   account_id:
 *                     type: string
 *                   bcc_recipients:
 *                     type: array
 *                     items:
 *                       type: string
 *                   category:
 *                     type: array
 *                     items:
 *                       type: string
 *                   category_ground_truth:
 *                     type: string
 *                   cc_recipients:
 *                     type: array
 *                   change_key:
 *                     type: string
 *                   confidence_category:
 *                     type: array
 *                     items:
 *                       type: number
 *                   confidence_is_person:
 *                     type: number
 *                   conversation_id:
 *                     type: string
 *                   conversation_index:
 *                     type: string
 *                   created_datetime:
 *                     type: string
 *                   date_received:
 *                     type: string
 *                   email_content:
 *                     type: string
 *                   email_from:
 *                     type: string
 *                   email_subject:
 *                     type: string
 *                   email_to:
 *                     type: array
 *                     items:
 *                       type: string
 *                   emotions:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: string
 *                   emotions_endpos:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: number
 *                   emotions_mean:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: string
 *                   emotions_mean_weight:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: number
 *                   emotions_startpos:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: number
 *                   emotions_weight:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: number
 *                   flag_status:
 *                     type: string
 *                   has_attachments:
 *                     type: boolean
 *                   importance:
 *                     type: string
 *                   inference_classification:
 *                     type: string
 *                   internet_message_id:
 *                     type: string
 *                   is_delivery_receipt_requested:
 *                     type: boolean
 *                   is_draft:
 *                     type: boolean
 *                   is_person:
 *                     type: boolean
 *                   is_read:
 *                     type: boolean
 *                   is_read_receipt_requested:
 *                     type: boolean
 *                   is_solitary_recipient:
 *                     type: boolean
 *                   keywords:
 *                     type: array
 *                     items:
 *                       type: string
 *                   keywords_endpos:
 *                     type: array
 *                     items:
 *                       type: string
 *                   keywords_startpos:
 *                     type: array
 *                     items:
 *                       type: string
 *                   keywords_weight:
 *                     type: array
 *                     items:
 *                       type: number
 *                   labels:
 *                     type: array
 *                     items:
 *                       type: string
 *                   last_modified_datetime:
 *                     type: string
 *                   location:
 *                     type: string
 *                   named_entities:
 *                     type: array
 *                     items:
 *                       type: string
 *                   named_entities_endpos:
 *                     type: array
 *                     items:
 *                       type: string
 *                   named_entities_startpos:
 *                     type: array
 *                     items:
 *                       type: string
 *                   named_entities_type:
 *                     type: array
 *                     items:
 *                       type: string
 *                   named_entities_weight:
 *                     type: array
 *                     items:
 *                       type: number
 *                   parent_folder_id:
 *                     type: string
 *                   reply_to:
 *                     type: array
 *                     items:
 *                       type: string
 *                   sender_name:
 *                     type: string
 *                   sender_address:
 *                     type: string
 *                   sent_datetime:
 *                     type: string
 *                   speaker_id:
 *                     type: string
 *                   web_link:
 *                     type: string
 *                   word_count:
 *                     type: number
 *                 required:
 *                   - id
 *                   - user_id
 *                   - account_id
 *                   - bcc_recipients
 *                   - cc_recipients
 *                   - change_key
 *                   - conversation_id
 *                   - conversation_index
 *                   - created_datetime
 *                   - date_received
 *                   - email_content
 *                   - email_from
 *                   - email_subject
 *                   - email_to
 *                   - flag_status
 *                   - has_attachments
 *                   - importance
 *                   - inference_classification
 *                   - internet_message_id
 *                   - is_delivery_receipt_requested
 *                   - is_draft
 *                   - is_read
 *                   - is_read_receipt_requested
 *                   - is_solitary_recipient
 *                   - labels
 *                   - last_modified_datetime
 *                   - parent_folder_id
 *                   - reply_to
 *                   - sender_name
 *                   - sender_address
 *                   - sent_datetime
 *                   - speaker_id
 *                   - web_link
 *     responses:
 *       201:
 *         description: Success
 */
outlookRouter.route('/')
    .post(createEmail)

/**
 * @swagger
 * /v0/outlook/category:
 *   put:
 *     summary: Set category of Outlook emails
 *     tags:
 *       - analytics
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     account_id:
 *                       type: string
 *                     category:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: string
 *                     confidence_category:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: number
 *                   required:
 *                     - id
 *                     - user_id
 *                     - account_id
 *                     - category
 *                     - confidence_category
 *             required:
 *               - data
 *     responses:
 *       204:
 *         description: Success
 */
outlookRouter.route('/category')
    .put(setEmailsCategory)

/**
 * @swagger
 * /v0/outlook/emotions:
 *   put:
 *     summary: Set emotions of Outlook emails
 *     tags:
 *       - analytics
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     account_id:
 *                       type: string
 *                     emotions:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: string
 *                     emotions_endpos:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: number
 *                     emotions_mean:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: string
 *                     emotions_mean_weight:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: number
 *                     emotions_startpos:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: number
 *                     emotions_weight:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: number
 *                   required:
 *                     - id
 *                     - user_id
 *                     - account_id
 *                     - emotions
 *                     - emotions_mean
 *                     - emotions_mean_weight
 *                     - emotions_startpos
 *                     - emotions_weight
 *             required:
 *               - data
 *     responses:
 *       204:
 *         description: Success
 */
outlookRouter.route('/emotions')
    .put(setEmailsEmotions)

/**
 * @swagger
 * /v0/outlook/entities:
 *   put:
 *     summary: Set named entities of Outlook emails
 *     tags:
 *       - analytics
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     account_id:
 *                       type: string
 *                     named_entities:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: string
 *                     named_entities_endpos:
 *                       type: array
 *                       items:
 *                         type: string
 *                     named_entities_startpos:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: string
 *                     named_entities_type:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: string
 *                     named_entities_weight:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: number
 *                   required:
 *                     - id
 *                     - user_id
 *                     - account_id
 *                     - named_entities
 *                     - named_entities_endpos
 *                     - named_entities_startpos
 *                     - named_entities_type
 *                     - named_entities_weight
 *             required:
 *               - data
 *     responses:
 *       204:
 *         description: Success
 */
outlookRouter.route('/entities')
    .put(setEmailsEntities)

/**
 * @swagger
 * /v0/outlook/groundtruth:
 *   put:
 *     summary: Set ground truth of Outlook emails
 *     tags:
 *       - analytics
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     account_id:
 *                       type: string
 *                     category_ground_truth:
 *                       type: string
 *                       nullable: true
 *                   required:
 *                     - id
 *                     - user_id
 *                     - account_id
 *                     - category_ground_truth
 *             required:
 *               - data
 *     responses:
 *       204:
 *         description: Success
 */
outlookRouter.route('/groundtruth')
    .put(setEmailsGroundTruth)

/**
 * @swagger
 * /v0/outlook/keywords:
 *   put:
 *     summary: Set keywords of Outlook emails
 *     tags:
 *       - analytics
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     account_id:
 *                       type: string
 *                     keywords:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: string
 *                     keywords_endpos:
 *                       type: array
 *                       items:
 *                         type: string
 *                     keywords_startpos:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: string
 *                     keywords_weight:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: number
 *                   required:
 *                     - id
 *                     - user_id
 *                     - account_id
 *                     - keywords
 *                     - keywords_endpos
 *                     - keywords_startpos
 *                     - keywords_weight
 *             required:
 *               - data
 *     responses:
 *       204:
 *         description: Success
 */
outlookRouter.route('/keywords')
    .put(setEmailsKeywords)

/**
 * @swagger
 * /v0/outlook/person:
 *   put:
 *     summary: Set person category of Outlook emails
 *     tags:
 *       - analytics
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     account_id:
 *                       type: string
 *                     confidence_is_person:
 *                       type: number
 *                       nullable: true
 *                     is_person:
 *                       type: boolean
 *                       nullable: true
 *                   required:
 *                     - id
 *                     - user_id
 *                     - account_id
 *                     - confidence_is_person
 *                     - is_person
 *             required:
 *               - data
 *     responses:
 *       204:
 *         description: Success
 */
outlookRouter.route('/person')
    .put(setEmailsPerson)

/**
 * @swagger
 * /v0/outlook/topics:
 *   put:
 *     summary: Set topics of Outlook emails
 *     tags:
 *       - analytics
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     account_id:
 *                       type: string
 *                     topics:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: string
 *                     topics_weight:
 *                       type: array
 *                       nullable: true
 *                       items:
 *                         type: number
 *                   required:
 *                     - id
 *                     - user_id
 *                     - account_id
 *                     - topics
 *                     - topics_weight
 *             required:
 *               - data
 *     responses:
 *       204:
 *         description: Success
 */
outlookRouter.route('/topics')
    .put(setEmailsTopics)

/**
 * @swagger
 * /v0/outlook/wordcount:
 *   put:
 *     summary: Set word count of Outlook emails
 *     tags:
 *       - analytics
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     account_id:
 *                       type: string
 *                     word_count:
 *                       type: number
 *                   required:
 *                     - id
 *                     - user_id
 *                     - account_id
 *                     - word_count
 *             required:
 *               - data
 *     responses:
 *       204:
 *         description: Success
 */
outlookRouter.route('/wordcount')
    .put(setEmailsWordCount)

/**
 * @swagger
 * /v0/outlook/account/{account_id}:
 *   get:
 *     summary: Get emails by Outlook account
 *     tags:
 *       - outlook
 *     parameters:
 *       - in: path
 *         name: account_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Outlook account
 *     responses:
 *       200:
 *         description: Success
 */
outlookRouter.route('/account/:account_id')
    .get(getEmailsByAccountId)

module.exports = outlookRouter
