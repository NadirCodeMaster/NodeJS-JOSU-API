const fs = require('fs')
const {
    addAccountGoogle,
    addAccountMicrosoft,
    formatAccountGoogle,
    formatAccountMicrosoft,
    formatUserGoogle,
    formatUserMicrosoft,
} = require('../formatters')

require('../../tests/helpers')

const uuid = require('uuid')
jest.mock('uuid')

describe('auth', function () {
    test('addAccountGoogle() -> success', function () {
        const inp = fs.readFileSync('controllers/auth/tests/input/addAccountGoogle.json')
        const out = fs.readFileSync('controllers/auth/tests/output/addAccountGoogle.json')

        const { account, tokens, user } = JSON.parse(inp)

        const ans = addAccountGoogle(user, account, tokens)
        return expect(ans).toStrictEqual(JSON.parse(out))
    })

    test('addAccountMicrosoft() -> success', function () {
        const inp = fs.readFileSync('controllers/auth/tests/input/addAccountMicrosoft.json')
        const out = fs.readFileSync('controllers/auth/tests/output/addAccountMicrosoft.json')

        const { account, tokens, user } = JSON.parse(inp)

        const ans = addAccountMicrosoft(user, account, tokens)
        return expect(ans).toStrictEqual(JSON.parse(out))
    })

    test('formatUserGoogle() -> success', function () {
        const inp = fs.readFileSync('controllers/auth/tests/input/formatUserGoogle.json')
        const out = fs.readFileSync('controllers/auth/tests/output/formatUserGoogle.json')

        const { account, tokens } = JSON.parse(inp)
        uuid.v4.mockReturnValue('41986908-52ca-4284-ba01-a565e92d3744')

        const ans = formatUserGoogle(account, tokens)
        return expect(ans).toStrictEqual(JSON.parse(out))
    })

    test('formatUserMicrosoft() -> success', function () {
        const inp = fs.readFileSync('controllers/auth/tests/input/formatUserMicrosoft.json')
        const out = fs.readFileSync('controllers/auth/tests/output/formatUserMicrosoft.json')

        const { account, tokens } = JSON.parse(inp)
        uuid.v4.mockReturnValue('dba86563-4e38-4f30-8bf7-f358d8bddf23')

        const ans = formatUserMicrosoft(account, tokens)
        return expect(ans).toStrictEqual(JSON.parse(out))
    })

    test('formatAccountGoogle() -> success', function () {
        const inp = fs.readFileSync('controllers/auth/tests/input/formatAccountGoogle.json')
        const out = fs.readFileSync('controllers/auth/tests/output/formatAccountGoogle.json')

        const { account, tokens } = JSON.parse(inp)

        const ans = formatAccountGoogle(account, tokens)
        return expect(ans).toStrictEqual(JSON.parse(out))
    })

    test('formatAccountMicrosoft() -> success', function () {
        const inp = fs.readFileSync('controllers/auth/tests/input/formatAccountMicrosoft.json')
        const out = fs.readFileSync('controllers/auth/tests/output/formatAccountMicrosoft.json')

        const { account, tokens } = JSON.parse(inp)

        const ans = formatAccountMicrosoft(account, tokens)
        return expect(ans).toStrictEqual(JSON.parse(out))
    })
})
