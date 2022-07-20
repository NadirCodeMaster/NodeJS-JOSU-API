#!/bin/bash
export $(cat .env | xargs)

if [[ ! $(echo $1 | grep -E '^(meetings|profiles|users)$') ]]
then
	echo 'Keyspace should be either "meetings", "profiles", or "users"'
	exit 1
fi

cqlsh $CASSANDRA_DOMAIN $CASSANDRA_PORT \
	--username $CASSANDRA_USERNAME  \
	--password $CASSANDRA_PASSWORD  \
	--ssl --execute "DROP KEYSPACE IF EXISTS josu_$1"
echo 'Keyspace dropped'
sleep 90

cqlsh $CASSANDRA_DOMAIN $CASSANDRA_PORT \
	--username $CASSANDRA_USERNAME  \
	--password $CASSANDRA_PASSWORD  \
	--ssl --file sql/$1_keyspace.sql
echo 'Keyspace created'
sleep 10

cqlsh $CASSANDRA_DOMAIN $CASSANDRA_PORT \
	--username $CASSANDRA_USERNAME  \
	--password $CASSANDRA_PASSWORD  \
	--ssl --file sql/$1_schema.sql
echo 'Schema created'
sleep 30
