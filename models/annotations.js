const { cassandraCursor, writeOptions } = require('../helpers/cassandra')

const INSERT_ANNOTATIONS = `INSERT INTO "annotations"
    (id, speaker_id, recording_id, user_id, processed_by, start_time, end_time, created)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

const INSERT_ANNOTATIONS_BY_RECORDING = `INSERT INTO "annotations_byRecordings"
    (id, speaker_id, recording_id, user_id, processed_by, start_time, end_time, created)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

const INSERT_ANNOTATIONS_BY_SPEAKER = `INSERT INTO "annotations_bySpeaker"
    (id, speaker_id, recording_id, user_id, processed_by, start_time, end_time, created)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

const INSERT_ANNOTATIONS_BY_PROCESSED = `INSERT INTO "annotations_byProcessed"
    (id, speaker_id, recording_id, user_id, processed_by, start_time, end_time, created)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

const SELECT_ANNOTATIONS = 'SELECT * FROM "annotations" WHERE id = ?'
const SELECT_ANNOTATIONS_BY_RECORDING = 'SELECT * FROM "annotations_byRecording" WHERE recording_id = ?'
const SELECT_ANNOTATIONS_BY_SPEAKER = 'SELECT * FROM "annotations_bySpeaker" WHERE speaker_id = ?'

const DELETE_ANNOTATIONS = 'DELETE FROM "annotations" WHERE id = ?'
const DELETE_ANNOTATIONS_BY_RECORDING = 'DELETE FROM "annotations_byRecording" WHERE recording_id = ? AND id = ?'
const DELETE_ANNOTATIONS_BY_SPEAKER = 'DELETE FROM "annotations_bySpeaker" WHERE speaker_id = ? AND id = ?'
const DELETE_ANNOTATIONS_BY_PROCESSED = 'DELETE FROM "annotations_byProcessed" WHERE processed_by = ? AND id = ?'

/* Insert annotations. */
const insertAnnotations = async function (annotate, newId) {
    const items = []

    for (const item of annotate) {
        const params = [
            newId,
            item.speaker_id,
            item.recording_id,
            item.user_id,
            'owner',
            new Date(item.start_time),
            new Date(item.end_time),
            new Date(),
        ]

        const queries = [
            { query: INSERT_ANNOTATIONS, params },
            { query: INSERT_ANNOTATIONS_BY_RECORDING, params },
            { query: INSERT_ANNOTATIONS_BY_SPEAKER, params },
            { query: INSERT_ANNOTATIONS_BY_PROCESSED, params },
        ]

        const response = await cassandraCursor.batch(queries, writeOptions)

        items.push(response)
    }

    return items
}

/* Select annotation by id. */
const selectAnnotations = async function (annotationId) {
    const params = [annotationId]
    return await cassandraCursor.execute(SELECT_ANNOTATIONS, params)
}

/* Select annotations by recording. */
const selectAnnotationsByRecording = async function (recordingId) {
    const params = [recordingId]
    return await cassandraCursor.execute(SELECT_ANNOTATIONS_BY_RECORDING, params)
}

/* Select annotations by speaker. */
const selectAnnotationsBySpeaker = async function (speakerId) {
    const params = [speakerId]
    return await cassandraCursor.execute(SELECT_ANNOTATIONS_BY_SPEAKER, params)
}

/* Delete annotations. */
const deleteAnnotations = async function (annotationId, recordingId, speakerId, processedBy) {
    const queries = [
        { query: DELETE_ANNOTATIONS, params: [annotationId] },
        { query: DELETE_ANNOTATIONS_BY_RECORDING, params: [recordingId] },
        { query: DELETE_ANNOTATIONS_BY_SPEAKER, params: [speakerId] },
        { query: DELETE_ANNOTATIONS_BY_PROCESSED, params: [processedBy] },
    ]

    return await cassandraCursor.batch(queries, writeOptions)
}

module.exports = {
    insertAnnotations,
    selectAnnotations,
    selectAnnotationsByRecording,
    selectAnnotationsBySpeaker,
    deleteAnnotations,
}
