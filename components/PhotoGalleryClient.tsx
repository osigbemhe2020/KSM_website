"use client";

import { useState, useMemo } from "react";
import { Calendar, Image as ImageIcon } from "lucide-react";

type GalleryItem = {
  _id: string;
  title: string;
  category?: string;
  caption?: string;
  alt?: string;
  takenAt?: string;
  image?: {
    asset?: {
      url?: string;
      altText?: string;
    };
  };
};

export default function PhotoGalleryClient({ items }: { items: GalleryItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ["all", ...Array.from(set)];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Category Filter Tabs */}
      {categories.length > 2 && (
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                selectedCategory === cat
                  ? "bg-forest text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat === "all" ? "All Photos" : cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center text-slate-500 border border-slate-200 bg-white p-8">
          <ImageIcon size={36} className="mx-auto mb-3 text-slate-300" />
          <p className="font-medium text-slate-700">No photos uploaded in this category yet.</p>
          <p className="text-xs text-slate-400 mt-1">Upload photos in /admin/gallery to populate this gallery.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const url = item.image?.asset?.url;
            return (
              <div
                key={item._id}
                onClick={() => setActivePhoto(item)}
                className="group cursor-pointer bg-white overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all"
              >
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  {url ? (
                    <img
                      src={url}
                      alt={item.alt || item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-slate-400">
                      No Image File
                    </div>
                  )}
                  {item.category && (
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase font-semibold px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm text-slate-900 group-hover:text-forest transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.caption}</p>
                  )}
                  {item.takenAt && (
                    <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(item.takenAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="max-w-4xl max-h-[90vh] bg-white overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {activePhoto.image?.asset?.url && (
              <img
                src={activePhoto.image.asset.url}
                alt={activePhoto.alt || activePhoto.title}
                className="max-h-[65vh] w-full object-contain bg-black"
              />
            )}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-medium text-slate-900">{activePhoto.title}</h2>
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  className="text-xs font-semibold uppercase text-slate-400 hover:text-slate-900"
                >
                  Close &times;
                </button>
              </div>
              {activePhoto.caption && (
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{activePhoto.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
