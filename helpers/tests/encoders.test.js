const { encodeForm } = require('../encoders')

describe('encoders', function () {
    test('encodeForm() return valid object - success', function () {
        const data = { test: 'test' }
        const response = encodeForm(data)
        expect(response.toString()).toBe('test=test')
    })
})
