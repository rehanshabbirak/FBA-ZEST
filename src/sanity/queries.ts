import { defineQuery } from "next-sanity";

const POST_FIELDS = /* groq */ `
  "slug": slug.current,
  title,
  excerpt,
  "category": category->slug.current,
  "categoryTitle": category->title,
  "coverImage": coverImage.asset->url,
  author->{
    name,
    "avatar": avatar.asset->url,
    role,
    bio,
    linkedin,
    email
  },
  publishedAt,
  featured,
  popularRank
`;

const BODY_FIELDS = /* groq */ `
  body[]{
    ...,
    "type": _type,
    markDefs[]{...}
  }
`;

export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    "slug": slug.current,
    title
  }
`);

export const categoryCountsQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    "slug": slug.current,
    title,
    "count": count(*[_type == "post" && references(^._id)])
  }
`);

export const allPostSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)].slug.current
`);

export const featuredPostQuery = defineQuery(`
  *[_type == "post" && featured == true] | order(publishedAt desc)[0] {
    ${POST_FIELDS}
  }
`);

export const popularPostsQuery = defineQuery(`
  *[_type == "post" && defined(popularRank)] | order(popularRank asc) {
    ${POST_FIELDS}
  }
`);

export const archivePostsQuery = defineQuery(`
  *[
    _type == "post"
    && featured != true
    && ($category == "all" || category->slug.current == $category)
    && (
      $query == ""
      || title match $query + "*"
      || excerpt match $query + "*"
    )
  ] | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_FIELDS},
    "sectionNoun": coalesce(sectionNoun, "Sections"),
    ${BODY_FIELDS}
  }
`);

export const relatedPostsQuery = defineQuery(`
  *[_type == "post" && slug.current != $slug]
    | order(select(category->slug.current == $category => 0, 1) asc, publishedAt desc)
    [0...$limit] {
      ${POST_FIELDS}
    }
`);

export const nextPostQuery = defineQuery(`
  *[
    _type == "post"
    && (
      publishedAt < $publishedAt
      || (publishedAt == $publishedAt && slug.current > $slug)
    )
  ] | order(publishedAt desc, slug.current asc)[0] {
    ${POST_FIELDS}
  }
`);

export const previousPostQuery = defineQuery(`
  *[
    _type == "post"
    && (
      publishedAt > $publishedAt
      || (publishedAt == $publishedAt && slug.current < $slug)
    )
  ] | order(publishedAt asc, slug.current desc)[0] {
    ${POST_FIELDS}
  }
`);
