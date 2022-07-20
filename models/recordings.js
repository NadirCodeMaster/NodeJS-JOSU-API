const { cassandraCursor } = require('../helpers/cassandra')

const SELECT_RECORDINGS_BY_PROCESSED = 'SELECT * FROM "recordings_byProcessed" WHERE processed_by = ? AND user_id = ?'
const SELECT_RECORDINGS_BY_USER = 'SELECT * FROM "recordings_byUser" WHERE user_id = ?'

/* Get recordings by processed. */
const selectRecordingsByProcessed = async function (processedBy, userId, options) {
    const params = [processedBy, userId]
    return await cassandraCursor.execute(SELECT_RECORDINGS_BY_PROCESSED, params, options)
}

/* Get recordings by user. */
const selectRecordingsByUser = async function (userId, options) {
    const params = [userId]
    return await cassandraCursor.execute(SELECT_RECORDINGS_BY_USER, params, options)
}

module.exports = { selectRecordingsByProcessed, selectRecordingsByUser }
