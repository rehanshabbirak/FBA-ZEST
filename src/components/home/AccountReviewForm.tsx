"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  submitAccountReview,
  type AccountReviewState,
} from "@/app/(site)/contact/actions";
import { cn } from "@/lib/cn";

// Lives here, not in actions.ts: a "use server" module may only export async
// functions, so a plain object export arrives as undefined at runtime.
const initialState: AccountReviewState = {
  status: "idle",
  message: "",
  errors: {},
};

const bands = ["Under $50K", "$50K–$150K", "$150K–$500K", "$500K+"];

const labelClass =
  "block text-[0.6875rem] font-bold tracking-[0.14em] whitespace-nowrap text-white/45 uppercase";

const fieldClass =
  "mt-1.5 h-9 w-full bg-transparent text-[0.875rem] text-white outline-none placeholder:text-white/35";

type RevenueSelectProps = {
  name: string;
  labelId: string;
  invalid: boolean;
  describedBy?: string;
};

function RevenueSelect({
  name,
  labelId,
  invalid,
  describedBy,
}: RevenueSelectProps) {
  const id = useId();
  const scope = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!scope.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const choose = (band: string) => {
    setValue(band);
    setOpen(false);
  };

  const reveal = () => {
    setOpen(true);
    setActive(Math.max(0, bands.indexOf(value)));
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        if (!open) {
          reveal();
          return;
        }
        const step = event.key === "ArrowDown" ? 1 : -1;
        setActive((i) => (i + step + bands.length) % bands.length);
        return;
      }
      case "Enter":
      case " ": {
        // Enter would otherwise submit the form from inside the open list.
        event.preventDefault();
        if (open) choose(bands[active]);
        else reveal();
        return;
      }
      case "Home":
      case "End": {
        if (!open) return;
        event.preventDefault();
        setActive(event.key === "Home" ? 0 : bands.length - 1);
        return;
      }
      case "Escape": {
        if (!open) return;
        event.preventDefault();
        setOpen(false);
        return;
      }
      case "Tab": {
        setOpen(false);
      }
    }
  };

  return (
    <div ref={scope} className="relative">
      <input suppressHydrationWarning type="hidden" name={name} value={value} />

      <button
        suppressHydrationWarning
        type="button"
        role="combobox"
        aria-controls={`${id}-list`}
        aria-expanded={open}
        aria-labelledby={labelId}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : reveal())}
        onKeyDown={onKeyDown}
        className={cn(
          fieldClass,
          "flex items-center justify-between gap-2 text-left",
          !value && "text-white/35",
        )}
      >
        {value || "Select a range"}
        <Icon
          name="chevron-down"
          size={16}
          aria-hidden="true"
          className={cn(
            "shrink-0 text-white/45 transition-transform duration-200 ease-out-soft",
            open && "rotate-180",
          )}
        />
      </button>

      <ul
        id={`${id}-list`}
        role="listbox"
        aria-labelledby={labelId}
        className={cn(
          "absolute top-full right-0 left-0 z-50 mt-2 rounded-[0.875rem] border border-white/10 bg-black p-2 shadow-[0_1.5rem_3rem_-0.75rem_rgba(0,0,0,0.85)] transition duration-200 ease-out-soft",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0",
        )}
      >
        {bands.map((band, index) => {
          const selected = band === value;

          return (
            <li key={band}>
              <div
                id={`${id}-opt-${index}`}
                role="option"
                aria-selected={selected}
                onPointerEnter={() => setActive(index)}
                onClick={() => choose(band)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-[0.625rem] px-3 py-2.5 text-[0.875rem] font-medium transition-colors duration-200",
                  selected ? "text-teal-300" : "text-white/80",
                  open && index === active && "bg-white/8 text-white",
                )}
              >
                {band}
                {selected ? (
                  <Icon
                    name="check"
                    size={14}
                    strokeWidth={3}
                    aria-hidden="true"
                    className="shrink-0 text-teal-400"
                  />
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function AccountReviewForm() {
  const [state, formAction, isPending] = useActionState(
    submitAccountReview,
    initialState,
  );

  const hasFieldError = Boolean(state.errors.email || state.errors.revenue);

  return (
    <form action={formAction} className="mt-10 lg:mt-12" noValidate>
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="hp_reference_cta">Reference</label>
        <input
          suppressHydrationWarning
          id="hp_reference_cta"
          name="hp_reference"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid w-full gap-4 rounded-xl border border-white/12 bg-white/5 p-4 text-left backdrop-blur-md sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end sm:gap-0 sm:p-3 sm:pl-6">
        <div className="sm:pr-6">
          <label htmlFor="cta-email" className={labelClass}>
            Work email
          </label>
          <input
            suppressHydrationWarning
            id="cta-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@yourbrand.com"
            aria-invalid={Boolean(state.errors.email)}
            aria-describedby={
              state.errors.email ? "cta-email-error" : undefined
            }
            className={fieldClass}
          />
        </div>

        <div className="sm:border-l sm:border-white/12 sm:px-6">
          <span id="cta-revenue-label" className={labelClass}>
            Monthly Amazon revenue
          </span>
          <RevenueSelect
            name="revenue"
            labelId="cta-revenue-label"
            invalid={Boolean(state.errors.revenue)}
            describedBy={state.errors.revenue ? "cta-revenue-error" : undefined}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          icon="arrow-up-right"
          disabled={isPending}
          className="w-full sm:w-auto"
        >
          {isPending ? "Sending…" : "Request an account review"}
        </Button>
      </div>

      <div aria-live="polite">
        {state.errors.email ? (
          <p id="cta-email-error" className="mt-3 text-[0.8125rem] text-error">
            {state.errors.email}
          </p>
        ) : null}

        {state.errors.revenue ? (
          <p id="cta-revenue-error" className="mt-1.5 text-[0.8125rem] text-error">
            {state.errors.revenue}
          </p>
        ) : null}

        {state.status !== "idle" && !hasFieldError ? (
          <p
            className={cn(
              "mt-3 text-[0.84375rem]",
              state.status === "success" ? "text-teal-300" : "text-error",
            )}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
