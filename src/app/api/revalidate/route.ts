import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { BLOG_TAG } from "@/sanity/client";

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return Response.json(
      { message: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 },
    );
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      request,
      secret,
    );

    if (!isValidSignature) {
      return Response.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return Response.json({ message: "Bad request body" }, { status: 400 });
    }

    revalidateTag(BLOG_TAG, "max");

    return Response.json({ revalidated: true, tag: BLOG_TAG, type: body._type });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ message }, { status: 500 });
  }
}
