-- List of all annotations for all audio files, some entry may be 'processed_by' an algorithm for speaker recognition
CREATE TABLE IF NOT EXISTS kpr_ai."annotations" (
    id UUID,
    recording_id UUID,
    created timestamp,
    end_time timestamp,
    processed_by text,
    speaker_id UUID,
    start_time timestamp,
    user_id UUID,
    PRIMARY KEY ((id), recording_id))
WITH CLUSTERING ORDER BY (recording_id DESC);

-- "Give me all annotations processed by a particular user/ai"
CREATE TABLE IF NOT EXISTS kpr_ai."annotations_byProcessed" (
    processed_by text,
    recording_id UUID,
    id UUID,
    created timestamp,
    end_time timestamp,
    speaker_id UUID,
    start_time timestamp,
    user_id UUID,
    PRIMARY KEY ((processed_by), recording_id, id))
WITH CLUSTERING ORDER BY (recording_id DESC);

-- "Give me all recordings"
CREATE TABLE IF NOT EXISTS kpr_ai."annotations_byRecording" (
    recording_id UUID,
    id UUID,
    created timestamp,
    end_time timestamp,
    processed_by text,
    speaker_id UUID,
    start_time timestamp,
    user_id UUID,
    PRIMARY KEY ((recording_id), id))
WITH CLUSTERING ORDER BY (id DESC);

-- "Give me all annotations with this speaker"
CREATE TABLE IF NOT EXISTS kpr_ai."annotations_bySpeaker" (
    speaker_id UUID,
    recording_id UUID,
    id UUID,
    created timestamp,
    end_time timestamp,
    processed_by text,
    start_time timestamp,
    user_id UUID,
    PRIMARY KEY ((speaker_id), recording_id, id))
WITH CLUSTERING ORDER BY (recording_id DESC);

-- Conversations
CREATE TABLE IF NOT EXISTS kpr_ai."conversations" (
    id UUID,
    user_id UUID,
    created timestamp,
    end_time timestamp,
    recording_id UUID,
    start_time timestamp,
    PRIMARY KEY ((id), user_id))
WITH CLUSTERING ORDER BY (user_id DESC);

-- "Give me all conversations by this user"
CREATE TABLE IF NOT EXISTS kpr_ai."conversations_byUser" (
    id UUID,
    created timestamp,
    end_time timestamp,
    recording_id UUID,
    start_time timestamp,
    user_id UUID,
    PRIMARY KEY ((user_id), id))
WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS kpr_ai."emails_gmail" (
    id text,
    user_id UUID,
    account_id UUID,
    category list<text>,              -- Event Invite|Newsletter|Personal|Spam|Transactional
    category_ground_truth text,
    confidence_category list<float>,
    confidence_is_person float,
    date_received timestamp,
    email_attachment_names set<text>,
    email_content text,
    email_from text,
    email_subject text,
    email_to set<text>,
    emotions list<text>,
    emotions_endpos list<int>,
    emotions_mean list<text>,
    emotions_mean_weight list<float>,
    emotions_startpos list<int>,
    emotions_weight list<float>,
    is_person boolean,
    is_solitary_recipient boolean,
    keywords list<text>,
    keywords_endpos list<text>, -- array of int in JSON
    keywords_startpos list<text>,
    keywords_weight list<float>,
    labels set<text>,
    named_entities list<text>,
    named_entities_endpos list<text>,
    named_entities_startpos list<text>,
    named_entities_type list<text>,
    named_entities_weight list<float>,
    paragraph_count int,
    speaker_id UUID,
    thread_id text,
    topics list<text>,
    topics_weight list<float>,
    word_count int,
    PRIMARY KEY ((id), user_id))
WITH CLUSTERING ORDER BY (user_id DESC);

