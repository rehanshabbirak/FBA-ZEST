"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type VideoBackgroundProps = {
  src: string;
  poster?: string;
  overlayClassName?: string;
  videoClassName?: string;
  label?: string;
};

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
      <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
    </svg>
  );
}

export function VideoBackground({
  src,
  poster,
  overlayClassName = "bg-black/70",
  videoClassName,
  label = "Background video",
}: VideoBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
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
        if (prefersReduced.matches || connection?.saveData) {
          setSuppressed(true);
          observer.disconnect();
          return;
        }

        if (entry.isIntersecting) {
          if (userPausedRef.current) return;
          video
            .play()
            .then(() => setPlaying(true))
            .catch(() => setPlaying(false));
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      userPausedRef.current = false;
      video
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      userPausedRef.current = true;
      video.pause();
      setPlaying(false);
    }
  };

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

      {ready && !suppressed ? (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
          className="absolute right-5 bottom-5 z-20 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/70 backdrop-blur-sm transition-colors duration-200 hover:border-white/40 hover:text-white"
        >
          {playing ? <PauseGlyph /> : <PlayGlyph />}
        </button>
      ) : null}
    </>
  );
}
