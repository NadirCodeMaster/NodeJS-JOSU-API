CREATE KEYSPACE IF NOT EXISTS josu_meetings
    WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
