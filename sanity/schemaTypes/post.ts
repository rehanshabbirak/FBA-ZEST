import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Metadata" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      description: "The /blogs/… URL. Changing it breaks existing links.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "Shown on cards, in the hero, and as the meta description.",
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "coverImage",
      type: "image",
      group: "content",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "date",
      group: "content",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Article body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Paragraph", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    validation: (rule) =>
                      rule.required().uri({
                        scheme: ["http", "https", "mailto"],
                        allowRelative: true,
                      }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: "section" }),
        defineArrayMember({ type: "callout" }),
        defineArrayMember({ type: "checklist" }),
        defineArrayMember({ type: "highlights" }),
      ],
      validation: (rule) => rule.required().min(1),
    }),

    defineField({
      name: "featured",
      type: "boolean",
      group: "meta",
      initialValue: false,
      description:
        "Shows in the large featured slot on the first unfiltered page of /blogs. Only one post should have this.",
    }),
    defineField({
      name: "popularRank",
      title: "Popular rank",
      type: "number",
      group: "meta",
      description:
        "Set to 1, 2, 3… to list this post under Popular Posts in the blog sidebar. Leave empty to omit it.",
      validation: (rule) => rule.min(1).integer(),
    }),
    defineField({
      name: "sectionNoun",
      title: "Section noun",
      type: "string",
      group: "meta",
      description:
        'What this article calls its sections, used by the fold button — "Strategies" gives "Continue Reading (4 More Strategies)". Defaults to "Sections".',
    }),
  ],
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "coverImage",
    },
  },
});
