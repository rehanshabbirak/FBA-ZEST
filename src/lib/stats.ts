export type Stat = {
  key: "salesGrowth" | "ppcSales" | "acos" | "buyBox";
  value: number;
  prefix?: string;
  suffix?: string;
  /** Fractional digits to render; the source figures are not all whole. */
  decimals?: number;
  label: string;
};

/**
 * Reported results from managed accounts, taken from the FBA Zest agency
 * profile. These are individual client outcomes rather than agency averages —
 * the labels say "client" so the figures are not read as typical results.
 */
export const agencyStats: Stat[] = [
  {
    key: "salesGrowth",
    value: 242,
    prefix: "+",
    suffix: "%",
    label: "Client Sales Growth",
  },
  {
    key: "ppcSales",
    value: 63.6,
    prefix: "+",
    suffix: "%",
    decimals: 1,
    label: "PPC Sales Increase",
  },
  { key: "acos", value: 45, suffix: "%", label: "ACOS Reduction" },
  {
    key: "buyBox",
    value: 95.23,
    suffix: "%",
    decimals: 2,
    label: "Buy Box Won",
  },
];
