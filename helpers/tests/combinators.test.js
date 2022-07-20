const { orObject, orString } = require('../combinators')

describe('formatters', function () {
    test('orObject() data - success', () => {
        const ans = orObject({ test: 'test' })
        expect(ans).toStrictEqual({ test: 'test' })
    })

    test('orObject() undefined - success', () => {
        const ans = orObject(undefined)
        expect(ans).toStrictEqual({})
    })

    test('orString() data - success', () => {
        const ans = orString('test')
        expect(ans).toBe('test')
    })

    test('orString() undefined - success', () => {
        const ans = orString(undefined)
        expect(ans).toBe('')
    })
})
