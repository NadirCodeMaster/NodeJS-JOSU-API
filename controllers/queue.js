const { formatResponse } = require('../helpers/formatters')
const {
    deleteEmailsQueue, insertEmailsQueue, selectEmailsQueue,
} = require('../models/emailsQueue')
const {
    deleteEmotionsQueue, insertEmotionsQueue, selectEmotionsQueue,
} = require('../models/emotionsQueue')
const {
    deleteTopicsQueue, insertTopicsQueue, selectTopicsQueue,
} = require('../models/topicsQueue')

const createEmailsQueue = async function (req, res) {
    await Promise.all(req.body.data.map(insertEmailsQueue))
    res.status(201).json({})
}

const createEmotionsQueue = async function (req, res) {
    const data = req.body.data.map(datum => ({ text: null, ...datum }))
    await Promise.all(data.map(insertEmotionsQueue))
    res.status(201).json({})
}

const createTopicsQueue = async function (req, res) {
    const data = req.body.data.map(datum => ({ text: null, ...datum }))
    await Promise.all(data.map(insertTopicsQueue))
    res.status(201).json({})
}

const dropEmailsQueue = async function (req, res) {
    await Promise.all(req.body.data.map(deleteEmailsQueue))
    res.status(204).json({})
}

const dropEmotionsQueue = async function (req, res) {
    await Promise.all(req.body.data.map(deleteEmotionsQueue))
    res.status(204).json({})
}

const dropTopicsQueue = async function (req, res) {
    await Promise.all(req.body.data.map(deleteTopicsQueue))
    res.status(204).json({})
}

const getEmailsQueue = async function (req, res) {
    const emailsQueue = await selectEmailsQueue(req.query)
    const response = formatResponse(emailsQueue, req)
    res.status(200).json(response)
}

const getEmotionsQueue = async function (req, res) {
    const emotionsQueue = await selectEmotionsQueue(req.query)
    const response = formatResponse(emotionsQueue, req)
    res.status(200).json(response)
}

const getTopicsQueue = async function (req, res) {
    const topicsQueue = await selectTopicsQueue(req.query)
    const response = formatResponse(topicsQueue, req)
    res.status(200).json(response)
}

module.exports = {
    createEmailsQueue,
    createEmotionsQueue,
    createTopicsQueue,
    dropEmailsQueue,
    dropEmotionsQueue,
    dropTopicsQueue,
    getEmailsQueue,
    getEmotionsQueue,
    getTopicsQueue,
}
