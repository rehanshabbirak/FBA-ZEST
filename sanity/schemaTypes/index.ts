import type { SchemaTypeDefinition } from "sanity";
import { author } from "./author";
import { category } from "./category";
import { post } from "./post";
import { callout, checklist, highlights, section } from "./blocks";

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  author,
  category,
  section,
  callout,
  checklist,
  highlights,
];
