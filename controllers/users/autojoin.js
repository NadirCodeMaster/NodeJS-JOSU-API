const { updateUserAutojoin } = require('../../models/users')

const putUserAutojoin = async function (req, res, next) {
    await updateUserAutojoin({ ...req.body.data.user, autojoin_zoom: req.body.data.autojoin_zoom })
    res.locals.resource = req.originalUrl.replace('/autojoin', '')
    next()
}

module.exports = { putUserAutojoin }