-- "Give me all emails for this one particular account"
CREATE TABLE IF NOT EXISTS kpr_ai."emails_gmail_byAccountId" (
    account_id UUID,
    user_id UUID,
    id text,
    category list<text>,
    category_ground_truth text,
    confidence_category list<float>,
    confidence_is_person float,
    date_received timestamp,
    email_attachment_names set<text>,
    email_content text,
    email_from text,
    email_subject text,
    email_to set<text>,
    emotions list<text>,
    emotions_endpos list<int>,
    emotions_mean list<text>,
    emotions_mean_weight list<float>,
    emotions_startpos list<int>,
    emotions_weight list<float>,
    is_person boolean,
    is_solitary_recipient boolean,
    keywords list<text>,
    keywords_endpos list<text>,
    keywords_startpos list<text>,
    keywords_weight list<float>,
    labels set<text>,
    named_entities list<text>,
    named_entities_endpos list<text>,
    named_entities_startpos list<text>,
    named_entities_type list<text>,
    named_entities_weight list<float>,
    paragraph_count int,
    speaker_id UUID,
    thread_id text,
    topics list<text>,
    topics_weight list<float>,
    word_count int,
    PRIMARY KEY ((account_id), user_id, id))
WITH CLUSTERING ORDER BY (user_id DESC);

-- Microsoft Outlook emails
CREATE TABLE IF NOT EXISTS kpr_ai."emails_outlook" (
    id text,
    user_id UUID,
    account_id UUID,
    bcc_recipients set<text>,
    category list<text>,        -- Event Invite|Newsletter|Personal|Spam|Transactional
    category_ground_truth text,
    cc_recipients set<text>,
    change_key text,
    confidence_category list<float>,
    confidence_is_person float,
    conversation_id text,
    conversation_index text,
    created_datetime timestamp,
    -- gmail naming kept for compatibility
    -- subject to change in future
    date_received timestamp,    -- .receivedDateTime API field
    email_content text,         -- .bodyPreview API field
    email_from text,            -- .from.emailAddress.address API field
    email_subject text,         -- .subject API field
    email_to set<text>,         -- .toRecipients[].emailAddress.address API field
    emotions list<text>,
    emotions_endpos list<int>,
    emotions_mean list<text>,
    emotions_mean_weight list<float>,
    emotions_startpos list<int>,
    emotions_weight list<float>,
    flag_status text,
    has_attachments boolean,
    importance text,
    inference_classification text,
    internet_message_id text,
    is_delivery_receipt_requested boolean,
    is_draft boolean,
    is_person boolean,
    is_read boolean,
    is_read_receipt_requested boolean,
    is_solitary_recipient boolean,
    keywords list<text>,
    keywords_endpos list<text>,
    keywords_startpos list<text>,
    keywords_weight list<float>,
    labels set<text>,           -- .categories[] API field
    last_modified_datetime timestamp,
    location text,
    named_entities list<text>,
    named_entities_endpos list<text>,
    named_entities_startpos list<text>,
    named_entities_type list<text>,
    named_entities_weight list<float>,
    paragraph_count int,
    parent_folder_id text,
    reply_to set<text>,
    sender_name text,
    sender_address text,
    sent_datetime timestamp,
    speaker_id UUID,
    topics list<text>,
    topics_weight list<float>,
    web_link text,
    word_count int,
    PRIMARY KEY ((id), user_id))
WITH CLUSTERING ORDER BY (user_id DESC);

-- Microsoft Outlook emails
CREATE TABLE IF NOT EXISTS kpr_ai."emails_outlook_byAccountId" (
    account_id UUID,
    user_id UUID,
    id text,
    bcc_recipients set<text>,
    category list<text>,
    category_ground_truth text,
    cc_recipients set<text>,
    change_key text,
    confidence_category list<float>,
    confidence_is_person float,
    conversation_id text,
    conversation_index text,
    created_datetime timestamp,
    -- gmail naming kept for compatibility
    -- subject to change in future
    date_received timestamp,    -- .receivedDateTime API field
    email_content text,         -- .bodyPreview API field
    email_from text,            -- .from.emailAddress.address API field
    email_subject text,         -- .subject API field
    email_to set<text>,         -- .toRecipients[].emailAddress.address API field
    emotions list<text>,
    emotions_endpos list<int>,
    emotions_mean list<text>,
    emotions_mean_weight list<float>,
    emotions_startpos list<int>,
    emotions_weight list<float>,
    flag_status text,
    has_attachments boolean,
    importance text,
    inference_classification text,
    internet_message_id text,
    is_delivery_receipt_requested boolean,
    is_draft boolean,
    is_person boolean,
    is_read boolean,
    is_read_receipt_requested boolean,
    is_solitary_recipient boolean,
    keywords list<text>,
    keywords_endpos list<text>,
    keywords_startpos list<text>,
    keywords_weight list<float>,
    labels set<text>,                   -- .categories[] API field
    last_modified_datetime timestamp,
    location text,
    named_entities list<text>,
    named_entities_endpos list<text>,
    named_entities_startpos list<text>,
    named_entities_type list<text>,
    named_entities_weight list<float>,
    paragraph_count int,
    parent_folder_id text,
    reply_to set<text>,
    sender_name text,
    sender_address text,
    sent_datetime timestamp,
    speaker_id UUID,
    topics list<text>,
    topics_weight list<float>,
    web_link text,
    word_count int,
    PRIMARY KEY ((account_id), user_id, id))
