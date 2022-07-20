const { readAllPages, readInChunks } = require('../helpers/paginators')
const {
    selectRecordingsByProcessed, selectRecordingsByUser,
} = require('../models/recordings')

/* */
const dropRecording = async function (req, res) {
    // TODO implement
    throw Error('Not Implemented')
}

/* */
const getByRecordingId = async function (req, res) {
    // TODO implement
    throw Error('Not Implemented')
}

/* */
const getByStage = async function (req, res) {
    // TODO implement
    throw Error('Not Implemented')
}

/* Get recordings by user. */
const getByUser = async function (req, res) {
    const { username } = req.body
    const recordings = await readAllPages(selectRecordingsByUser, username)

    if (recordings) {
        res.json({ data: recordings })
    } else {
        throw Error(404)
    }
}

/* */
const setRecording = async function (req, res) {
    // TODO implement
    throw Error('Not Implemented')
}

const getRecordings = async function (req, res) {
    const { username: processedBy } = req.params
    const { userId } = req.session

    const recordings = await readInChunks(
        selectRecordingsByProcessed, processedBy, userId,
    )

    if (recordings.rows.length) {
        res.json({ data: recordings.rows })
    } else {
        throw Error(404)
    }
}

module.exports = {
    dropRecording,
    getByRecordingId,
    getByStage,
    getByUser,
    getRecordings,
    setRecording,
}
