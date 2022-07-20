const {
    insertMeeting,
    selectMeetings,
    selectMeetingsAfter,
    selectMeetingsAfterBefore,
    selectMeeting,
    updateMeeting,
    deleteMeeting,
} = require('../../models/meetings')

const createMeeting = async function (req, res, next) {
    const { data } = req.body
    await insertMeeting(data)

    res.locals.resource = `/v0/meetings/${data.user_id}/${data.start}/${data.id}`
    return next()
}

const getMeetings = async function (req, res, next) {
    let selectHandler
    if (req.query.before) {
        selectHandler = selectMeetingsAfterBefore
    } else if (req.query.after) {
        selectHandler = selectMeetingsAfter
    } else {
        selectHandler = selectMeetings
    }

    res.locals.resultSet = await selectHandler({ ...req.params, ...req.query }, req.query)
    res.locals.payload = res.locals.resultSet.rows

    return next()
}

const getMeeting = async function (req, res, next) {
    res.locals.resultSet = await selectMeeting(req.params, req.query)
    res.locals.payload = res.locals.resultSet.rows?.[0]
    return next()
}

const putMeeting = async function (req, res, next) {
    await updateMeeting({ ...req.body.data, ...req.params })
    res.locals.resource = req.originalUrl
    return next()
}

const dropMeeting = async function (req, res, next) {
    await deleteMeeting(req.params)
    res.locals.resource = req.originalUrl
    return next()
}

module.exports = { createMeeting, getMeetings, getMeeting, putMeeting, dropMeeting }
