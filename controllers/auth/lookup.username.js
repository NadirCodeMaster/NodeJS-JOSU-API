const { selectUsername } = require('../../models/usernames')

const lookupUsername = async function (req, res, next) {
    res.locals.resultSet = await selectUsername(req.params)
    res.locals.payload = res.locals.resultSet.rows?.[0]
    return next()
}

module.exports = { lookupUsername }
