import { Fragment, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Link2, MessageCircle, AlertTriangle } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { blogCategories, type BlogBlock } from "@/data/blog";
import { trips } from "@/data/trips";
import { getVisiblePosts } from "@/seo/routes";
import { absoluteUrl } from "@/config/site";
import NotFound from "@/pages/NotFound";
import { formatArticleDate } from "@/utils/format";

/** Renders inline [label](/path) links; internal paths use the router. */
function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, label, href] = m;
    parts.push(
      href.startsWith("/") ? (
        <Link key={m.index} to={href} className="font-semibold text-saffron-700 underline underline-offset-2">
          {label}
        </Link>
      ) : (
        <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-saffron-700 underline underline-offset-2">
          {label}
        </a>
      )
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 font-display text-2xl font-bold text-charcoal">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-6 font-display text-lg font-bold text-charcoal">{block.text}</h3>;
    case "p":
      return <p className="mt-4 leading-relaxed text-charcoal/80">{inline(block.text)}</p>;
    case "ul":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-charcoal/80">
          {block.items.map((item, i) => (
            <li key={i}>{inline(item)}</li>
          ))}
        </ul>
      );
    case "note":
      return <p className="mt-4 rounded-xl border-l-4 border-gold bg-gold/10 p-4 text-sm text-charcoal/80">{inline(block.text)}</p>;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const { t, language } = useI18n();
  const pick = useLocalized();
  const [copied, setCopied] = useState(false);

  const posts = getVisiblePosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <NotFound />;

  const url = absoluteUrl(`/blog/${post.slug}`);
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedTrips = trips.filter((tr) => post.relatedTrips.includes(tr.slug));

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — ignore.
    }
  }

  return (
    <article className="bg-ivory">
      {post.status === "draft" && (
        <div role="note" className="flex items-center justify-center gap-2 bg-red-700 px-4 py-2 text-center text-xs font-bold text-white">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {t.blog.draftBanner}
        </div>
      )}

      <header className="container-px mx-auto max-w-3xl pb-6 pt-10 sm:pt-14">
        <span className="text-xs font-bold uppercase tracking-wide text-saffron-600">{blogCategories[post.category]}</span>
        <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg text-charcoal/65">{post.description}</p>
        <p className="mt-5 text-sm text-charcoal/70">
          {t.blog.by} <span className="font-semibold text-charcoal/80">{post.author.name}</span>, {post.author.title}
        </p>
        <p className="mt-1 text-xs text-charcoal/70">
          {t.blog.published} <time dateTime={post.datePublished}>{formatArticleDate(post.datePublished, language)}</time>
          {post.dateModified !== post.datePublished && (
            <>
              {" · "}
              {t.blog.updated} <time dateTime={post.dateModified}>{formatArticleDate(post.dateModified, language)}</time>
            </>
          )}
        </p>
        {language === "mr" && <p className="mt-3 text-xs italic text-charcoal/70">{t.blog.englishOnly}</p>}
      </header>

      <div className="container-px mx-auto max-w-4xl">
        <img
          src={post.image.src}
          alt={post.image.alt}
          width={1200}
          height={675}
          fetchPriority="high"
          className="aspect-video w-full rounded-2xl object-cover shadow-card"
        />
      </div>

      <div className="container-px mx-auto max-w-3xl pb-10" lang="en">
        {post.body.map((block, i) => (
          <Fragment key={i}>
            <Block block={block} />
          </Fragment>
        ))}

        <div className="mt-10 rounded-2xl bg-charcoal p-6 text-white sm:p-8">
          <p className="font-display text-lg font-bold">{t.blog.planCta}</p>
          <Link to="/contact" className="btn-primary mt-4">
            {t.nav.enquireNow}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
          <span className="font-semibold text-charcoal/70">{t.blog.share}:</span>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#1877F2] px-4 py-2 font-semibold text-white"
          >
            Facebook
          </a>
          <button type="button" onClick={copyLink} className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/15 bg-white px-4 py-2 font-semibold text-charcoal">
            <Link2 className="h-4 w-4" />
            <span aria-live="polite">{copied ? t.blog.copied : t.blog.copyLink}</span>
          </button>
        </div>

        {relatedTrips.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold text-charcoal">{t.blog.relatedYatras}</h2>
            <ul className="mt-4 space-y-2">
              {relatedTrips.map((trip) => (
                <li key={trip.slug}>
                  <Link to={`/yatras/${trip.slug}`} className="inline-flex items-center gap-1.5 font-semibold text-saffron-700 hover:text-saffron-800">
                    {pick(trip.title)}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold text-charcoal">{t.blog.relatedArticles}</h2>
            <ul className="mt-4 space-y-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="font-semibold text-saffron-700 hover:text-saffron-800">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