WITH CLUSTERING ORDER BY (user_id DESC, id DESC);

-- Queue for emails processing
CREATE TABLE IF NOT EXISTS kpr_ai."emails_queue" (
    id text,
    user_id UUID,
    provider text,  -- gmail|outlook
    account_id UUID,
    speaker_id UUID,
    PRIMARY KEY ((id), user_id, provider))
WITH CLUSTERING ORDER BY (user_id DESC, provider DESC);

-- Emotions
CREATE TABLE IF NOT EXISTS kpr_ai."emotional_context" (
    id UUID,
    user_id UUID,
    emotion text,
    source_id UUID,
    created timestamp,
    duration_ms int,
    emotion_confidence float,
    source_type UUID, --email or audio
    speaker_id UUID,
    start_time timestamp,
    topic text,
    topic_confidence float,
    PRIMARY KEY ((id), user_id, emotion, source_id))
WITH CLUSTERING ORDER BY (user_id DESC);

-- "Give me all emotions for this user”
CREATE TABLE IF NOT EXISTS kpr_ai."emotional_context_byEmotion" (
    emotion text,
    user_id UUID,
    source_id UUID,
    id UUID,
    created timestamp,
    duration_ms int,
    emotion_confidence float,
    source_type UUID, --email or audio
    speaker_id UUID,
    start_time timestamp,
    topic text,
    topic_confidence float,
    PRIMARY KEY ((emotion), user_id, source_id, id))
WITH CLUSTERING ORDER BY (user_id DESC);

-- "Give me all topics with this record"
CREATE TABLE IF NOT EXISTS kpr_ai."emotional_context_byRecord" (
    source_id UUID,
    user_id UUID,
    topic text,
    id UUID,
    created timestamp,
    duration_ms int,
    emotion text,
    emotion_confidence float,
    source_type UUID, -- email|audio
    speaker_id UUID,
    start_time timestamp,
    topic_confidence float,
    PRIMARY KEY ((source_id), user_id, topic, id))
WITH CLUSTERING ORDER BY (user_id DESC);

-- "Give me all topics with this emotion”
CREATE TABLE IF NOT EXISTS kpr_ai."emotional_context_byTopicEmotion" (
    emotion text,
    topic text,
    user_id UUID,
    source_id UUID,
    id UUID,
    created timestamp,
    duration_ms int,
    emotion_confidence float,
    source_type UUID,
    speaker_id UUID,
    start_time timestamp,
    topic_confidence float,
    PRIMARY KEY ((emotion), topic, user_id, source_id, id))
WITH CLUSTERING ORDER BY (topic DESC, user_id DESC);

CREATE TABLE IF NOT EXISTS kpr_ai."emotions_queue" (
    id text,
    user_id UUID,
    provider text, -- gmail|googlecalendar|microsoftcalendar|outlook|twitter|slack|zoom
    account_id UUID,
    speaker_id UUID,
    text text,
    PRIMARY KEY ((id), user_id, provider))
WITH CLUSTERING ORDER BY (user_id DESC, provider DESC);

CREATE TABLE IF NOT EXISTS kpr_ai."emotions_watson" (
    user_id UUID,
    provider text, -- gmail|googlecalendar|microsoftcalendar|outlook|twitter|slack|zoom
    id text,
    account_id UUID,
    document_tone_ids list<text>,
    document_tone_names list<text>,
    document_tone_scores list<float>,
    sentences_id list<int>,
    sentences list<text>,
    sentences_score list<text>,
    sentences_tone_id list<text>,
    sentences_tone_name list<text>,
    speaker_id UUID,
    PRIMARY KEY ((user_id), provider, id))
WITH CLUSTERING ORDER BY (provider DESC, id DESC);

