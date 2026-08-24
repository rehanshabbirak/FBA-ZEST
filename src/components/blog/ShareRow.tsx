"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

type ShareRowProps = {
  url: string;
  title: string;
};

export function ShareRow({ url, title }: ShareRowProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const targets: { label: string; icon: IconName; href: string }[] = [
    {
      label: "Share on Facebook",
      icon: "facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "Share on X",
      icon: "twitter-x",
      href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Share on LinkedIn",
      icon: "linkedin",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="text-[0.8125rem] font-bold text-ink">Share this article</span>

      <ul className="flex items-center gap-2">
        {targets.map((target) => (
          <li key={target.label}>
            <a
              href={target.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={target.label}
              className="flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-teal-400 hover:text-teal-600"
            >
              <Icon name={target.icon} size={15} />
            </a>
          </li>
        ))}
        <li>
          <button
            suppressHydrationWarning
            type="button"
            aria-label={copied ? "Link copied" : "Copy link"}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
              } catch {}
            }}
            className="flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-teal-400 hover:text-teal-600"
          >
            <Icon name={copied ? "check" : "link"} size={15} />
          </button>
        </li>
      </ul>

      <span role="status" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
