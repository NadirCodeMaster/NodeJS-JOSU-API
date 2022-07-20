const faker = require('faker')
const { dateOr, rowsOr } = require('../validators')

describe('validators', function () {
    test('dateOr() valid date - success', function () {
        const date = faker.date.recent()
        const result = dateOr(date.toISOString())
        return expect(result).toStrictEqual(date)
    })

    test('dateOr() invalid date - success', function () {
        const date = 'unparsable date'
        const result = dateOr(date)
        return expect(result).toBe(null)
    })

    test('rowsOr() non-null rows length - success', function () {
        const data = ['test']
        const result = rowsOr({ rows: data })
        return expect(result).toStrictEqual(data)
    })

    test('rowsOr() null rows length - success', function () {
        const data = []
        const result = () => rowsOr({ rows: data })
        return expect(result).toThrow()
    })
})
