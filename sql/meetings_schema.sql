CREATE TABLE IF NOT EXISTS josu_meetings.meetings (
    user_id UUID,
    start timestamp,
    id text,
    "__account" text,
    "__attendees_profiles" list<UUID>,
    "__calendar" text,
    "__invitee_email" text,
    "__invitee_name" text,
    "__invitee_profile" UUID,
    "__is_cancelled" boolean,
    "__is_generic" boolean,
    "__is_important" boolean,
    "__is_invited" boolean,
    "__is_rescheduled" boolean,
    "__organizer_profile" UUID,
    "__provider" text,
    "__zoom_end" timestamp,
    "__zoom_is_invited" boolean,
    "__zoom_meeting" text,
    "__zoom_password" text,
    "__zoom_start" timestamp,
    "__zoom_summary" text,
    "__zoom_transcript" text,
    "__zoom_url" text,
    attachments set<text>,
    attendees_emails list<text>,
    attendees_names list<text>,
    created timestamp,
    end timestamp,
    is_organizer boolean,
    labels set<text>,
    link text,
    location text,
    organizer_email text,
    organizer_name text,
    status text,
    subject text,
    text_content text,
    updated timestamp,
    PRIMARY KEY ((user_id), start, id))
WITH CLUSTERING ORDER BY (start ASC, id DESC);
