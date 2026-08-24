import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { SidebarPanel } from "@/components/blog/SidebarPanel";
import type { BlogAuthor } from "@/lib/content/blog";

export function AuthorPanel({ author }: { author: BlogAuthor }) {
  return (
    <SidebarPanel title="About the Author">
      <div className="mt-4 flex items-center gap-3.5">
        <Avatar name={author.name} src={author.avatar} size={52} />
        <div className="min-w-0">
          <p className="text-[0.875rem] font-bold text-ink">{author.name}</p>
          <p className="mt-0.5 text-[0.75rem] text-teal-600">{author.role}</p>
        </div>
      </div>

      <p className="mt-4 text-[0.78125rem] leading-[1.7] text-muted">{author.bio}</p>

      <div className="mt-4 flex gap-2">
        <a
          href={author.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${author.name} on LinkedIn`}
          className="flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-teal-400 hover:text-teal-600"
        >
          <Icon name="linkedin" size={16} />
        </a>
        <a
          href={`mailto:${author.email}`}
          aria-label={`Email ${author.name}`}
          className="flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-teal-400 hover:text-teal-600"
        >
          <Icon name="mail" size={16} />
        </a>
      </div>
    </SidebarPanel>
  );
}
