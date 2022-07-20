const {
    insertEmail,
    selectEmailsByAccountId,
    updateEmailCategory,
    updateEmailEmotions,
    updateEmailEntities,
    updateEmailGroundTruth,
    updateEmailKeywords,
    updateEmailPerson,
    updateEmailTopics,
    updateEmailWordCount,
} = require('../models/emailsGmail')
const { dateOr } = require('../helpers/validators')
const { readInChunks, writeInChunks } = require('../helpers/paginators')

const createEmail = async function (req, res) {
    const { date_received } = req.body.data // eslint-disable-line camelcase
    await insertEmail({
        category: null,
        category_ground_truth: null,
        confidence_category: null,
        confidence_is_person: null,
        emotions: null,
        emotions_endpos: null,
        emotions_mean: null,
        emotions_mean_weight: null,
        emotions_startpos: null,
        emotions_weight: null,
        keywords: null,
        keywords_endpos: null,
        keywords_startpos: null,
        keywords_weight: null,
        is_person: null,
        named_entities: null,
        named_entities_endpos: null,
        named_entities_startpos: null,
        named_entities_type: null,
        named_entities_weight: null,
        topics: null,
        topics_weight: null,
        word_count: null,
        ...req.body.data,
        date_received: dateOr(date_received),
    })
    res.status(201).json({})
}

const getByAccount = async function (req, res) {
    const emails = await readInChunks(selectEmailsByAccountId, req.params)
    res.json({ data: emails.rows })
}

const setEmailsCategory = async function (req, res) {
    await writeInChunks(req.body.data, updateEmailCategory)
    res.status(204).json({})
}

const setEmailsEmotions = async function (req, res) {
    await writeInChunks(req.body.data, updateEmailEmotions)
    res.status(204).json({})
}

const setEmailsEntities = async function (req, res) {
    await writeInChunks(req.body.data, updateEmailEntities)
    res.status(204).json({})
}

const setEmailsGroundTruth = async function (req, res) {
    await writeInChunks(req.body.data, updateEmailGroundTruth)
    res.status(204).json({})
}

const setEmailsKeywords = async function (req, res) {
    await writeInChunks(req.body.data, updateEmailKeywords)
    res.status(204).json({})
}

const setEmailsPerson = async function (req, res) {
    await writeInChunks(req.body.data, updateEmailPerson)
    res.status(204).json({})
}

const setEmailsTopics = async function (req, res) {
    await writeInChunks(req.body.data, updateEmailTopics)
    res.status(204).json({})
}

const setEmailsWordCount = async function (req, res) {
    await writeInChunks(req.body.data, updateEmailWordCount)
    res.status(204).json({})
}

module.exports = {
    createEmail,
    getByAccount,
    setEmailsCategory,
    setEmailsEmotions,
    setEmailsEntities,
    setEmailsGroundTruth,
    setEmailsKeywords,
    setEmailsPerson,
    setEmailsTopics,
    setEmailsWordCount,
}
