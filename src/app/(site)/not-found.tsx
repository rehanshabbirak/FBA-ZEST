import type { Metadata } from "next";
import { NotFound } from "@/components/layout/NotFound";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function SiteNotFound() {
  return <NotFound />;
}
