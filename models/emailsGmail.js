const { cassandraCursor, writeOptions } = require('../helpers/cassandra')

const INSERT = `INSERT INTO "emails_gmail" (
    id, user_id, account_id, category, category_ground_truth,
    confidence_category, confidence_is_person, date_received,
    email_attachment_names, email_content, email_from, email_subject,
    email_to, emotions, emotions_endpos, emotions_mean,
    emotions_mean_weight, emotions_startpos, emotions_weight, is_person,
    is_solitary_recipient, keywords, keywords_endpos, keywords_startpos,
    keywords_weight, labels, named_entities, named_entities_endpos,
    named_entities_startpos, named_entities_type, named_entities_weight,
    speaker_id, topics, topics_weight, thread_id, word_count
) VALUES (
    :id, :user_id, :account_id, :category, :category_ground_truth,
    :confidence_category, :confidence_is_person, :date_received,
    :email_attachment_names, :email_content, :email_from, :email_subject,
    :email_to, :emotions, :emotions_endpos, :emotions_mean,
    :emotions_mean_weight, :emotions_startpos, :emotions_weight, :is_person,
    :is_solitary_recipient, :keywords, :keywords_endpos, :keywords_startpos,
    :keywords_weight, :labels, :named_entities, :named_entities_endpos,
    :named_entities_startpos, :named_entities_type, :named_entities_weight,
    :speaker_id, :topics, :topics_weight, :thread_id, :word_count
)`

const INSERT_BY_ACCOUNT_ID = `INSERT INTO "emails_gmail_byAccountId" (
    id, user_id, account_id, category, category_ground_truth,
    confidence_category, confidence_is_person, date_received,
    email_attachment_names, email_content, email_from, email_subject,
    email_to, emotions, emotions_endpos, emotions_mean,
    emotions_mean_weight, emotions_startpos, emotions_weight, is_person,
    is_solitary_recipient, keywords, keywords_endpos, keywords_startpos,
    keywords_weight, labels, named_entities, named_entities_endpos,
    named_entities_startpos, named_entities_type, named_entities_weight,
    speaker_id, topics, topics_weight, thread_id, word_count
) VALUES (
    :id, :user_id, :account_id, :category, :category_ground_truth,
    :confidence_category, :confidence_is_person, :date_received,
    :email_attachment_names, :email_content, :email_from, :email_subject,
    :email_to, :emotions, :emotions_endpos, :emotions_mean,
    :emotions_mean_weight, :emotions_startpos, :emotions_weight, :is_person,
    :is_solitary_recipient, :keywords, :keywords_endpos, :keywords_startpos,
    :keywords_weight, :labels, :named_entities, :named_entities_endpos,
    :named_entities_startpos, :named_entities_type, :named_entities_weight,
    :speaker_id, :topics, :topics_weight, :thread_id, :word_count
)`

const SELECT = `SELECT * FROM "emails_gmail"
    WHERE id = :id and user_id = :user_id`

const SELECT_BY_ACCOUNT_ID = `SELECT * FROM "emails_gmail_byAccountId"
    WHERE account_id = :account_id`

const UPDATE_CATEGORY = `UPDATE "emails_gmail"
    SET category = :category, confidence_category = :confidence_category
    WHERE id = :id AND user_id = :user_id`

const UPDATE_CATEGORY_BY_ACCOUNT_ID = `UPDATE "emails_gmail_byAccountId"
    SET category = :category, confidence_category = :confidence_category
    WHERE account_id = :account_id AND user_id = :user_id AND id = :id`

const UPDATE_EMOTIONS = `UPDATE "emails_gmail"
    SET emotions = :emotions,
        emotions_endpos = :emotions_endpos,
        emotions_mean = :emotions_mean,
        emotions_mean_weight = :emotions_mean_weight,
        emotions_startpos = :emotions_startpos,
        emotions_weight = :emotions_weight
    WHERE id = :id AND user_id = :user_id`

const UPDATE_EMOTIONS_BY_ACCOUNT_ID = `UPDATE "emails_gmail_byAccountId"
    SET emotions = :emotions,
        emotions_endpos = :emotions_endpos,
        emotions_mean = :emotions_mean,
        emotions_mean_weight = :emotions_mean_weight,
        emotions_startpos = :emotions_startpos,
        emotions_weight = :emotions_weight
    WHERE account_id = :account_id AND user_id = :user_id AND id = :id`

const UPDATE_ENTITIES = `UPDATE "emails_gmail"
    SET named_entities = :named_entities,
        named_entities_endpos = :named_entities_endpos,
        named_entities_startpos = :named_entities_startpos,
        named_entities_type = :named_entities_type,
        named_entities_weight = :named_entities_weight
    WHERE id = :id AND user_id = :user_id`

const UPDATE_ENTITIES_BY_ACCOUNT_ID = `UPDATE "emails_gmail_byAccountId"
    SET named_entities = :named_entities,
        named_entities_endpos = :named_entities_endpos,
        named_entities_startpos = :named_entities_startpos,
        named_entities_type = :named_entities_type,
        named_entities_weight = :named_entities_weight
    WHERE account_id = :account_id AND user_id = :user_id AND id = :id`

