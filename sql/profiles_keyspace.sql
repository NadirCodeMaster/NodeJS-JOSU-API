CREATE KEYSPACE IF NOT EXISTS josu_profiles
    WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
