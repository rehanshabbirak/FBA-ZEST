import { createClient } from "@sanity/client";
import { seedAuthors, seedCategories, seedPosts, type SeedBlock } from "./seed-data";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing config. .env.local needs NEXT_PUBLIC_SANITY_PROJECT_ID, " +
      "NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN (Editor role, " +
      "created at https://sanity.io/manage).",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-01-01",
  useCdn: false,
});

const idFor = (type: string, key: string) =>
  `${type}-${key.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

let keyCounter = 0;
const nextKey = () => `k${(keyCounter += 1).toString(36)}`;

const uploadedByUrl = new Map<string, string>();

async function uploadImage(url: string, label: string): Promise<string> {
  const cached = uploadedByUrl.get(url);
  if (cached) return cached;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${label} (${response.status}): ${url}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename: `${label}.jpg`,
  });

  uploadedByUrl.set(url, asset._id);
  console.log(`  uploaded ${label}`);
  return asset._id;
}

const imageField = (assetId: string) => ({
  _type: "image",
  asset: { _type: "reference", _ref: assetId },
});

function toPortableText(text: string) {
  return {
    _type: "block",
    _key: nextKey(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: nextKey(), text, marks: [] }],
  };
}

function toSanityBlock(block: SeedBlock) {
  switch (block.type) {
    case "paragraph":
      return toPortableText(block.text);
    case "section":
      return { _type: "section", _key: nextKey(), title: block.title };
    case "callout":
      return {
        _type: "callout",
        _key: nextKey(),
        tone: block.tone,
        title: block.title,
        text: block.text,
      };
    case "checklist":
      return { _type: "checklist", _key: nextKey(), items: block.items };
    case "highlights":
      return {
        _type: "highlights",
        _key: nextKey(),
        title: block.title,
        items: block.items.map((item) => ({
          _type: "highlight",
          _key: nextKey(),
          icon: item.icon,
          label: item.label,
        })),
      };
  }
}

async function seed() {
  console.log(`Seeding ${projectId}/${dataset}\n`);

  console.log("Categories…");
  await Promise.all(
    seedCategories.map((category) =>
      client.createOrReplace({
        _id: idFor("category", category.slug),
        _type: "category",
        title: category.title,
        slug: { _type: "slug", current: category.slug },
      }),
    ),
  );
  console.log(`  ${seedCategories.length} categories\n`);

  console.log("Authors…");
  for (const author of seedAuthors) {
    const assetId = await uploadImage(author.avatar, `avatar-${author.name}`);
    await client.createOrReplace({
      _id: idFor("author", author.name),
      _type: "author",
      name: author.name,
      avatar: imageField(assetId),
      role: author.role,
      bio: author.bio,
      linkedin: author.linkedin,
      email: author.email,
    });
  }
  console.log(`  ${seedAuthors.length} authors\n`);

  console.log("Posts…");
  for (const post of seedPosts) {
    const assetId = await uploadImage(post.coverImage, `cover-${post.slug}`);

    await client.createOrReplace({
      _id: idFor("post", post.slug),
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      coverImage: imageField(assetId),
      category: { _type: "reference", _ref: idFor("category", post.category) },
      author: { _type: "reference", _ref: idFor("author", post.author) },
      publishedAt: post.publishedAt,
      featured: post.featured ?? false,
      ...(post.popularRank ? { popularRank: post.popularRank } : {}),
      ...(post.sectionNoun ? { sectionNoun: post.sectionNoun } : {}),
      body: post.body.map(toSanityBlock),
    });

    console.log(`  ${post.slug}`);
  }

  console.log(`\nDone. ${seedPosts.length} posts, ${seedAuthors.length} authors, ${seedCategories.length} categories.`);
  console.log(`Images uploaded: ${uploadedByUrl.size} (deduplicated by source URL).`);
}

seed().catch((error) => {
  console.error("\nSeed failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
