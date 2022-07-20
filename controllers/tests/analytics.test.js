const request = require('supertest')

const { filterByDate, getWordsCount } = require('../analytics')
const paginators = require('../../helpers/paginators')
const isAuthenticatedController = require('../../controllers/isAuthenticated')

jest.mock('../../models/emailsGmail')
jest.mock('../../helpers/paginators')

isAuthenticatedController.isAuthenticated = jest.fn((req, res, next) => next())

const app = require('../../index')
const client = request(app)

describe.skip('/analytics', function () {
    test.skip('breakdown() - success', async function () {
        paginators.readInChunks.mockResolvedValue({ rows: [{ email_address: '' }] })
        const response = await client.post('/v0/analytics/talkbreakdown')
                                     .send({ speakers: ['', ''], start: new Date(), end: new Date() })
        expect(response.status).toBe(200)
    })

    test('filterByDate() - success', function () {
        const emailNew = { date_received: new Date('2020') }
        const emailOld = { date_received: new Date('2010') }
        const startDate = new Date('2015')
        const endDate = new Date('2025')
        const response = filterByDate([emailNew, emailOld], startDate, endDate)
        expect(response).toStrictEqual([emailNew])
    })

    test('getWordsCount() - success', function () {
        const response = getWordsCount([{ word_count: 5 }, { word_count: 5 }])
        expect(response).toBe(10)
    })
})