const UPDATE_GROUND_TRUTH = `UPDATE "emails_gmail"
    SET category_ground_truth = :category_ground_truth
    WHERE id = :id AND user_id = :user_id`

const UPDATE_GROUND_TRUTH_BY_ACCOUNT_ID = `UPDATE "emails_gmail_byAccountId"
    SET category_ground_truth = :category_ground_truth
    WHERE account_id = :account_id AND user_id = :user_id AND id = :id`

const UPDATE_KEYWORDS = `UPDATE "emails_gmail"
    SET keywords = :keywords,
        keywords_endpos = :keywords_endpos,
        keywords_startpos = :keywords_startpos,
        keywords_weight = :keywords_weight
    WHERE id = :id AND user_id = :user_id`

const UPDATE_KEYWORDS_BY_ACCOUNT_ID = `UPDATE "emails_gmail_byAccountId"
    SET keywords = :keywords,
        keywords_endpos = :keywords_endpos,
        keywords_startpos = :keywords_startpos,
        keywords_weight = :keywords_weight
    WHERE account_id = :account_id AND user_id = :user_id AND id = :id`

const UPDATE_PERSON = `UPDATE "emails_gmail"
    SET is_person = :is_person, confidence_is_person = :confidence_is_person
    WHERE id = :id AND user_id = :user_id`

const UPDATE_PERSON_BY_ACCOUNT_ID = `UPDATE "emails_gmail_byAccountId"
    SET is_person = :is_person, confidence_is_person = :confidence_is_person
    WHERE account_id = :account_id AND user_id = :user_id AND id = :id`

const UPDATE_TOPICS = `UPDATE "emails_gmail"
    SET topics = :topics, topics_weight = :topics_weight
    WHERE id = :id AND user_id = :user_id`

const UPDATE_TOPICS_BY_ACCOUNT_ID = `UPDATE "emails_gmail_byAccountId"
    SET topics = :topics, topics_weight = :topics_weight
    WHERE account_id = :account_id AND user_id = :user_id AND id = :id`

const UPDATE_WORD_COUNT = `UPDATE "emails_gmail"
    SET word_count = :word_count
    WHERE id = :id AND user_id = :user_id`

const UPDATE_WORD_COUNT_BY_ACCOUNT_ID = `UPDATE "emails_gmail_byAccountId"
    SET word_count = :word_count
    WHERE account_id = :account_id AND user_id = :user_id AND id = :id`

const insertEmail = async function (params) {
    const queries = [
        { query: INSERT, params },
        { query: INSERT_BY_ACCOUNT_ID, params },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const selectEmails = async function (params) {
    return await cassandraCursor.execute(SELECT, params, { prepare: true })
}

const selectEmailsByAccountId = async function (params, options) {
    return await cassandraCursor.execute(
        SELECT_BY_ACCOUNT_ID,
        params,
        { ...options, prepare: true }, // pass pageState
    )
}

const updateEmailCategory = async function (params) {
    const queries = [
        { query: UPDATE_CATEGORY, params },
        { query: UPDATE_CATEGORY_BY_ACCOUNT_ID, params },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const updateEmailEmotions = async function (params) {
    const queries = [
        { query: UPDATE_EMOTIONS, params },
        { query: UPDATE_EMOTIONS_BY_ACCOUNT_ID, params },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const updateEmailEntities = async function (params) {
    const queries = [
        { query: UPDATE_ENTITIES, params },
        { query: UPDATE_ENTITIES_BY_ACCOUNT_ID, params },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const updateEmailGroundTruth = async function (params) {
    const queries = [
        { query: UPDATE_GROUND_TRUTH, params },
        { query: UPDATE_GROUND_TRUTH_BY_ACCOUNT_ID, params },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const updateEmailKeywords = async function (params) {
    const queries = [
        { query: UPDATE_KEYWORDS, params },
        { query: UPDATE_KEYWORDS_BY_ACCOUNT_ID, params },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const updateEmailPerson = async function (params) {
    const queries = [
        { query: UPDATE_PERSON, params },
        { query: UPDATE_PERSON_BY_ACCOUNT_ID, params },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const updateEmailTopics = async function (params) {
    const queries = [
        { query: UPDATE_TOPICS, params },
        { query: UPDATE_TOPICS_BY_ACCOUNT_ID, params },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

const updateEmailWordCount = async function (params) {
    const queries = [
        { query: UPDATE_WORD_COUNT, params },
        { query: UPDATE_WORD_COUNT_BY_ACCOUNT_ID, params },
    ]
    return await cassandraCursor.batch(queries, writeOptions)
}

module.exports = {
    insertEmail,
    selectEmails,
    selectEmailsByAccountId,
    updateEmailCategory,
    updateEmailEmotions,
    updateEmailEntities,
    updateEmailGroundTruth,
    updateEmailKeywords,
    updateEmailPerson,
    updateEmailTopics,
    updateEmailWordCount,
}
