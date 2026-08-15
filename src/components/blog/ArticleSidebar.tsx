import { SearchPanel } from "@/components/blog/SearchPanel";
import { AuthorPanel } from "@/components/blog/AuthorPanel";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { RelatedPanel } from "@/components/blog/RelatedPanel";
import type { ArticleHeading } from "@/lib/content/blog-article";
import type { BlogPost } from "@/lib/content/blog";

type ArticleSidebarProps = {
  post: BlogPost;
  headings: ArticleHeading[];
  related: BlogPost[];
};

export function ArticleSidebar({ post, headings, related }: ArticleSidebarProps) {
  return (
    <aside className="flex flex-col gap-6">
      <SearchPanel />
      <AuthorPanel author={post.author} />
      <ArticleToc headings={headings} />
      <RelatedPanel posts={related} />
    </aside>
  );
}
