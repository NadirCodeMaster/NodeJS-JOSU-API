CREATE TABLE IF NOT EXISTS josu_profiles.emails (
    email text,
    profile_id UUID,
PRIMARY KEY ((email)));

CREATE TABLE IF NOT EXISTS josu_profiles.profiles (
    profile_id UUID,
    email text,
    emails list<text>,
    name text,
    names list<text>,
PRIMARY KEY ((profile_id)));
