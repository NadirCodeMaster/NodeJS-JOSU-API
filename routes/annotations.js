const express = require('express')

const {
    createAnnotations, dropAnnotation, getAnnotations, getByRecording, getBySpeaker,
} = require('../controllers/annotations')

const annotationsRouter = new express.Router()

/**
 * @swagger
 * /v0/annotations/speaker/{speakerId}:
 *   get:
 *     summary: Get all annotations for given speaker
 *     tags:
 *       - speaker
 *     parameters:
 *       - in: path
 *         name: speakerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Speaker id
 *     responses:
 *       200:
 *         description: Success
 */
annotationsRouter.route('/speaker/:speakerId')
    .get(getBySpeaker)

/**
 * @swagger
 * /v0/annotations/recording/{recordingId}:
 *   get:
 *     summary: Get all annotations for given recording
 *     tags:
 *       - recording
 *     parameters:
 *       - in: path
 *         name: recordingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Recording id
 *     responses:
 *       200:
 *         description: Success
 */
annotationsRouter.route('/recording/:recordingId')
    .get(getByRecording)

/**
 * @swagger
 * /v0/annotations/{annotationId}:
 *   get:
 *     summary: Get annotation by annotation id
 *     tags:
 *       - annotations
 *     parameters:
 *       - in: path
 *         name: annotationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Annotation id
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Delete annotation by annotation id
 *     tags:
 *       - annotations
 *     parameters:
 *       - in: path
 *         name: annotationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Annotation id
 *     responses:
 *       204:
 *         description: Success
 */
annotationsRouter.route('/:annotation_id')
    .get(getAnnotations)
    .delete(dropAnnotation)

/**
 * @swagger
 * /v0/annotations:
 *   post:
 *     summary: Create new annotation
 *     tags:
 *       - annotations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               annotate:
 *                 type: string
 *             required:
 *               - annotate
 *     responses:
 *       201:
 *         description: Success
 */
annotationsRouter.route('/')
    .post(createAnnotations)

module.exports = annotationsRouter
