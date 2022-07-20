const express = require('express')

const {
    dropRecording,
    getByRecordingId,
    getByStage,
    getByUser,
    getRecordings,
    setRecording,
} = require('../controllers/recordings')

const recordingsRouter = new express.Router()

/**
 * @swagger
 * /v0/recordings/users/{username}:
 *   get:
 *     summary: Get all recordings from given speaker
 *     tags:
 *       - recordings
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Speaker username
 *     responses:
 *       200:
 *         description: Success
 */
recordingsRouter.route('/users/:username')
    .get(getByUser)

/**
 * @swagger
 * /v0/recordings/{recording_id}:
 *   get:
 *     summary: Get recording with given id
 *     tags:
 *       - recordings
 *     parameters:
 *       - in: path
 *         name: recording_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Speaker username
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Delete recording with given id
 *     tags:
 *       - recordings
 *     parameters:
 *       - in: path
 *         name: recording_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Speaker username
 *     responses:
 *       200:
 *         description: Success
 */
recordingsRouter.route('/:recording_id')
    .get(getByRecordingId)
    .delete(dropRecording)

/**
 * @swagger
 * /v0/recordings/{recording_id}/stage:
 *   get:
 *     summary: Get all recordings by stage
 *     tags:
 *       - recordings
 *     parameters:
 *       - in: path
 *         name: recording_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recording id
 *     responses:
 *       200:
 *         description: Success
 */
recordingsRouter.route('/:recording_id/stage')
    .get(getByStage)

/**
 * @swagger
 * /v0/recordings/{username}/processed:
 *   put:
 *     summary: Set processed field of recordings by username
 *     tags:
 *       - recordings
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Speaker username
 *     responses:
 *       200:
 *         description: Success
 */
recordingsRouter.route('/:recording_id/processed')
    .put(setRecording)

/**
 * @swagger
 * /v0/recordings/recordings/{username}:
 *   get:
 *     summary: Get all recordings queued for processing by specific user
 *     tags:
 *       - queue
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Speaker username
 *     responses:
 *       200:
 *         description: Success
 */
recordingsRouter.route('/recordings/:username')
    .get(getRecordings)

module.exports = recordingsRouter
