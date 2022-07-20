const uuid = require('uuid')

const {
    insertAnnotations, selectAnnotations, selectAnnotationsBySpeaker,
    selectAnnotationsByRecording, deleteAnnotations,
} = require('../models/annotations')

/* Create annotation. */
const createAnnotations = async function (req, res) {
    const newId = uuid.v4()
    const { annotate } = req.body
    await insertAnnotations(annotate, newId)
    // TODO implement
    throw Error('Not Implemented')
}

/* Delete annotation. */
const dropAnnotation = async function (req, res) {
    const { annotationId } = req.body

    const annotation = await selectAnnotations(annotationId)
    const {
        recording_id: recordingId, speaker_id: speakerId, processed_by: processedBy,
    } = annotation

    await deleteAnnotations(annotationId, recordingId, speakerId, processedBy)
    // TODO implement
    throw Error('Not Implemented')
}

/* Get annotations. */
const getAnnotations = async function (req, res) {
    const { annotationId } = req.body
    await selectAnnotations(annotationId)
    // TODO implement
    throw Error('Not Implemented')
}

/* Get annotations by recording. */
const getByRecording = async function (req, res) {
    const { recordingId } = req.body
    await selectAnnotationsByRecording(recordingId)
    // TODO implement
    throw Error('Not Implemented')
}

/* Get annotations by speaker. */
const getBySpeaker = async function (req, res) {
    const { speakerId } = req.body
    await selectAnnotationsBySpeaker(speakerId)
    // TODO implement
    throw Error('Not Implemented')
}

module.exports = { createAnnotations, dropAnnotation, getAnnotations, getByRecording, getBySpeaker }
