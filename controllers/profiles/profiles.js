const {
    insertProfile,
    selectProfile,
    updateProfile,
    deleteProfile,
} = require('../../models/profiles')
const { selectEmail, deleteEmail } = require('../../models/emails')

const createProfile = async function (req, res, next) {
    await insertProfile(req.body.data)
    res.locals.resource = `/v0/profiles/${req.body.data.profile_id}`
    return next()
}

const getProfile = async function (req, res, next) {
    res.locals.resultSet = await selectProfile(req.params)
    res.locals.payload = res.locals.resultSet.rows?.[0]
    return next()
}

const getProfileEmail = async function (req, res, next) {
    const profiles = await selectEmail(req.query)
    const profile = profiles.rows?.[0]

    if (profile) {
        res.locals.resultSet = await selectProfile(profile)
        res.locals.payload = res.locals.resultSet.rows?.[0]
    }
    return next()
}

const dropProfile = async function (req, res, next) {
    res.locals.resource = req.originalUrl
    await Promise.all(req.body.data.emails.map((email, i) => {
        const params = { email, name: req.body.data.names[i] }
        deleteEmail(params)
    }))

    await deleteProfile(req.body.data, req.body.data)
    return next()
}

const putProfileIdentity = async function (req, res, next) {
    const { identity, profile } = req.body.data

    profile.emails.push(identity.email)
    profile.names.push(identity.name)

    await updateProfile(profile, identity)
    res.locals.resource = req.originalUrl.replace('/identity', '')

    return next()
}

const dropProfileIdentity = async function (req, res, next) {
    const { identity, profile } = req.body.data

    profile.emails = profile.emails.filter(email => email !== identity.email)
    profile.names = profile.names.filter(name => name !== identity.name)

    await deleteProfile(profile, identity)
    res.locals.resource = req.originalUrl.replace('/identity', '')

    return next()
}

module.exports = {
    createProfile,
    getProfile,
    getProfileEmail,
    dropProfile,
    putProfileIdentity,
    dropProfileIdentity,
}
