const { isConsistentUser } = require('../isConsistentUser')
require('./helpers')

describe('isConsistentUser', function () {
    test('isConsistentUser() with all userIds - success', function () {
        const req = {
            auth: { user_id: 'test' },
            params: { user_id: 'test' },
            body: { data: { user: { user_id: 'test' } } },
        }
        const response = isConsistentUser(req, null, jest.fn())
        return expect(response).toStrictEqual(undefined)
    })

    test('isConsistentUser() with some userIds - success', function () {
        const req = {
            auth: { user_id: 'test' },
            params: { user_id: 'test' },
        }
        const response = isConsistentUser(req, null, jest.fn())
        return expect(response).toStrictEqual(undefined)
    })

    test('isConsistentUser() with no userIds - success', function () {
        const req = {}
        const response = isConsistentUser(req, null, jest.fn())
        return expect(response).toStrictEqual(undefined)
    })

    test('isConsistentUser() with bad userIds - failure', function () {
        const req = {
            auth: { user_id: 'false' },
            params: { user_id: 'test' },
            body: { data: { user: { user_id: 'test' } } },
        }
        const response = () => isConsistentUser(req, null, null)
        return expect(response).toThrow()
    })
})
