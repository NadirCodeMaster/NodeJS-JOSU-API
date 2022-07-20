#!/bin/bash
export $(cat .env.local | xargs)

if [[ ! $(echo $1 | grep -E '^(meetings|profiles|users)$') ]]
then
	echo 'Keyspace should be either "meetings", "profiles", or "users"'
	exit 1
fi

cqlsh $CASSANDRA_DOMAIN $CASSANDRA_PORT --execute "DROP KEYSPACE IF EXISTS josu_$1"
echo 'Keyspace dropped'

cqlsh $CASSANDRA_DOMAIN $CASSANDRA_PORT --file sql/$1_keyspace.sql
echo 'Keyspace created'

cqlsh $CASSANDRA_DOMAIN $CASSANDRA_PORT --file sql/$1_schema.sql
echo 'Schema created'