-- One to many store of all times a file has been processed and by which version of a neural net
CREATE TABLE IF NOT EXISTS kpr_ai."nn_processing" (
    recording_id UUID,
    id UUID,
    created timestamp,
    is_deleted boolean,
    sentiment_created boolean,
    sentiment_processed boolean,
    sentiment_versions boolean,
    speaker_recog_created timestamp,
    speaker_recog_processed boolean,
    speaker_recog_version timestamp,
    speech_to_text_created timestamp,
    speech_to_text_processed boolean,
    speech_to_text_version timestamp,
    topics_created timestamp,
    topics_processed boolean,
    topics_version timestamp,
    user_id UUID,
    PRIMARY KEY ((recording_id), id))
WITH CLUSTERING ORDER BY (id DESC);

-- "Give me all recordings that need topics identified (e.g. WHERE topics_processed = false)"
CREATE TABLE IF NOT EXISTS kpr_ai."nn_processing_byTopicsProcessed" (
    topics_processed boolean,
    recording_id UUID,
    id UUID,
    created timestamp,
    is_deleted boolean,
    sentiment_created boolean,
    sentiment_processed boolean,
    sentiment_versions boolean,
    speaker_recog_created timestamp,
    speaker_recog_processed boolean,
    speaker_recog_version timestamp,
    speech_to_text_created timestamp,
    speech_to_text_processed boolean,
    speech_to_text_version timestamp,
    topics_created timestamp,
    topics_version timestamp,
    user_id UUID,
    PRIMARY KEY ((topics_processed), recording_id, id))
WITH CLUSTERING ORDER BY (recording_id DESC);

-- "Give me all recordings that need to speaker recognition (e.g. WHERE speaker_recog_processed = false)"
-- When a file should be processed again, a new record can be inserted with just the recording_id and processed = false
CREATE TABLE IF NOT EXISTS kpr_ai."nn_processing_bySRProcessed" (
    speaker_recog_processed boolean,
    recording_id UUID,
    id UUID,
    created timestamp,
    is_deleted boolean,
    sentiment_created boolean,
    sentiment_processed boolean,
    sentiment_versions boolean,
    speaker_recog_created timestamp,
    speaker_recog_version timestamp,
    speech_to_text_created timestamp,
    speech_to_text_processed boolean,
    speech_to_text_version timestamp,
    topics_created timestamp,
    topics_processed boolean,
    topics_version timestamp,
    user_id UUID,
    PRIMARY KEY ((speaker_recog_processed), recording_id, id))
WITH CLUSTERING ORDER BY (recording_id DESC);

-- "Give me all recordings that need to be ran under speech-to-text (e.g. WHERE speech_to_text_processed = false)"
CREATE TABLE IF NOT EXISTS kpr_ai."nn_processing_bySTTProcessed" (
    speech_to_text_processed boolean,
    recording_id UUID,
    id UUID,
    created timestamp,
    is_deleted boolean,
    sentiment_created boolean,
    sentiment_processed boolean,
    sentiment_versions boolean,
    speaker_recog_created timestamp,
    speaker_recog_processed boolean,
    speaker_recog_version timestamp,
    speech_to_text_created timestamp,
    speech_to_text_version timestamp,
    topics_created timestamp,
    topics_processed boolean,
    topics_version timestamp,
    user_id UUID,
    PRIMARY KEY ((speech_to_text_processed), recording_id, id))
WITH CLUSTERING ORDER BY (recording_id DESC);

-- "Give me all recordings that need sentiment analysis (e.g. WHERE sentiment_processed = false)"
CREATE TABLE IF NOT EXISTS kpr_ai."nn_processing_bySentProcessed" (
    sentiment_processed boolean,
    recording_id UUID,
    id UUID,
    created timestamp,
    is_deleted boolean,
    sentiment_created boolean,
    sentiment_versions boolean,
    speaker_recog_created timestamp,
    speaker_recog_processed boolean,
    speaker_recog_version timestamp,
    speech_to_text_created timestamp,
    speech_to_text_processed boolean,
    speech_to_text_version timestamp,
    topics_created timestamp,
    topics_processed boolean,
    topics_version timestamp,
    user_id UUID,
    PRIMARY KEY ((sentiment_processed), recording_id, id))
WITH CLUSTERING ORDER BY (recording_id DESC);

