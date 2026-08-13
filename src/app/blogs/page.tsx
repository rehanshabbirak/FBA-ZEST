import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Blogs" };

export default function BlogsPage() {
  return (
    <PagePlaceholder
      eyebrow="Insights"
      title="Insights That Drive Amazon Growth"
      description="Featured articles, category filters and the three-column grid — this page is next in the build queue."
    />
  );
}
