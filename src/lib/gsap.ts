"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    SplitText,
    DrawSVGPlugin,
    MotionPathPlugin,
    // Draggable reads throw velocity from InertiaPlugin; without it registered
    // the `inertia` and `snap` options on a Draggable are silently ignored.
    Draggable,
    InertiaPlugin,
  );

  ScrollTrigger.config({ ignoreMobileResize: true });

  // Temporary: exposes ScrollTrigger to the devtools console in development so
  // trigger positions can be inspected after a client-side navigation.
  if (process.env.NODE_ENV !== "production") {
    (window as unknown as Record<string, unknown>).ScrollTrigger = ScrollTrigger;
  }

  if (document.readyState === "complete") {
    ScrollTrigger.refresh();
  } else {
    window.addEventListener("load", () => ScrollTrigger.refresh(), {
      once: true,
    });
  }
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, Draggable, useGSAP };
