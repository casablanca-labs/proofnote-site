import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = (await getCollection("posts", (p) => p.data.published)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: "Proofnote",
    description:
      "Proofnote publishes APNT research and evidence for private note transfer on Bitcoin Cash.",
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.summary,
      link: `${import.meta.env.BASE_URL.replace(/\/$/, "")}/posts/${p.id}/`,
    })),
  });
}
