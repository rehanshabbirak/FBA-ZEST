"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Icon } from "@/components/ui/Icon";
import { useArticleReader } from "@/components/blog/ArticleReader";
import {
  headingId,
  SECTIONS_BEFORE_FOLD,
  type ArticleBlock,
  type ArticleParagraph,
} from "@/lib/content/blog-article";
import { cn } from "@/lib/cn";

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm leading-[1.75] text-muted">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    link: ({ children, value }) => {
      const href = String(value?.href ?? "");
      const isExternal = /^https?:\/\//.test(href);

      return (
        <a
          href={href}
          {...(isExternal
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
          className="font-medium text-teal-600 underline underline-offset-2 transition-colors duration-200 hover:text-teal-500"
        >
          {children}
        </a>
      );
    },
  },
};

const calloutTones = {
  tip: {
    icon: "lightbulb",
    box: "border-teal-100 bg-teal-50",
  },
  benefit: {
    icon: "shield-check",
    box: "border-line bg-surface",
  },
} as const;

function Block({ block, number }: { block: ArticleBlock; number: number }) {
  switch (block.type) {
    case "section":
      return (
        <h2
          id={headingId(block.title)}
          className="scroll-mt-28 pt-3 text-[1.1875rem] leading-snug font-bold text-ink lg:text-xl"
        >
          <span className="text-teal-600">{number}.</span> {block.title}
        </h2>
      );

    case "block":
      return (
        <PortableText
          value={block as ArticleParagraph}
          components={portableTextComponents}
        />
      );

    case "callout": {
      const tone = calloutTones[block.tone];
      return (
        <div
          className={cn("flex gap-3.5 rounded-lg border p-4 lg:p-5", tone.box)}
        >
          <Icon
            name={tone.icon}
            size={20}
            strokeWidth={1.7}
            className="mt-0.5 shrink-0 text-teal-600"
          />
          <div>
            <p className="text-[0.84375rem] font-bold text-ink">{block.title}:</p>
            <p className="mt-1 text-[0.84375rem] leading-[1.7] text-muted">
              {block.text}
            </p>
          </div>
        </div>
      );
    }

    case "checklist":
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
                <Icon name="check" size={11} strokeWidth={3} />
              </span>
              <span className="text-[0.84375rem] leading-[1.65] text-muted">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );

    case "highlights":
      return (
        <div className="rounded-lg border border-line bg-white p-5 shadow-card lg:p-6">
          <p className="text-[0.875rem] font-bold text-ink">{block.title}:</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {block.items.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-[0.625rem] bg-teal-50 text-teal-600">
                  <Icon name={item.icon} size={17} strokeWidth={1.7} />
                </span>
                <span className="text-[0.78125rem] leading-snug font-medium text-muted">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

function numbered(blocks: ArticleBlock[], startNumber: number) {
  let section = startNumber;

  return blocks.map((block) => {
    if (block.type === "section") section += 1;
    return { block, number: section };
  });
}

function Blocks({
  blocks,
  startNumber,
}: {
  blocks: ArticleBlock[];
  startNumber: number;
}) {
  return (
    <>
      {numbered(blocks, startNumber).map((entry, index) => (
        <Block key={index} block={entry.block} number={entry.number} />
      ))}
    </>
  );
}

export function ArticleBody({
  blocks,
  sectionNoun,
}: {
  blocks: ArticleBlock[];
  sectionNoun: string;
}) {
  const { expanded, expand } = useArticleReader();

  const sectionStarts = blocks.reduce<number[]>((acc, block, index) => {
    if (block.type === "section") acc.push(index);
    return acc;
  }, []);

  const foldAt = sectionStarts[SECTIONS_BEFORE_FOLD] ?? blocks.length;
  const foldedSections = Math.max(
    0,
    sectionStarts.length - SECTIONS_BEFORE_FOLD,
  );
  const hasFold = foldAt < blocks.length;

  return (
    <div className="flex flex-col gap-5">
      <Blocks blocks={blocks.slice(0, foldAt)} startNumber={0} />

      {hasFold ? (
        <>
          <div
            inert={!expanded}
            className={cn(
              "flex flex-col gap-5",
              expanded ? "hero-fade" : "max-h-0 overflow-hidden",
            )}
          >
            <Blocks
              blocks={blocks.slice(foldAt)}
              startNumber={SECTIONS_BEFORE_FOLD}
            />
          </div>

          {expanded ? null : (
            <button
              suppressHydrationWarning
              type="button"
              onClick={expand}
              className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[0.625rem] border border-line-strong bg-white text-[0.875rem] font-semibold text-teal-600 transition-colors duration-200 ease-out-soft hover:border-teal-400 hover:bg-teal-50 sm:w-auto sm:self-center sm:px-8"
            >
              Continue Reading ({foldedSections} More {sectionNoun})
              <Icon name="arrow-down" size={16} />
            </button>
          )}
        </>
      ) : null}
    </div>
  );
}
