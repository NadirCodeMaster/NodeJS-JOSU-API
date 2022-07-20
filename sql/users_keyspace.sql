CREATE KEYSPACE IF NOT EXISTS josu_users
    WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
