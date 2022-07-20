const orArray = function (data) {
    return data || []
}

const orObject = function (data) {
    return data || {}
}

const orString = function (data) {
    return data || ''
}

module.exports = { orArray, orObject, orString }
