import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { StaticImageData } from "next/image";

interface NewsCardProps {
  title: string;
  date: string;
  imageSrc: string;
  excerpt: string;
  href: string;
}

export function NewsCard({ title, date, imageSrc, excerpt, href }: NewsCardProps) {
  return (
    <article className="bg-background border border-border p-5 flex flex-col h-full hover:border-forest hover:shadow-md transition-all group">
      <div className="text-xs text-muted-foreground tracking-wider mb-2 uppercase">{date}</div>
      <h3 className="font-serif text-xl mb-4 leading-snug group-hover:text-forest transition-colors line-clamp-2">
        <Link href={href} className="before:absolute before:inset-0 relative">
          {title}
        </Link>
      </h3>
      <div className="aspect-[4/3] overflow-hidden mb-4 shrink-0 relative">
        <img src={imageSrc} alt={title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">{excerpt}</p>
      <Link href={href} className="flex items-center gap-2 text-sm font-medium hover:text-forest transition-colors mt-auto relative z-10">
        Learn More <ArrowRight className="w-4 h-4" />
      </Link>
    </article>
  );
}
