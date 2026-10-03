import { PortableText } from "@portabletext/react";
import { useMemo } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface RichTextRendererProps {
  content: any;
  className?: string;
}

function containsHTML(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text);
}

function getImageUrl(value: any): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (value.src) return value.src;
  if (value.url) return value.url;
  if (value.image?.asset?.url) return value.image.asset.url;
  if (value.asset?.url) return value.asset.url;
  if (value.image) {
    try {
      return urlFor(value.image).url();
    } catch {
      // ignore
    }
  }
  if (value.asset?._ref || value._ref) {
    try {
      return urlFor(value).url();
    } catch {
      // ignore
    }
  }
  return null;
}

export default function RichTextRenderer({ content, className }: RichTextRendererProps) {
  const renderContent = useMemo(() => {
    if (!content) return null;

    // 1. If content is a plain string or HTML string
    if (typeof content === "string") {
      if (containsHTML(content)) {
        return <div dangerouslySetInnerHTML={{ __html: content }} />;
      }
      return <p className="mb-6 leading-relaxed text-gray-800 text-[16px]">{content}</p>;
    }

    // 2. If content is an array
    if (Array.isArray(content) && content.length > 0) {
      // Check if it's an array of plain strings
      if (typeof content[0] === "string") {
        return (
          <>
            {content.map((p, idx) => (
              <p key={idx} className="mb-6 leading-relaxed text-gray-800 text-[16px]">
                {p}
              </p>
            ))}
          </>
        );
      }

      // Check if it's an array of objects
      if (typeof content[0] === "object") {
        // PortableText components definition
        const portableTextComponents = {
          types: {
            paragraph: ({ value }: any) => {
              if (!value?.text) return null;
              return <p className="mb-6 leading-relaxed text-gray-800 text-[16px]">{value.text}</p>;
            },
            heading: ({ value }: any) => {
              if (!value?.text) return null;
              if (value.level === "h3") {
                return <h3 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">{value.text}</h3>;
              }
              return <h2 className="font-serif text-3xl font-bold text-gray-900 mt-10 mb-4">{value.text}</h2>;
            },
            quote: ({ value }: any) => {
              if (!value?.text) return null;
              return (
                <blockquote className="border-l-4 border-[#2f4f3f] pl-5 py-2 my-6 font-serif italic text-xl text-gray-800 bg-[#f5f1e8]/30">
                  {Array.isArray(value.text) ? (
                    <div className="mb-2 [&>p]:mb-2 [&>p:last-child]:mb-0">
                      <PortableText value={value.text} components={portableTextComponents} />
                    </div>
                  ) : (
                    <p className="mb-2">{value.text}</p>
                  )}
                  {value.cite && (
                    <cite className="block not-italic text-xs tracking-widest text-gray-500 uppercase mt-2">
                      — {value.cite}
                    </cite>
                  )}
                </blockquote>
              );
            },
            contentImage: ({ value }: any) => {
              const src = getImageUrl(value);
              if (!src) return null;
              return (
                <figure className="my-8">
                  <div className="relative w-full h-[400px] overflow-hidden rounded bg-gray-100">
                    <Image
                      src={src}
                      alt={value.caption || "Article image"}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  {value.caption && (
                    <figcaption className="text-center text-xs text-gray-500 italic mt-2">
                      {value.caption}
                    </figcaption>
                  )}
                </figure>
              );
            },
            image: ({ value }: any) => {
              const src = getImageUrl(value);
              if (!src) return null;
              return (
                <figure className="my-8">
                  <div className="relative w-full h-[400px] overflow-hidden rounded bg-gray-100">
                    <Image
                      src={src}
                      alt={value.alt || value.caption || "Article image"}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  {value.caption && (
                    <figcaption className="text-center text-xs text-gray-500 italic mt-2">
                      {value.caption}
                    </figcaption>
                  )}
                </figure>
              );
            },
            list: ({ value }: any) => {
              if (!value?.items || !Array.isArray(value.items)) return null;
              return (
                <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-800 leading-relaxed">
                  {value.items.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              );
            },
          },
          block: {
            h1: ({ children }: any) => <h1 className="font-serif text-4xl font-bold text-gray-900 mt-10 mb-4">{children}</h1>,
            h2: ({ children }: any) => <h2 className="font-serif text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>,
            h3: ({ children }: any) => <h3 className="font-serif text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>,
            h4: ({ children }: any) => <h4 className="font-serif text-xl font-bold text-gray-900 mt-4 mb-2">{children}</h4>,
            normal: ({ children }: any) => <p className="mb-6 leading-relaxed text-gray-800 text-[16px]">{children}</p>,
            blockquote: ({ children }: any) => (
              <blockquote className="border-l-4 border-[#2f4f3f] pl-5 py-2 my-6 font-serif italic text-xl text-gray-800 bg-[#f5f1e8]/30">
                {children}
              </blockquote>
            ),
          },
          marks: {
            strong: ({ children }: any) => <strong className="font-bold text-gray-900">{children}</strong>,
            em: ({ children }: any) => <em className="italic">{children}</em>,
            underline: ({ children }: any) => <u className="underline">{children}</u>,
            link: ({ value, children }: any) => {
              const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
              return (
                <a
                  href={value?.href}
                  target={target}
                  rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                  className="text-[#2f4f3f] underline hover:text-[#1a3026] transition-colors"
                >
                  {children}
                </a>
              );
            },
          },
          list: {
            bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-800 leading-relaxed">{children}</ul>,
            number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-800 leading-relaxed">{children}</ol>,
          },
          listItem: {
            bullet: ({ children }: any) => <li>{children}</li>,
            number: ({ children }: any) => <li>{children}</li>,
          },
        };

        // Normalize structured content (if item has type instead of _type, or shorthand names)
        const normalizedContent = content.map((item: any, index: number) => {
          if (!item || typeof item !== "object") return item;

          // If item already has _type
          if (item._type) {
            return {
              _key: item._key || `block-${index}`,
              ...item,
            };
          }

          // If item has type (e.g., from old news-data.ts)
          const type = item.type;
          let _type = "paragraph";
          if (type === "p" || type === "paragraph") _type = "paragraph";
          else if (type === "h2" || type === "h3" || type === "heading") _type = "heading";
          else if (type === "quote") _type = "quote";
          else if (type === "image" || type === "contentImage") _type = "contentImage";
          else if (type === "list") _type = "list";

          return {
            _key: item._key || `block-${index}`,
            _type,
            level: item.level || (type === "h3" ? "h3" : type === "h2" ? "h2" : undefined),
            ...item,
          };
        });

        // Check if blocks have raw HTML strings inside span children
        const hasHTML = normalizedContent.some((block: any) =>
          block.children &&
          Array.isArray(block.children) &&
          block.children.some((child: any) => child.text && containsHTML(child.text))
        );

        if (hasHTML) {
          const htmlContent = normalizedContent
            .map((block: any) =>
              block.children && Array.isArray(block.children)
                ? block.children.map((child: any) => child.text || "").join("")
                : block.text || ""
            )
            .join("\n");
          return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
        }

        return <PortableText value={normalizedContent} components={portableTextComponents} />;
      }
    }

    return null;
  }, [content]);

  return <div className={className}>{renderContent}</div>;
}
