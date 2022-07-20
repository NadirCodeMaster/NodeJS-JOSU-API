const { updateUserUsername } = require('../../models/users')

const putUserUsername = async function (req, res, next) {
    await updateUserUsername({ ...req.body.data.user, username: req.body.data.new_username }, req.body.data.user)
    res.locals.resource = req.originalUrl.replace('/username', '')
    return next()
}

module.exports = { putUserUsername }
