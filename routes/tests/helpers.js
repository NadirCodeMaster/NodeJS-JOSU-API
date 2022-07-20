const defaults = require('superagent-defaults')
const request = require('supertest')

const mockNext = (req, res, next) => next()
const mockStatus200 = (req, res) => res.sendStatus(200)

global.console = { log: jest.fn(), error: jest.fn(), warn: jest.fn() }

const createTestClient = function () {
    const app = require('../../index')
    const client = defaults(request(app))

    client.set('Content-Type', 'application/json')
    return client
}

const mockModuleMethods = function (module, mock) {
    for (const key in module) {
        if (Object.prototype.hasOwnProperty.call(module, key)) {
            module[key] = mock
        }
    }
}

module.exports = { createTestClient, mockModuleMethods, mockNext, mockStatus200 }
