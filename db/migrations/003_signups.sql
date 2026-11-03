-- New DocStar users, sent by hitman-api when someone finishes onboarding (POST /api/internal/signups).
-- Stored as `signup` rows of `admin`: key = the app's user id (one row per user), title = name.
-- `blog_post` (002_blog_post.sql, blog autopilot branch) stays allowed, so this works before or after that lands.

ALTER TABLE admin DROP CONSTRAINT admin_type_check;
ALTER TABLE admin ADD CONSTRAINT admin_type_check CHECK (type IN ('user', 'page', 'page_revision', 'idea', 'experiment', 'ai_proposal', 'ai_run', 'setting', 'blog_post', 'signup'));

-- one admin user per email, one page per slug, one test per key, one setting per name, one signup per app user
DROP INDEX admin_type_key_unique;
CREATE UNIQUE INDEX admin_type_key_unique ON admin (type, key) WHERE type IN ('user', 'page', 'experiment', 'setting', 'signup');
