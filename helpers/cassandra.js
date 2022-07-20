const cassandra = require('cassandra-driver')
const fs = require('fs')

const { READ_PAGE } = require('./config')
require('./dotenv')

const {
    CASSANDRA_DATACENTER,
    CASSANDRA_DOMAIN,
    CASSANDRA_PASSWORD,
    CASSANDRA_PORT,
    CASSANDRA_USERNAME,
    NODE_ENV,
} = process.env

const connectToCassandra = function () {
    const authProvider = new cassandra.auth.PlainTextAuthProvider(
        CASSANDRA_USERNAME, CASSANDRA_PASSWORD,
    )
    const contactPoints = [
        `${CASSANDRA_DOMAIN}:${CASSANDRA_PORT}`,
    ]
    const sslOptions = {
        cert: fs.readFileSync('./certificates/AmazonRootCA1.pem'),
        host: CASSANDRA_DOMAIN,
        rejectUnauthorized: true,
    }
    const testConfig = {
        contactPoints,
        keyspace: 'kpr_ai',
        localDataCenter: CASSANDRA_DATACENTER,
    }
    const prodConfig = {
        ...testConfig,
        authProvider,
        pooling: { maxRequestsPerConnection: 32768 },
        sslOptions,
    }
    return new cassandra.Client(NODE_ENV === 'prod' ? prodConfig : testConfig)
}

const readOptions = {
    fetchSize: READ_PAGE,
    prepare: true,
}

const writeOptions = {
    consistency: cassandra.types.consistencies.localQuorum,
    logged: false,
    prepare: true,
}

const cassandraCursor = connectToCassandra()

module.exports = { cassandraCursor, readOptions, writeOptions }
