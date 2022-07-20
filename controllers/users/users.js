const { selectUser, selectUsers, updateUser } = require('../../models/users')

const getUser = async function (req, res, next) {
    res.locals.resultSet = await selectUser(req.params)
    res.locals.payload = res.locals.resultSet.rows?.[0]
    return next()
}

const getUsers = async function (req, res, next) {
    res.locals.resultSet = await selectUsers(req.params)
    res.locals.payload = res.locals.resultSet.rows
    return next()
}

const putUser = async function (req, res, next) {
    await updateUser(res.locals.payload)
    res.locals.resource = req.originalUrl
    return next()
}

module.exports = { getUser, getUsers, putUser }
