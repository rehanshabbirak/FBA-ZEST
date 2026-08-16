"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type VideoBackgroundProps = {
  src: string;
  poster?: string;
  overlayClassName?: string;
  videoClassName?: string;
};

export function VideoBackground({
  src,
  poster,
  overlayClassName = "bg-black/70",
  videoClassName,
}: VideoBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [ready, setReady] = useState(false);
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const video = videoRef.current;
    if (!host || !video) return;

    video.muted = true;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Evaluated in the callback rather than the effect body: the observer
        // fires immediately on observe(), so this still resolves on the first
        // frame without a synchronous setState cascading a re-render.
        if (prefersReduced.matches || connection?.saveData) {
          setSuppressed(true);
          observer.disconnect();
          return;
        }

        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={hostRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <video
          ref={videoRef}
          src={suppressed ? undefined : src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          controls={false}
          disablePictureInPicture
          onCanPlay={() => setReady(true)}
          className={cn(
            "size-full object-cover transition-opacity duration-700 ease-out-soft",
            ready && !suppressed ? "opacity-100" : "opacity-0",
            videoClassName,
          )}
        />
        <div className={cn("absolute inset-0", overlayClassName)} />
      </div>
    </>
  );
}
