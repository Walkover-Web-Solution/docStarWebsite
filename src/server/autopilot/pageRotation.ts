// Which editable pages' full content the autopilot sends each run. Home is always included;
// other pages rotate so the AI message stays under MAX_MESSAGE_CHARS (run.ts).

export const AUTOPILOT_HOME_SLUG = "home";
/** How many non-home editable pages get full content per run (deterministic by day). */
export const ROTATING_PAGES_PER_DAY = 2;

/** UTC midnight-aligned day index for deterministic rotation across runs. */
export function rotationDayIndex(at = new Date()): number {
  return Math.floor(at.getTime() / 86_400_000);
}

/**
 * Slugs that receive full page content in this run: home, any page with a running A/B test,
 * plus today's slice of the other editable pages.
 */
export function slugsWithFullContent(editableSlugs: string[], runningSlugs: readonly string[], dayIndex: number, perDay = ROTATING_PAGES_PER_DAY): string[] {
  const running = new Set(runningSlugs);
  const withContent = new Set<string>([AUTOPILOT_HOME_SLUG, ...running]);
  const rotatable = editableSlugs.filter((s) => s !== AUTOPILOT_HOME_SLUG && !running.has(s)).sort();
  if (!rotatable.length) return [...withContent].sort();
  const start = (dayIndex * perDay) % rotatable.length;
  for (let i = 0; i < perDay; i++) withContent.add(rotatable[(start + i) % rotatable.length]!);
  return [...withContent].sort();
}
