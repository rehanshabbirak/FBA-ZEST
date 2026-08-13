"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

type TypewriterProps = {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
  startDelay?: number;
  loop?: boolean;
  className?: string;
};

export function Typewriter({
  words,
  typeSpeed = 55,
  deleteSpeed = 30,
  holdTime = 1800,
  startDelay = 0,
  loop = false,
  className,
}: TypewriterProps) {
  const [typed, setTyped] = useState("");
  const [finished, setFinished] = useState(false);

  const wordsKey = JSON.stringify(words);
  const phrases = useMemo<string[]>(() => JSON.parse(wordsKey), [wordsKey]);

  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    if (phrases.length === 0) return;

    let timer = 0;
    let cancelled = false;
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const schedule = (fn: () => void, ms: number) => {
      timer = window.setTimeout(fn, ms);
    };

    const tick = () => {
      if (cancelled) return;
      const word = phrases[wordIndex];

      if (deleting) {
        charIndex -= 1;
        setTyped(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % phrases.length;
        }
        schedule(tick, deleteSpeed);
        return;
      }

      charIndex += 1;
      setTyped(word.slice(0, charIndex));

      if (charIndex < word.length) {
        schedule(tick, typeSpeed);
        return;
      }

      if (!loop && wordIndex === phrases.length - 1) {
        setFinished(true);
        return;
      }
      deleting = true;
      schedule(tick, holdTime);
    };

    const start = () => {
      if (cancelled) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setTyped(phrases[0]);
        setFinished(true);
        return;
      }
      tick();
    };

    schedule(start, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [phrases, typeSpeed, deleteSpeed, holdTime, startDelay, loop]);

  return (
    <span className={cn("grid", className)}>
      <span
        aria-hidden="true"
        className="invisible col-start-1 row-start-1 select-none"
      >
        {longest}
      </span>

      <span aria-hidden="true" className="col-start-1 row-start-1">
        {typed}
        <span
          className={cn(
            "ml-[0.06em] inline-block h-[0.82em] w-[0.055em] translate-y-[0.04em] bg-current",
            finished && !loop ? "animate-caret-retire" : "animate-caret-blink",
          )}
        />
      </span>

      <span className="sr-only">{phrases[0]}</span>
    </span>
  );
}
