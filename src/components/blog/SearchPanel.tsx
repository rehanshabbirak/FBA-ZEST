import { Icon } from "@/components/ui/Icon";
import { SidebarPanel } from "@/components/blog/SidebarPanel";

type SearchPanelProps = {
  category?: string;
  query?: string;
};

export function SearchPanel({ category, query }: SearchPanelProps) {
  return (
    <SidebarPanel title="Search Articles">
      <form action="/blogs" className="mt-4 flex gap-2">
        {category && category !== "all" ? (
          <input
            suppressHydrationWarning
            type="hidden"
            name="category"
            value={category}
          />
        ) : null}
        <input
          suppressHydrationWarning
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search blog posts..."
          aria-label="Search blog posts"
          className="h-11 min-w-0 flex-1 rounded-[0.625rem] border border-line bg-white px-3.5 text-[0.84375rem] text-ink transition-colors duration-200 outline-none placeholder:text-subtle focus:border-teal-400"
        />
        <button
          suppressHydrationWarning
          type="submit"
          aria-label="Search"
          className="flex size-11 shrink-0 items-center justify-center rounded-[0.625rem] bg-teal-500 text-white transition-colors duration-200 hover:bg-teal-400"
        >
          <Icon name="search" size={18} />
        </button>
      </form>
    </SidebarPanel>
  );
}
