const { insertEmotionWatson, selectEmotionsWatsonByUser } = require('../models/emotionsWatson')
const { sleep } = require('../helpers/paginators')

const createEmotions = async function (req, res) {
    await insertEmotionWatson(req.body.data)
    res.status(201).json({})
}

const getEmotions = async function (req, res) {
    const topics = await selectEmotionsWatsonByUser(req.params)
    res.status(200).json({ data: topics })
}

/* Get emotion by topic. */
const getByTopic = async function (req, res) {
    await sleep(4000)
    // TODO implement
    throw Error('Not Implemented')
}

/* Get emotion by speaker. */
const getBySpeaker = async function (req, res) {
    // TODO implement
    throw Error('Not Implemented')
}

module.exports = { createEmotions, getEmotions, getByTopic, getBySpeaker }
