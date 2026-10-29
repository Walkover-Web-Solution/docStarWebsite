-- `blog_post`: one daily run of the blog autopilot (src/server/blog/run.ts). The post itself is a draft page
-- in the DocStar "Blogs" collection; key = its DocStar page id once the draft exists.

ALTER TABLE admin DROP CONSTRAINT admin_type_check;
ALTER TABLE admin ADD CONSTRAINT admin_type_check CHECK (type IN ('user', 'page', 'page_revision', 'idea', 'experiment', 'ai_proposal', 'ai_run', 'setting', 'blog_post'));

-- one row per DocStar page
CREATE UNIQUE INDEX admin_blog_post_page_unique ON admin (key) WHERE type = 'blog_post' AND key IS NOT NULL;
