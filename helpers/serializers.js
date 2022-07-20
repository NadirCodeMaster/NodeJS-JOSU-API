const { orArray } = require('./combinators')

const copy = function (data) {
    return JSON.parse(JSON.stringify(data))
}

const serializeDunderFields = function (data) {
    const newData = {}
    for (const field in data) {
        if (field.match(/^__.*$/)) {
            newData[field] = serializeObjectFields(data[field])
        } else if (field === 'devices') {
            newData[field] = orArray(data[field])
        } else {
            newData[field] = data[field]
        }
    }
    return newData
}

const deserializeDunderFields = function (data) {
    const newData = {}
    for (const field in data) {
        if (field.match(/^__.*$/)) {
            newData[field] = deserializeObjectFields(data[field])
        } else {
            newData[field] = data[field]
        }
    }
    return newData
}

const serializeObjectFields = function (object) {
    const newObject = {}
    for (const field in object) {
        if (Object.prototype.hasOwnProperty.call(object, field)) {
            newObject[field] = JSON.parse(object[field])
        }
    }
    return newObject
}

const deserializeObjectFields = function (object) {
    const newObject = {}
    for (const field in object) {
        if (Object.prototype.hasOwnProperty.call(object, field)) {
            newObject[field] = JSON.stringify(object[field])
        }
    }
    return newObject
}

module.exports = {
    copy,
    serializeDunderFields,
    deserializeDunderFields,
    serializeObjectFields,
    deserializeObjectFields,
}
