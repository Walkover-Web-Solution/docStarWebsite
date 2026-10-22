-- docstar-website database.
--
-- `admin`: every record the admin manages, in one table. `type` says what a row is, `parent_id` links
-- it to another row (a version to its page, a test to its page, an action to its test), `key` is a
-- name (page slug, test key, setting name, user email) and `data` holds the fields of that type.
-- The shape of `data` for each type is checked in code (src/server/adminTypes.ts).
--
-- `admin_events`: tracking events from the website (people and agents), one row per event.

CREATE TABLE admin (
  id          integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  -- user | page | page_revision | idea | experiment | ai_proposal | ai_run | setting
  type        varchar(32)  NOT NULL,
  parent_id   integer      REFERENCES admin (id) ON DELETE CASCADE,
  key         varchar(200),
  status      varchar(24),
  title       varchar(300),
  -- who created the row: human | agent | system
  actor_type  varchar(16)  NOT NULL DEFAULT 'system',
  actor_id    varchar(64),
  actor_name  varchar(255),
  data        jsonb        NOT NULL DEFAULT '{}',
  created_at  timestamptz  NOT NULL DEFAULT now(),
  updated_at  timestamptz  NOT NULL DEFAULT now(),
  CONSTRAINT admin_type_check CHECK (type IN ('user', 'page', 'page_revision', 'idea', 'experiment', 'ai_proposal', 'ai_run', 'setting')),
  CONSTRAINT admin_actor_type_check CHECK (actor_type IN ('human', 'agent', 'system'))
);

CREATE INDEX admin_type_status_idx ON admin (type, status, created_at);
CREATE INDEX admin_parent_idx ON admin (parent_id);
-- one admin user per email, one page per slug, one test per key, one setting per name
CREATE UNIQUE INDEX admin_type_key_unique ON admin (type, key) WHERE type IN ('user', 'page', 'experiment', 'setting');
-- one page per path, one version number per page
CREATE UNIQUE INDEX admin_page_path_unique ON admin ((data ->> 'path')) WHERE type = 'page';
CREATE UNIQUE INDEX admin_revision_version_unique ON admin (parent_id, ((data ->> 'version')::int)) WHERE type = 'page_revision';

CREATE TABLE admin_events (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ts          timestamptz  NOT NULL DEFAULT now(),
  event       varchar(64)  NOT NULL,
  -- human | ai_agent | ai_crawler | ai_search | http_client | bot
  actor_type  varchar(16)  NOT NULL,
  agent_name  varchar(64),
  -- random visitor id from the browser cookie (no personal data); for admin sign-in events, a salted hash of the IP
  anon_id     varchar(64),
  path        varchar(512),
  -- random code on a copied prompt, matched with the agent's later fetch of the quickstart
  ref         varchar(64),
  -- A/B tests the visitor was in: { "<test key>": "A" | "B" | "C" }
  variants    jsonb,
  props       jsonb
);

CREATE INDEX admin_events_ts_idx ON admin_events (ts);
CREATE INDEX admin_events_event_ts_idx ON admin_events (event, ts);
CREATE INDEX admin_events_actor_ts_idx ON admin_events (actor_type, ts);
CREATE INDEX admin_events_anon_idx ON admin_events (anon_id);
CREATE INDEX admin_events_ref_idx ON admin_events (ref);

CREATE INDEX IF NOT EXISTS admin_idea_sender_idx ON admin ((data->>'senderHash')) WHERE type = 'idea';
CREATE INDEX IF NOT EXISTS admin_idea_followup_idx ON admin ((data->>'followUpHash')) WHERE type = 'idea';
