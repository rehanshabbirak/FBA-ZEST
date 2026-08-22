export type ProofMetric = {
  id: string;
  /** Shown on the toggle. */
  label: string;
  /** Names what the line is measuring, under the chart. */
  caption: string;
  prefix: string;
  suffix: string;
  /** Twelve readings before the handover and twelve after it. */
  before: number[];
  after: number[];
  /** ACOS and ad spend improve by falling, so the trend colour cannot simply
   *  follow the slope of the line. */
  improvesDownward: boolean;
  /** Headline change, already rounded for display. */
  delta: string;
};

/**
 * PLACEHOLDER FIGURES — these are invented for layout and must be replaced with
 * real account data before this section goes live. The copy above the chart
 * presents them as one client's actual before/after, so shipping them as-is
 * would be a fabricated performance claim.
 */
export const proofMetrics: ProofMetric[] = [
  {
    id: "sales",
    label: "Sales",
    caption: "Monthly sales",
    prefix: "$",
    suffix: "K",
    before: [46, 49, 47, 51, 48, 50, 49, 52, 50, 48, 51, 50],
    after: [53, 58, 64, 69, 78, 85, 92, 101, 110, 118, 126, 134],
    improvesDownward: false,
    delta: "+168%",
  },
  {
    id: "acos",
    label: "ACOS",
    caption: "Blended ACOS across the ad account",
    prefix: "",
    suffix: "%",
    before: [
      34.2, 35.1, 34.6, 35.8, 34.9, 35.4, 36.1, 35.2, 35.9, 36.4, 35.7, 36.2,
    ],
    after: [
      35.0, 33.4, 31.8, 30.1, 28.6, 26.9, 25.4, 23.8, 22.5, 21.2, 20.1, 18.9,
    ],
    improvesDownward: true,
    delta: "−48%",
  },
  {
    id: "adSpend",
    label: "Ad Spend",
    caption: "Monthly ad spend",
    prefix: "$",
    suffix: "K",
    before: [
      14.2, 14.8, 14.4, 15.1, 14.6, 15.0, 14.7, 15.3, 14.9, 15.2, 14.8, 15.1,
    ],
    after: [
      14.9, 14.2, 13.5, 12.8, 12.2, 11.6, 11.1, 10.6, 10.2, 9.8, 9.5, 9.2,
    ],
    improvesDownward: true,
    delta: "−39%",
  },
];
