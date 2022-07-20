const { readAllPages } = require('../helpers/paginators')
const { selectEmailsByEmailFrom } = require('../models/emailsGmail')
const { selectSpeaker } = require('../models/speakers')

/* Get recordings breakdown between speakers for a timeframe. */
const breakdown = async function (req, res) {
    const { speakers, start, end } = req.body

    const speakerData = await Promise.all(
        speakers.map(speakerId => readAllPages(selectSpeaker, {
            provider: 'gmail',
            account_nickname: speakerId,
        })),
    )

    const speakerEmails = speakerData
        .map(x => x.rows)
        .filter(x => x) // TODO consider throwing error instead
        .map(x => x[0]?.email_address)

    const speakerEmailsData = await Promise.all(
        speakerEmails.map(email => readAllPages(
            selectEmailsByEmailFrom, email,
        )),
    )

    const startDate = new Date(start)
    const endDate = new Date(end)

    const wordCounts = speakerEmailsData
        .map(email => email.rows)
        .filter(email => filterByDate(email, startDate, endDate))
        .map(getWordsCount)

    const totalWords = wordCounts.reduce((acc, words) => acc + words)

    const breakdown = Object.fromEntries(
        speakers.map((x, i) => [x, wordCounts[i] / totalWords]),
    )

    res.status(200).json({ data: breakdown })
    // TODO error handling
}

const filterByDate = function (emails, startDate, endDate) {
    return emails.filter((email) => {
        const dateReceived = email.date_received
        return startDate < dateReceived && dateReceived < endDate
    })
}

const getWordsCount = function (emails) {
    return emails.reduce((acc, email) => acc + email.word_count, 0)
}

module.exports = { breakdown, filterByDate, getWordsCount }
