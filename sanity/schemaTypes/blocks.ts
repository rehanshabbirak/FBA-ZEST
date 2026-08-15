import { defineArrayMember, defineField, defineType } from "sanity";
import { iconNames } from "../../src/components/ui/Icon";

export const section = defineType({
  name: "section",
  title: "Section heading",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "Section heading" }),
  },
});

export const callout = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      type: "string",
      initialValue: "tip",
      options: {
        list: [
          { title: "Pro Tip (lightbulb)", value: "tip" },
          { title: "Key Benefit (shield)", value: "benefit" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      description: 'Rendered with a colon, e.g. "Pro Tip" becomes "Pro Tip:".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "text" },
  },
});

export const checklist = defineType({
  name: "checklist",
  title: "Checklist",
  type: "object",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: `Checklist (${items?.length ?? 0} items)`,
      subtitle: items?.[0],
    }),
  },
});

export const highlights = defineType({
  name: "highlights",
  title: "Highlights grid",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: 'Rendered with a colon, e.g. "Focus On" becomes "Focus On:".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "highlight",
          fields: [
            defineField({
              name: "icon",
              type: "string",
              options: { list: iconNames.map((name) => ({ title: name, value: name })) },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "icon" },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).max(4),
    }),
  ],
  preview: {
    select: { title: "title", items: "items" },
    prepare: ({ title, items }) => ({
      title,
      subtitle: `Highlights grid (${items?.length ?? 0} items)`,
    }),
  },
});