-- Credentials for Gmail, Instagram, Linkedin, Twitter, Slack, Zoom apps
CREATE TABLE IF NOT EXISTS kpr_ai."provider_credentials" (
    provider text, -- [gmail|instagram|linkedin|twitter|slack|zoom]
    id UUID,
    credentials text,
    PRIMARY KEY ((provider), id))
WITH CLUSTERING ORDER BY (id DESC);

-- List of all recordings
CREATE TABLE IF NOT EXISTS kpr_ai."recordings" (
    id UUID,
    user_id UUID,
    altitude float,
    created timestamp,
    duration_seconds int,
    end_time timestamp,
    is_deleted boolean,
    latitude float,
    longitude float,
    processed_by text,
    s3Path text,
    size_kb int,
    start_time timestamp,
    version text,
    PRIMARY KEY ((id), user_id))
WITH CLUSTERING ORDER BY (user_id DESC);

-- "Give me all recordings that need to be processed by the human (e.g. WHERE processed_by = N/A)"
CREATE TABLE IF NOT EXISTS kpr_ai."recordings_byProcessed" (
    processed_by text,
    user_id UUID,
    id UUID,
    altitude float,
    created timestamp,
    duration_seconds int,
    end_time timestamp,
    is_deleted boolean,
    latitude float,
    longitude float,
    s3Path text,
    size_kb int,
    start_time timestamp,
    version text,
    PRIMARY KEY ((processed_by), user_id, id))
WITH CLUSTERING ORDER BY (user_id DESC);

-- "Give me all recordings for this user"
CREATE TABLE IF NOT EXISTS kpr_ai."recordings_byUser" (
    user_id UUID,
    id UUID,
    altitude float,
    created timestamp,
    duration_seconds int,
    end_time timestamp,
    is_deleted boolean,
    latitude float,
    longitude float,
    processed_by text,
    s3Path text,
    size_kb int,
    start_time timestamp,
    version text,
    PRIMARY KEY ((user_id), id))
WITH CLUSTERING ORDER BY (id DESC);

-- Sentiment table for transcription pieces and other sources
CREATE TABLE IF NOT EXISTS kpr_ai."sentiment" (
    id UUID,
    recording_id UUID,
    user_id UUID,
    speaker_id UUID,
    angry float,
    anxious float,
    created timestamp,
    end_time timestamp,
    frustrated float,
    happy float,
    start_time timestamp,
    PRIMARY KEY ((id), recording_id, user_id, speaker_id))
WITH CLUSTERING ORDER BY (recording_id DESC);

CREATE TABLE IF NOT EXISTS kpr_ai."slack_channels" (
    id text,
    user_id UUID,
    created timestamp,
    creator text,
    is_channel boolean,
    is_group boolean,
    is_im boolean,
    is_private boolean,
    is_subscribed boolean,
    name text,
    previous_names set<text>,
    topic text,
    workspace text,
    PRIMARY KEY ((id), user_id))
WITH CLUSTERING ORDER BY (user_id DESC);

CREATE TABLE IF NOT EXISTS kpr_ai."slack_messages" (
    id UUID, -- assigned by Slack
    author text,
    channel text,
    created timestamp,
    edited timestamp,
    is_edited boolean,
    latest_reply timestamp,
    reactions set<text>,
    reply_count int,
    reply_users set<text>,
    reply_users_count int,
    speaker_id UUID,
    text text,
    type text, -- [message|call?|...]
    word_count int,
    workspace text,
    PRIMARY KEY ((id)));

CREATE TABLE IF NOT EXISTS kpr_ai."slack_queue" (
    id UUID,
    text text,
    PRIMARY KEY ((id)));

CREATE TABLE IF NOT EXISTS kpr_ai."slack_workspaces" (
    id text,
    user_id UUID,
    created timestamp,
    domain text,
    email_domain set<text>,
    is_subscribed boolean,
    name text,
    PRIMARY KEY ((id), user_id))
WITH CLUSTERING ORDER BY (user_id DESC);

-- Go through the whole audio transcript and identify major topics of conversation
-- Make a second pass to show when those topics were being discussed and make an insert for every mention
CREATE TABLE IF NOT EXISTS kpr_ai."topics" (
    user_id UUID,
    provider text, -- gmail|googlecalendar|microsoftcalendar|outlook|twitter|slack|zoom
    id text,
    account_id UUID,
    created timestamp,
    end_time timestamp,
    kind text, -- entitiy|keyword
    speaker_id UUID,
    start_time timestamp,
    topic text,
    type text,
    weight float,
    PRIMARY KEY ((user_id), provider, id))
