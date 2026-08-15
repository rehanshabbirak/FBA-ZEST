import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NotFound } from "@/components/layout/NotFound";

export const metadata: Metadata = {
  title: "Page not found",
};

// Reached by URLs that match no route at all. Those render against the root
// layout, which is only the document shell, so the site chrome is repeated
// here rather than inherited from the (site) group.
export default function RootNotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <NotFound />
      </main>
      <Footer />
    </>
  );
}
