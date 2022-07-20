const uuid = require('uuid')

const { Error404, UNKNOWN_SPEAKER } = require('../helpers/errors')
const { insertSpeaker, selectSpeaker } = require('../models/speakers')

const createSpeaker = async function (req, res) {
    const data = {
        ...req.body,
        id: uuid.v4(),
        created: new Date(),
        is_deleted: false,
    }
    await insertSpeaker(data)
    res.status(201).json({ data })
}

const getSpeaker = async function (req, res) {
    const speaker = await selectSpeaker(req.params)

    if (speaker.rows.length) {
        res.json({ data: speaker.rows[0] })
    } else {
        throw new Error404(UNKNOWN_SPEAKER)
    }
}

module.exports = { createSpeaker, getSpeaker }
