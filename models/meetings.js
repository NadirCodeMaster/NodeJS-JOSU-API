const { cassandraCursor, readOptions, writeOptions } = require('../helpers/cassandra')
const { formatLog } = require('../helpers/formatters')
const { logger } = require('../helpers/logger')

const INSERT = `INSERT INTO josu_meetings.meetings (
    user_id, start, id,
    "__account", "__attendees_profiles", "__calendar", "__invitee_email",
    "__invitee_name", "__invitee_profile", "__is_cancelled", "__is_generic",
    "__is_important", "__is_invited", "__is_rescheduled",
    "__organizer_profile", "__provider", "__zoom_end", "__zoom_is_invited",
    "__zoom_meeting", "__zoom_password", "__zoom_start", "__zoom_summary",
    "__zoom_transcript", "__zoom_url", attachments, attendees_emails,
    attendees_names, created, end, is_organizer, labels, link, location,
    organizer_email, organizer_name, status, subject, text_content,
    updated
) VALUES (
    :user_id, :start, :id,
    :"__account", :"__attendees_profiles", :"__calendar", :"__invitee_email",
    :"__invitee_name", :"__invitee_profile", :"__is_cancelled", :"__is_generic",
    :"__is_important", :"__is_invited", :"__is_rescheduled",
    :"__organizer_profile", :"__provider", :"__zoom_end", :"__zoom_is_invited",
    :"__zoom_meeting", :"__zoom_password", :"__zoom_start", :"__zoom_summary",
    :"__zoom_transcript", :"__zoom_url", :attachments, :attendees_emails,
    :attendees_names, :created, :end, :is_organizer, :labels, :link, :location,
    :organizer_email, :organizer_name, :status, :subject, :text_content,
    :updated
)`

const SELECT = `SELECT * FROM josu_meetings.meetings
    WHERE user_id = :user_id`

const SELECT_START = `SELECT * FROM josu_meetings.meetings
    WHERE user_id = :user_id AND start > :after`

const SELECT_START_END = `SELECT * FROM josu_meetings.meetings
    WHERE user_id = :user_id AND start > :after AND start < :before`

const SELECT_START_END_ID = `SELECT * FROM josu_meetings.meetings
    WHERE user_id = :user_id AND start = :start AND id = :id`

const UPDATE = `UPDATE josu_meetings.meetings
    SET "__account" = :"__account",
        "__attendees_profiles" = :"__attendees_profiles",
        "__calendar" = :"__calendar",
        "__invitee_email" = :"__invitee_email",
        "__invitee_name" = :"__invitee_name",
        "__invitee_profile" = :"__invitee_profile",
        "__is_cancelled" = :"__is_cancelled",
        "__is_generic" = :"__is_generic",
        "__is_important" = :"__is_important",
        "__is_invited" = :"__is_invited",
        "__is_rescheduled" = :"__is_rescheduled",
        "__organizer_profile" = :"__organizer_profile",
        "__provider" = :"__provider",
        "__zoom_end" = :"__zoom_end",
        "__zoom_is_invited" = :"__zoom_is_invited",
        "__zoom_meeting" = :"__zoom_meeting",
        "__zoom_password" = :"__zoom_password",
        "__zoom_start" = :"__zoom_start",
        "__zoom_summary" = :"__zoom_summary",
        "__zoom_transcript" = :"__zoom_transcript",
        "__zoom_url" = :"__zoom_url",
        attachments = :attachments,
        attendees_emails = :attendees_emails,
        attendees_names = :attendees_names,
        created = :created,
        is_organizer = :is_organizer,
        labels = :labels,
        link = :link,
        location = :location,
        organizer_email = :organizer_email,
        organizer_name = :organizer_name,
        status = :status,
        subject = :subject,
        text_content = :text_content,
        updated = :updated
    WHERE user_id = :user_id AND start = :start AND id = :id`

const DELETE = `DELETE FROM josu_meetings.meetings
    WHERE user_id = :user_id AND start = :start AND id = :id`

const insertMeeting = async function (params) {
    const response = await cassandraCursor.execute(INSERT, params, writeOptions)
    logger.debug('success', formatLog({ INSERT, params, info: response.info }))
    return response
}

const selectMeetings = async function (params, query) {
    const response = await cassandraCursor.execute(SELECT, params, { ...readOptions, ...query })
    logger.debug('success', formatLog({
        SELECT, params, query, info: response.info, rowLength: response.rowLength,
    }))
    return response
}

const selectMeetingsAfter = async function (params, query) {
    const response = await cassandraCursor.execute(SELECT_START, params, { ...readOptions, ...query })
    logger.debug('success', formatLog({
        SELECT_START, params, query, info: response.info, rowLength: response.rowLength,
    }))
    return response
}

const selectMeetingsAfterBefore = async function (params, query) {
    const response = await cassandraCursor.execute(SELECT_START_END, params, { ...readOptions, ...query })
    logger.debug('success', formatLog({
        SELECT_START_END, params, query, info: response.info, rowLength: response.rowLength,
    }))
    return response
}

const selectMeeting = async function (params, query) {
    const response = await cassandraCursor.execute(SELECT_START_END_ID, params, { ...readOptions, ...query })
    logger.debug('success', formatLog({
        SELECT_START_END_ID, params, query, info: response.info, rowLength: response.rowLength,
    }))
    return response
}

const updateMeeting = async function (params) {
    const response = await cassandraCursor.execute(UPDATE, params, writeOptions)
    logger.debug('success', formatLog({ UPDATE, params, info: response.info }))
    return response
}

const deleteMeeting = async function (params) {
    const response = await cassandraCursor.execute(DELETE, params, writeOptions)
    logger.debug('success', formatLog({ DELETE, params, info: response.info }))
    return response
}

module.exports = {
    insertMeeting,
    selectMeetings,
    selectMeetingsAfter,
    selectMeetingsAfterBefore,
    selectMeeting,
    updateMeeting,
    deleteMeeting,
}
