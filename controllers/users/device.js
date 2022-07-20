const { updateUserDevices } = require('../../models/users')

const putUserDevice = async function (req, res, next) {
    const { device, user } = req.body.data
    user.devices = [...user.devices, device]

    await updateUserDevices(user)

    res.locals.resource = req.originalUrl.replace('/device', '')
    return next()
}

const dropUserDevice = async function (req, res, next) {
    const { device: dropDevice, user } = req.body.data
    user.devices = user.devices.filter(device => device !== dropDevice)

    await updateUserDevices(user)

    res.locals.resource = req.originalUrl.replace('/device', '')
    return next()
}

module.exports = { putUserDevice, dropUserDevice }
