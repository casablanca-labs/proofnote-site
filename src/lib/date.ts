/**
 * Frontmatter dates are bare `YYYY-MM-DD`, which parse as UTC midnight. Format
 * them in UTC too — otherwise a reader west of Greenwich sees every post dated
 * a day early, which on a site about verifiable claims is a bad first
 * impression.
 */
export const fmtDate = (d: Date): string =>
  d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export const daysSince = (d: Date): number =>
  Math.floor((Date.now() - d.valueOf()) / 86_400_000);
