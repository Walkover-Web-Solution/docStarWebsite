-- Adds the record types for the knowledge editor, the competitor watchlist and the analyses.
--   knowledge_edit  an edit of a docs/*.md file made in the admin; the repository stays the source of truth
--   competitor      a watchlist entry (operational state only; the findings live in docs/COMPETITORS.md)
--   analysis_run    one run of an analysis: durable state, findings, data window, revision
ALTER TABLE admin DROP CONSTRAINT admin_type_check;
ALTER TABLE admin ADD CONSTRAINT admin_type_check CHECK (type IN ('user', 'page', 'page_revision', 'idea', 'experiment', 'ai_proposal', 'ai_run', 'setting', 'knowledge_edit', 'competitor', 'analysis_run'));
-- one watchlist entry per name
CREATE UNIQUE INDEX admin_competitor_key_unique ON admin (key) WHERE type = 'competitor';
-- at most one run of an analysis queued or running at a time (duplicate prevention across servers)
CREATE UNIQUE INDEX admin_analysis_active_unique ON admin (key) WHERE type = 'analysis_run' AND status IN ('queued', 'running');
CREATE INDEX admin_analysis_run_idx ON admin (key, created_at DESC) WHERE type = 'analysis_run';
