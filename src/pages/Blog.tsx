import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { blogCategories } from "@/data/blog";
import { getVisiblePosts } from "@/data/blog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatArticleDate } from "@/utils/format";

export default function Blog() {
  const { t, language } = useI18n();
  const posts = getVisiblePosts();

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading as="h1" eyebrow="GuruPriya Travels" title={t.blog.title} subtitle={t.blog.subtitle} />

        {posts.length === 0 ? (
          <p className="rounded-2xl bg-white p-10 text-center text-charcoal/70">{t.blog.empty}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="card-premium flex flex-col overflow-hidden">
                <img
                  src={post.image.src}
                  alt={post.image.alt}
                  loading="lazy"
                  width={640}
                  height={360}
                  className="aspect-video w-full object-cover"
                />
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <span className="text-xs font-bold uppercase tracking-wide text-saffron-600">
                    {blogCategories[post.category]}
                    {post.status === "draft" && <span className="ml-2 rounded bg-red-100 px-1.5 py-0.5 text-red-700">Draft</span>}
                  </span>
                  <h2 className="font-display text-lg font-bold leading-snug text-charcoal">
                    <Link to={`/blog/${post.slug}`} className="hover:text-saffron-700">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-charcoal/65">{post.description}</p>
                  <p className="mt-auto pt-3 text-xs text-charcoal/70">
                    <time dateTime={post.datePublished}>{formatArticleDate(post.datePublished, language)}</time>
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-saffron-600 hover:text-saffron-700"
                    aria-label={`${t.blog.readGuide}: ${post.title}`}
                  >
                    {t.blog.readGuide}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
