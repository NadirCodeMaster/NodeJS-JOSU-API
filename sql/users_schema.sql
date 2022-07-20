CREATE TABLE IF NOT EXISTS josu_users.accounts (
    account text,
    user_id UUID,
PRIMARY KEY ((account)));

CREATE TABLE IF NOT EXISTS josu_users.reset_tokens (
    reset_token UUID,
    base_uri text,
    user_id UUID,
    valid_until timestamp,
PRIMARY KEY ((reset_token)));

CREATE TABLE IF NOT EXISTS josu_users.usernames (
    username text,
    user_id UUID,
PRIMARY KEY ((username)));

CREATE TABLE IF NOT EXISTS josu_users.users (
    user_id UUID,
    "__accounts_google" map<text, text>,     -- account id -> stringified JSON
    "__accounts_microsoft" map<text, text>,
    "__calendars_google" map<text, text>,    -- calendar id -> stringified JSON
    "__calendars_microsoft" map<text, text>,
    autojoin_zoom boolean,
    devices set<UUID>,
    email text,
    first_name text,
    last_name text,
    password text,
    profile_id UUID,
    username text,
    userpic_url text,
PRIMARY KEY ((user_id)));

CREATE TABLE IF NOT EXISTS josu_users.stripe_customers (
    id UUID,
    user_id UUID,
    customer_id text,
    customer_name text,
    card_brand text,
    card_last_four text,
PRIMARY KEY ((user_id), id))
WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS josu_users.stripe_subscriptions (
    id UUID,
    user_id UUID,
    name text,
    subscription_id text,
    subscription_status text,
    plan_id text,
    quantity int,
    trial_ends_at timestamp,
    ends_at timestamp,
PRIMARY KEY ((user_id), id))
WITH CLUSTERING ORDER BY (id DESC);

-- TODO UDT

/* account JSON format:
{
    "id": "",
    "autojoin_zoom": "",
    "email": "",
    "first_name": "",
    "last_name": "",
    "name": "",
    "provider": "",
    "refresh_token": "",
}
*/

/* calendar JSON format:
{
    "id": "",
    "account": "",
    "channel": "",
    "expires": "",
    "provider": "",
    "refresh_token": "",
}
*/
