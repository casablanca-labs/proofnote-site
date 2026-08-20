import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Two collections, deliberately parallel. Every post has an evidence page
 * keyed by the same slug, and the post layout links to it. A post whose
 * evidence page is missing is a build error — see src/pages/posts/[...slug].
 */
const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** Shown on the index card and as the page lede. */
    summary: z.string(),
    /** Where the canonical discussion lives, if not here. */
    canonical: z.string().url().optional(),
    /**
     * Set false until the operator has signed off. Drafts never build.
     *
     * NOTE FOR ANYONE CHANGING THIS REPO: with every post false, the post route
     * builds zero pages and `SourceFile` never runs, so a green build does not
     * exercise transclusion at all. Publish one temporarily when verifying.
     * See README, "Verify with a post published, not with an empty site".
     */
    published: z.boolean().default(false),
    settlement: z
      .object({ ins: z.number(), outs: z.number(), sealed: z.number() })
      .optional(),
  }),
});

const evidence = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/evidence" }),
  schema: z.object({
    title: z.string(),
    /** Slug of the post this evidence backs. */
    post: z.string(),
    /** Date this published evidence boundary was last reviewed. */
    reviewed: z.coerce.date(),
  }),
});

export const collections = { posts, evidence };
