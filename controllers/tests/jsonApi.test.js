const { getNextUrl, getResourceUrl, getSelfUrl, wrapResponse } = require('../jsonApi')

const { API_HOSTNAME } = process.env
require('./helpers')

describe('jsonApi', function () {
    test('getSelfUrl() -> success', function () {
        const req = { originalUrl: '/self' }
        const response = getSelfUrl(req)
        return expect(response.toString()).toBe(`${API_HOSTNAME}/self`)
    })

    test('getNextUrl() :: payload -> success', function () {
        const req = { originalUrl: '/self' }
        const res = { json: x => x, locals: { resultSet: { pageState: 'next' } } }

        const response = getNextUrl(req, res)
        return expect(response.toString()).toBe(`${API_HOSTNAME}/self?pageState=next`)
    })

    test('getNextUrl() :: no payload -> success', function () {
        const req = { originalUrl: '/self' }
        const res = { json: x => x, locals: {} }

        const response = getNextUrl(req, res)
        return expect(response).toBe(undefined)
    })

    test('getResourceUrl() :: query -> success', function () {
        const res = { json: x => x, locals: {} }
        const response = getResourceUrl(res)
        return expect(response).toBe(undefined)
    })

    test('getResourceUrl() :: command -> success', function () {
        const res = { json: x => x, locals: { resource: '/resource' } }
        const response = getResourceUrl(res)
        return expect(response).toBe(`${API_HOSTNAME}/resource`)
    })

    test('wrapResponse() :: query -> success', function () {
        const req = { originalUrl: '/self' }
        const res = {
            status: jest.fn(),
            locals: {
                payload: { test: 'test' },
                resultSet: { pageState: 'next' },
            },
        }

        const answer = {
            links: { self: `${API_HOSTNAME}/self`, next: `${API_HOSTNAME}/self?pageState=next` },
            data: { test: 'test' },
        }

        wrapResponse(req, res, jest.fn())
        return expect(JSON.stringify(res.locals.body)).toBe(JSON.stringify(answer))
    })

    test('wrapResponse() :: command -> success', function () {
        const req = { originalUrl: '/self' }
        const res = { status: jest.fn(), locals: { resource: '/resource' } }

        const answer = {
            links: { self: `${API_HOSTNAME}/self`, resource: `${API_HOSTNAME}/resource` },
            data: null,
        }

        wrapResponse(req, res, jest.fn())
        return expect(JSON.stringify(res.locals.body)).toBe(JSON.stringify(answer))
    })
})