WITH CLUSTERING ORDER BY (provider DESC, id DESC);

CREATE TABLE IF NOT EXISTS kpr_ai."topics_queue" (
    id text,
    user_id UUID,
    provider text, -- gmail|googlecalendar|microsoftcalendar|outlook|twitter|slack|zoom
    account_id UUID,
    speaker_id UUID,
    text text,
    PRIMARY KEY ((id), user_id, provider))
WITH CLUSTERING ORDER BY (user_id DESC, provider DESC);

-- List of trashed recordings
CREATE TABLE IF NOT EXISTS kpr_ai."trash" (
    user_id UUID,
    start_time timestamp,
    id UUID,
    altitude float,
    created timestamp,
    duration_seconds int,
    end_time timestamp,
    latitude float,
    longitude float,
    processed_by text,
    s3Path text,
    size_kb int,
    trashed timestamp,
    version text,
    PRIMARY KEY ((user_id), start_time, id))
WITH CLUSTERING ORDER BY (start_time DESC);

-- List of all users
CREATE TABLE IF NOT EXISTS kpr_ai."users_legacy" (
    email text,
    id UUID,
    password text,
    first_name text,
    last_name text,
    PRIMARY KEY ((email), id))
WITH CLUSTERING ORDER BY (id DESC);

-- Create account table for third party provider OAuth2 tokens
CREATE TABLE IF NOT EXISTS kpr_ai."user_accounts" ( -- TODO rename to accounts
    provider text, -- gmail|googlecalendar|instagram|linkedin|microsoftcalendar|outlook|twitter|slack|zoom
    id UUID, -- TODO maybe swap with account_nickname
    user_id UUID,
    account_nickname text, -- TODO store provider-unique id instead of username/firstname/lastname
    created timestamp,
    is_active boolean,
    last_sync timestamp,
    refresh_token text,
    PRIMARY KEY ((provider), id, user_id))
WITH CLUSTERING ORDER BY (id DESC, user_id DESC);

-- "Give me accounts by user id and provider" (e.g. a user may have multiple accounts)
CREATE TABLE IF NOT EXISTS kpr_ai."user_accounts_byUserId" (
    user_id UUID,
    provider text,
    id UUID,
    account_nickname text,
    created timestamp,
    is_active boolean,
    last_sync timestamp,
    refresh_token text,
    PRIMARY KEY ((user_id, provider), id))
WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS kpr_ai."sync_twitter_timeline_infos" (
    id UUID,
    user_id UUID,
    user_account_id UUID,
    twitter_user_id text,
    last_sync_timeline_id text,
    PRIMARY KEY ((user_id, user_account_id, twitter_user_id), id))
WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS kpr_ai."sync_twitter_friend_infos" (
    id UUID,
    user_id UUID,
    user_account_id UUID,
    last_sync_friend_id text,
    PRIMARY KEY ((user_id, user_account_id), id))
WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS kpr_ai."sync_twitter_follower_infos" (
    id UUID,
    user_id UUID,
    user_account_id UUID,
    last_sync_follower_id text,
    PRIMARY KEY ((user_id, user_account_id), id))
WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS kpr_ai."twitter_friends" (
    id UUID,
    user_id UUID,
    user_account_id UUID,
    twitter_id text,
    twitter_name text,
    PRIMARY KEY ((user_id, user_account_id), id))
WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS kpr_ai."twitter_followers" (
    id UUID,
    user_id UUID,
    user_account_id UUID,
    twitter_id text,
    twitter_name text,
    PRIMARY KEY ((user_id, user_account_id), id))
WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS kpr_ai."sync_twitter_direct_message_infos" (
    id UUID,
    user_id UUID,
    user_account_id UUID,
    last_sync_message_id text,
    PRIMARY KEY ((user_id, user_account_id), id))
WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS kpr_ai."twitter_direct_messages" (
    id UUID,
    user_id UUID,
    user_account_id UUID,
    recipient_id text,
    sender_id text,
    message_id text,
    type text,
    created_timestamp text,
    message text,
    PRIMARY KEY ((user_id, user_account_id), id))
WITH CLUSTERING ORDER BY (id DESC);
