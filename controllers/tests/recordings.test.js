const isAuthenticatedController = require('../../controllers/isAuthenticated')
const recordings = require('../../models/recordings')
const request = require('supertest')

const GET_RECORDINGS_FAILURE = null
const GET_RECORDINGS_SUCCESS = [{ id: '05529a8f-32f7-4d57-bf67-28d371cfbb46' }]

jest.mock('../../models/recordings')
isAuthenticatedController.isAuthenticated = jest.fn((req, res, next) => next())

const app = require('../../index')
const client = request(app)

describe.skip('/recordings', function () {
    test('get recordings by processed - success', async function () {
        recordings.getRecordingsByUser.mockResolvedValue(GET_RECORDINGS_SUCCESS)
        const response = await client.get('/v0/recordings/test')
        return expect(response.body.data[0].id).toBe('05529a8f-32f7-4d57-bf67-28d371cfbb46')
    })

    test('get recordings by processed - failure', async function () {
        recordings.getRecordingsByUser.mockResolvedValue(GET_RECORDINGS_FAILURE)
        const response = await client.get('/v0/recordings/fake')
        return expect(response.body.errors[0].status).toBe('404')
    })

    test('get recordings by processed - success', async function () {
        recordings.getRecordingsByProcessed.mockResolvedValue({})
        const response = await client.get('/v0/queue/test')
        return expect(response.body.data[0].id).toBe('05529a8f-32f7-4d57-bf67-28d371cfbb46')
    })
})
