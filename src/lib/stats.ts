export type Stat = {
  key: "brands" | "revenue" | "marketplaces" | "satisfaction";
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const agencyStats: Stat[] = [
  { key: "brands", value: 100, suffix: "+", label: "Brands Managed" },
  {
    key: "revenue",
    value: 50,
    prefix: "$",
    suffix: "M+",
    label: "Revenue Generated",
  },
  { key: "marketplaces", value: 10, suffix: "+", label: "Marketplaces" },
  { key: "satisfaction", value: 98, suffix: "%", label: "Client Satisfaction" },
];
