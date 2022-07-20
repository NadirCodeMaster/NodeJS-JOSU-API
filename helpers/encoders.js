const encodeForm = function (data) {
    return new URLSearchParams(data)
}

module.exports = { encodeForm }
