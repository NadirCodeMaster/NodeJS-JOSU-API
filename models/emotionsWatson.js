const { cassandraCursor, writeOptions } = require('../helpers/cassandra')

const INSERT = `INSERT INTO "emotions_watson" (
    user_id, provider, id, account_id, document_tone_ids,
    document_tone_names, document_tone_scores, sentences_id, sentences,
    sentences_score, sentences_tone_id, sentences_tone_name
) VALUES (
    :user_id, :provider, :id, :account_id, :document_tone_ids,
    :document_tone_names, :document_tone_scores, :sentences_id, :sentences,
    :sentences_score, :sentences_tone_id, :sentences_tone_name
)`

const SELECT_BY_USER_ID = 'SELECT * FROM "emotions_watson" WHERE user_id = :user_id'

const insertEmotionWatson = async function (params) {
    return await cassandraCursor.execute(INSERT, params, writeOptions)
}

const selectEmotionsWatsonByUser = async function (params) {
    return await cassandraCursor.execute(SELECT_BY_USER_ID, params, writeOptions)
}

module.exports = { insertEmotionWatson, selectEmotionsWatsonByUser }
