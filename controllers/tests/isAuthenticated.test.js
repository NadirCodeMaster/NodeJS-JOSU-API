const { isAuthenticated } = require('../isAuthenticated')
require('./helpers')

const mockNext = jest.fn(() => ({}))

describe('isAuthenticated', function () {
    test('isAuthenticated() with cookie session - success', function () {
        const req = {
            get: jest.fn(() => ''),
            session: {
                userId: '0c602918-8808-4c81-ad18-6e17f4070368',
                timestamp: '2020-09-03T12:11:50.504Z',
            },
        }
        const response = isAuthenticated(req, null, mockNext)
        expect(response).toStrictEqual({})
    })

    test('isAuthenticated() with http header Basic - success', function () {
        const req = {
            get: jest.fn(() => 'Basic YWlyZmxvdzphaXJmbG93X3Bhc3N3b3Jk'),
            session: {},
        }
        const response = isAuthenticated(req, null, mockNext)
        expect(response).toStrictEqual({})
    })

    test('isAuthenticated() with http header Bearer - success', function () {
        const req = {
            get: jest.fn(() => 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTE1MjQ0MjQ1NzQ0NzUxOTI1NDAxIiwiaWF0IjoxNjA1NjA2Nzc3fQ.Z8q42hmgKnlVaMPDyHvRnKb5HShCINeO_H5MqPlZ16k'), // eslint-disable-line max-len
            session: {},
        }
        const response = isAuthenticated(req, null, mockNext)
        expect(response).toStrictEqual({})
    })

    test('isAuthenticated() without creds - failure', function () {
        const req = {
            get: jest.fn(() => ''),
            session: {},
        }
        const response = () => isAuthenticated(req, null, null)
        expect(response).toThrow()
    })
})
