const { insertTopic, selectTopicByUser } = require('../models/topics')
const { dateOr } = require('../helpers/validators')

const createTopics = async function (req, res) {
    const { created, end_time, start_time } = req.body.data // eslint-disable-line camelcase
    await insertTopic({
        ...req.body.data,
        created: dateOr(created),
        end_time: dateOr(end_time),
        start_time: dateOr(start_time),
    })
    res.status(201).json({})
}

const getTopics = async function (req, res) {
    const topics = await selectTopicByUser(req.params)
    res.status(200).json({ data: topics })
}

module.exports = {
    createTopics,
    getTopics,
}
