"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Plus, Trash2, Wand2, Upload, Check, AlertCircle, ArrowLeft } from "lucide-react";
import type { AdminField, AdminResource } from "@/lib/adminResources";
import { serializeAdminValue } from "@/lib/adminResources";
import RichTextEditor from "./RichTextEditor";
import NewsContentEditor from "./NewsContentEditor";

// Helper function to convert Portable Text to HTML for editing
type PortableTextChild = { text?: string; marks?: string[] };
type PortableTextBlock = { children?: PortableTextChild[]; style?: string };

function convertPortableTextToHtml(portableText: PortableTextBlock[]): string {
  if (!Array.isArray(portableText)) return "";
  
  return portableText.map((block) => {
    let content = "";
    if (block.children && Array.isArray(block.children)) {
      content = block.children.map((child) => {
        let text = child.text || "";
        // Apply inline formatting
        if (child.marks && Array.isArray(child.marks)) {
          if (child.marks.includes("strong")) {
            text = `<strong>${text}</strong>`;
          }
          if (child.marks.includes("em")) {
            text = `<em>${text}</em>`;
          }
          if (child.marks.includes("underline")) {
            text = `<u>${text}</u>`;
          }
        }
        return text;
      }).join("");
    }
    
    const tag = block.style === "h1" ? "h1" : 
               block.style === "h2" ? "h2" : 
               block.style === "h3" ? "h3" : 
               block.style === "blockquote" ? "blockquote" : "p";
    
    return `<${tag}>${content}</${tag}>`;
  }).join("\n");
}

type ResourceRecord = Record<string, unknown> & { _id?: string };

function extractImageUrl(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  const asset = (value as { asset?: { url?: string } }).asset;
  return asset?.url || "";
}

export default function AdminResourceForm({
  resource,
  record,
  redirectUrl,
}: {
  resource: AdminResource;
  record?: ResourceRecord;
  redirectUrl?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  // Maintain image previews for image fields
  const [previews, setPreviews] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    resource.fields.forEach((f) => {
      if (f.type === "image") {
        map[f.name] = extractImageUrl(record?.[f.name]);
      }
    });
    return map;
  });

  // State for slug generator
  const [slugVal, setSlugVal] = useState<string>(() => {
    const s = record?.slug;
    if (s && typeof s === "object" && "current" in s) {
      return String((s as { current: string }).current);
    }
    return typeof s === "string" ? s : "";
  });

  // States for repeaters
  const [stats, setStats] = useState<Array<{ value: string; label: string }>>(() => {
    const raw = record?.stats;
    return Array.isArray(raw) ? (raw as Array<{ value: string; label: string }>) : [];
  });

  const [milestones, setMilestones] = useState<Array<{ date: string; title: string; note: string }>>(() => {
    const raw = record?.milestones;
    return Array.isArray(raw) ? (raw as Array<{ date: string; title: string; note: string }>) : [];
  });

  const [chapters, setChapters] = useState<Array<{ label: string; title: string; body: string }>>(() => {
    const raw = record?.chapters;
    return Array.isArray(raw) ? (raw as Array<{ label: string; title: string; body: string }>) : [];
  });

  const [initiatives, setInitiatives] = useState<Array<{ title: string; description: string }>>(() => {
    const raw = record?.initiatives;
    return Array.isArray(raw) ? (raw as Array<{ title: string; description: string }>) : [];
  });

  const [impacts, setImpacts] = useState<Array<{ title: string; description: string; metric: string; subtext: string }>>(() => {
    const raw = record?.impacts;
    return Array.isArray(raw) ? (raw as Array<{ title: string; description: string; metric: string; subtext: string }>) : [];
  });

  const [repeaterLeaders, setRepeaterLeaders] = useState<Array<{ role: string; name: string }>>(() => {
    const raw = record?.leaders;
    return Array.isArray(raw) ? (raw as Array<{ role: string; name: string }>) : [];
  });

  const [newsContent, setNewsContent] = useState<Array<Record<string, unknown>>>(() => {
    const raw = record?.content;
    return Array.isArray(raw) ? raw as Array<Record<string, unknown>> : [];
  });
  const [newsImageFiles, setNewsImageFiles] = useState<Record<string, File>>({});

  // State for rich text content
  const [richTextContent, setRichTextContent] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    resource.fields.forEach((f) => {
      if (f.type === "richtext") {
        const rawValue = record?.[f.name];
        if (rawValue && typeof rawValue === "string") {
          map[f.name] = rawValue;
        } else if (rawValue && typeof rawValue === "object" && Array.isArray(rawValue)) {
          // Convert Portable Text to HTML for editing
          map[f.name] = convertPortableTextToHtml(rawValue);
        }
      }
    });
    return map;
  });

  // Active section tab if groups exist
  const groups = Array.from(new Set(resource.fields.map((f) => f.group).filter(Boolean))) as string[];
  const [activeGroup, setActiveGroup] = useState<string>(groups[0] || "All");

  function handleAutoSlug(sourceName = "title") {
    const form = document.querySelector("form") as HTMLFormElement | null;
    if (!form) return;
    const sourceEl = form.querySelector(`[name="${sourceName}"]`) as HTMLInputElement | HTMLTextAreaElement | null;
    const sourceText = sourceEl ? sourceEl.value : "";
    if (!sourceText) return;
    const generated = sourceText
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setSlugVal(generated);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);

    if (resource.key === "news-posts") {
      formData.set("content", JSON.stringify(newsContent));
      Object.entries(newsImageFiles).forEach(([key, file]) => {
        formData.append(`contentImage:${key}`, file);
      });
    }

    // Append JSON repeater fields
    if (resource.fields.some((f) => f.type === "stats-repeater")) {
      formData.set("stats", JSON.stringify(stats));
    }
    if (resource.fields.some((f) => f.type === "milestones-repeater")) {
      formData.set("milestones", JSON.stringify(milestones));
    }
    if (resource.fields.some((f) => f.type === "chapters-repeater")) {
      formData.set("chapters", JSON.stringify(chapters));
    }
    if (resource.fields.some((f) => f.type === "initiatives-repeater")) {
      formData.set("initiatives", JSON.stringify(initiatives));
    }
    if (resource.fields.some((f) => f.type === "impacts-repeater")) {
      formData.set("impacts", JSON.stringify(impacts));
    }
    if (resource.fields.some((f) => f.type === "leaders-repeater")) {
      formData.set("leaders", JSON.stringify(repeaterLeaders));
    }

    // Append rich text content
    resource.fields.forEach((f) => {
      if (f.type === "richtext") {
        formData.set(f.name, richTextContent[f.name] || "");
      }
    });

    try {
      const url = record?._id
        ? `/api/admin/${resource.key}/${record._id}`
        : `/api/admin/${resource.key}`;

      const response = await fetch(url, {
        method: record?._id ? "PATCH" : "POST",
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({ error: `Unable to save ${resource.singular.toLowerCase()}.` }));
        setError(result.error || `Unable to save ${resource.singular.toLowerCase()}.`);
        setSaving(false);
        return;
      }

      setSuccess("Changes successfully saved to Sanity!");
      setSaving(false);

      if (!resource.isSingleton) {
        setTimeout(() => {
          router.push(redirectUrl || `/admin/${resource.key}`);
          router.refresh();
        }, 800);
      } else {
        router.refresh();
      }
    } catch {
      setError("The request could not be completed. Please check your network connection.");
      setSaving(false);
    }
  }

  const fieldsToRender = groups.length > 0 && activeGroup !== "All"
    ? resource.fields.filter((f) => f.group === activeGroup)
    : resource.fields;

  return (
    <div className="space-y-6">
      {/* Group Navigation Tabs if present */}
      {groups.length > 1 && (
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {groups.map((group) => (
            <button
              key={group}
              type="button"
              onClick={() => setActiveGroup(group)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeGroup === group
                  ? "border-b-2 border-forest bg-forest/5 text-forest"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="border border-slate-200 bg-white p-6 md:p-8 shadow-xs">
        {error && (
          <div className="mb-6 flex items-center gap-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-3 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <Check size={18} className="shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {fieldsToRender.map((field) => {
            const rawValue = record?.[field.name];
            const serialized = serializeAdminValue(field, rawValue);
            const isFullWidth =
              field.type === "textarea" ||
              field.type === "list" ||
              field.type === "json" ||
              field.type === "stats-repeater" ||
              field.type === "milestones-repeater" ||
              field.type === "chapters-repeater" ||
              field.type === "initiatives-repeater" ||
              field.type === "impacts-repeater" ||
              field.type === "leaders-repeater";

            // 1. Image upload field with live preview
            if (field.type === "image") {
              const currentPreview = previews[field.name];
              return (
                <div key={field.name} className="block md:col-span-2 rounded-md border border-dashed border-slate-300 p-4 bg-slate-50/50">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    {field.label} {field.required && !record && "*"}
                  </span>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {currentPreview ? (
                      <div className="relative shrink-0 overflow-hidden border border-slate-200 bg-white shadow-xs">
                        <img src={currentPreview} alt="Preview" className="h-28 w-44 object-cover" />
                      </div>
                    ) : (
                      <div className="flex h-28 w-44 shrink-0 items-center justify-center border border-dashed border-slate-300 bg-slate-100 text-xs text-slate-400">
                        No image uploaded
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <label className="inline-flex cursor-pointer items-center gap-2 bg-slate-900 px-3.5 py-2 text-xs font-medium text-white hover:bg-slate-800 transition-colors">
                        <Upload size={14} />
                        <span>{currentPreview ? "Replace Image" : "Upload File"}</span>
                        <input
                          name={field.name}
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setPreviews((prev) => ({ ...prev, [field.name]: URL.createObjectURL(file) }));
                            }
                          }}
                        />
                      </label>
                      <p className="text-[11px] text-slate-500">Supported formats: JPG, PNG, WEBP, SVG. High resolution recommended.</p>
                    </div>
                  </div>
                </div>
              );
            }

            // 2. Slug field with auto-generation
            if (field.name === "slug") {
              return (
                <label key={field.name} className="block">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">{field.label} *</span>
                    <button
                      type="button"
                      onClick={() => handleAutoSlug(resource.fields.some((f) => f.name === "name") ? "name" : "title")}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-forest hover:underline"
                    >
                      <Wand2 size={12} /> Auto-generate
                    </button>
                  </div>
                  <input
                    name="slug"
                    type="text"
                    required={field.required}
                    value={slugVal}
                    onChange={(e) => setSlugVal(e.target.value)}
                    placeholder={field.placeholder || "url-slug"}
                    className="w-full border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                  />
                </label>
              );
            }

            // 3. Boolean toggle
            if (field.type === "boolean") {
              const isChecked = rawValue === true || serialized === "true";
              return (
                <div key={field.name} className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    name={field.name}
                    id={field.name}
                    defaultChecked={isChecked}
                    value="true"
                    className="h-4 w-4 rounded border-slate-300 text-forest focus:ring-forest"
                  />
                  <label htmlFor={field.name} className="text-sm font-medium text-slate-800 cursor-pointer">
                    {field.label}
                  </label>
                </div>
              );
            }

            // 4. Select dropdown
            if (field.type === "select") {
              const optionsList = field.options || [];
              return (
                <label key={field.name} className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    {field.label} {field.required && "*"}
                  </span>
                  <select
                    name={field.name}
                    required={field.required}
                    defaultValue={serialized || (typeof optionsList[0] === "object" ? optionsList[0].value : optionsList[0])}
                    className="w-full border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                  >
                    {optionsList.map((opt) => {
                      const optVal = typeof opt === "object" ? opt.value : opt;
                      const optLabel = typeof opt === "object" ? opt.label : opt;
                      return (
                        <option key={optVal} value={optVal}>
                          {optLabel}
                        </option>
                      );
                    })}
                  </select>
                </label>
              );
            }

            // 5. Stats Repeater
            if (field.type === "stats-repeater") {
              return (
                <div key={field.name} className="md:col-span-2 space-y-3 rounded-md border border-slate-200 bg-slate-50/70 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">{field.label}</span>
                    <button
                      type="button"
                      onClick={() => setStats([...stats, { value: "", label: "" }])}
                      className="inline-flex items-center gap-1.5 bg-forest px-3 py-1.5 text-xs font-medium text-white hover:bg-forest/90"
                    >
                      <Plus size={14} /> Add Metric
                    </button>
                  </div>
                  {stats.length === 0 ? (
                    <p className="text-xs text-slate-500 py-3 text-center">No stats added yet. Click &quot;Add Metric&quot; to add numbers.</p>
                  ) : (
                    <div className="space-y-2">
                      {stats.map((st, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white p-2.5 border border-slate-200">
                          <input
                            type="text"
                            placeholder="Value (e.g. ₦500M+ or 10,000+)"
                            value={st.value}
                            onChange={(e) => {
                              const copy = [...stats];
                              copy[idx].value = e.target.value;
                              setStats(copy);
                            }}
                            className="w-1/3 border border-slate-300 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Label (e.g. Funds Disbursed)"
                            value={st.label}
                            onChange={(e) => {
                              const copy = [...stats];
                              copy[idx].label = e.target.value;
                              setStats(copy);
                            }}
                            className="flex-1 border border-slate-300 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setStats(stats.filter((_, i) => i !== idx))}
                            className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // 6. Milestones Repeater
            if (field.type === "milestones-repeater") {
              return (
                <div key={field.name} className="md:col-span-2 space-y-3 rounded-md border border-slate-200 bg-slate-50/70 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">{field.label}</span>
                    <button
                      type="button"
                      onClick={() => setMilestones([...milestones, { date: "", title: "", note: "" }])}
                      className="inline-flex items-center gap-1.5 bg-forest px-3 py-1.5 text-xs font-medium text-white hover:bg-forest/90"
                    >
                      <Plus size={14} /> Add Milestone
                    </button>
                  </div>
                  {milestones.length === 0 ? (
                    <p className="text-xs text-slate-500 py-3 text-center">No milestones added yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {milestones.map((m, idx) => (
                        <div key={idx} className="space-y-2 bg-white p-3 border border-slate-200">
                          <div className="flex items-center gap-3">
                            <input
                              type="text"
                              placeholder="Date / Timeline (e.g. Q1 2025)"
                              value={m.date}
                              onChange={(e) => {
                                const copy = [...milestones];
                                copy[idx].date = e.target.value;
                                setMilestones(copy);
                              }}
                              className="w-1/3 border border-slate-300 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
                            />
                            <input
                              type="text"
                              placeholder="Milestone Title"
                              value={m.title}
                              onChange={(e) => {
                                const copy = [...milestones];
                                copy[idx].title = e.target.value;
                                setMilestones(copy);
                              }}
                              className="flex-1 border border-slate-300 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setMilestones(milestones.filter((_, i) => i !== idx))}
                              className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Milestone Note / Description (Optional)"
                            value={m.note}
                            onChange={(e) => {
                              const copy = [...milestones];
                              copy[idx].note = e.target.value;
                              setMilestones(copy);
                            }}
                            className="w-full border border-slate-300 px-3 py-1.5 text-xs text-slate-600 focus:border-forest focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // 7. Chapters Repeater
            if (field.type === "chapters-repeater") {
              return (
                <div key={field.name} className="md:col-span-2 space-y-3 rounded-md border border-slate-200 bg-slate-50/70 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">{field.label}</span>
                    <button
                      type="button"
                      onClick={() => setChapters([...chapters, { label: "", title: "", body: "" }])}
                      className="inline-flex items-center gap-1.5 bg-forest px-3 py-1.5 text-xs font-medium text-white hover:bg-forest/90"
                    >
                      <Plus size={14} /> Add Story Chapter
                    </button>
                  </div>
                  {chapters.length === 0 ? (
                    <p className="text-xs text-slate-500 py-3 text-center">No chapters added yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {chapters.map((ch, idx) => (
                        <div key={idx} className="space-y-2 bg-white p-3 border border-slate-200">
                          <div className="flex items-center gap-3">
                            <input
                              type="text"
                              placeholder="Chapter Eyebrow (e.g. THE BEGINNING · 1953)"
                              value={ch.label}
                              onChange={(e) => {
                                const copy = [...chapters];
                                copy[idx].label = e.target.value;
                                setChapters(copy);
                              }}
                              className="w-1/3 border border-slate-300 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
                            />
                            <input
                              type="text"
                              placeholder="Chapter Title"
                              value={ch.title}
                              onChange={(e) => {
                                const copy = [...chapters];
                                copy[idx].title = e.target.value;
                                setChapters(copy);
                              }}
                              className="flex-1 border border-slate-300 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setChapters(chapters.filter((_, i) => i !== idx))}
                              className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <textarea
                            rows={3}
                            placeholder="Chapter narrative content..."
                            value={ch.body}
                            onChange={(e) => {
                              const copy = [...chapters];
                              copy[idx].body = e.target.value;
                              setChapters(copy);
                            }}
                            className="w-full border border-slate-300 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // 8. Initiatives Repeater
            if (field.type === "initiatives-repeater") {
              return (
                <div key={field.name} className="md:col-span-2 space-y-3 rounded-md border border-slate-200 bg-slate-50/70 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">{field.label}</span>
                    <button
                      type="button"
                      onClick={() => setInitiatives([...initiatives, { title: "", description: "" }])}
                      className="inline-flex items-center gap-1.5 bg-forest px-3 py-1.5 text-xs font-medium text-white hover:bg-forest/90"
                    >
                      <Plus size={14} /> Add Initiative
                    </button>
                  </div>
                  {initiatives.length === 0 ? (
                    <p className="text-xs text-slate-500 py-3 text-center">No initiatives added yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {initiatives.map((init, idx) => (
                        <div key={idx} className="space-y-2 bg-white p-3 border border-slate-200">
                          <div className="flex items-center gap-3">
                            <input
                              type="text"
                              placeholder="Initiative Title"
                              value={init.title}
                              onChange={(e) => {
                                const copy = [...initiatives];
                                copy[idx].title = e.target.value;
                                setInitiatives(copy);
                              }}
                              className="flex-1 border border-slate-300 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setInitiatives(initiatives.filter((_, i) => i !== idx))}
                              className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            placeholder="Initiative description..."
                            value={init.description}
                            onChange={(e) => {
                              const copy = [...initiatives];
                              copy[idx].description = e.target.value;
                              setInitiatives(copy);
                            }}
                            className="w-full border border-slate-300 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // 9. Impacts Repeater
            if (field.type === "impacts-repeater") {
              return (
                <div key={field.name} className="md:col-span-2 space-y-3 rounded-md border border-slate-200 bg-slate-50/70 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">{field.label}</span>
                    <button
                      type="button"
                      onClick={() => setImpacts([...impacts, { title: "", description: "", metric: "", subtext: "" }])}
                      className="inline-flex items-center gap-1.5 bg-forest px-3 py-1.5 text-xs font-medium text-white hover:bg-forest/90"
                    >
                      <Plus size={14} /> Add Impact Card
                    </button>
                  </div>
                  {impacts.length === 0 ? (
                    <p className="text-xs text-slate-500 py-3 text-center">No impact metrics added yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {impacts.map((imp, idx) => (
                        <div key={idx} className="space-y-2 bg-white p-3 border border-slate-200">
                          <div className="flex items-center gap-3">
                            <input
                              type="text"
                              placeholder="Title (e.g. Community Outreach)"
                              value={imp.title}
                              onChange={(e) => {
                                const copy = [...impacts];
                                copy[idx].title = e.target.value;
                                setImpacts(copy);
                              }}
                              className="flex-1 border border-slate-300 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
                            />
                            <input
                              type="text"
                              placeholder="Metric (e.g. 12,400+ or ₦14M)"
                              value={imp.metric}
                              onChange={(e) => {
                                const copy = [...impacts];
                                copy[idx].metric = e.target.value;
                                setImpacts(copy);
                              }}
                              className="w-1/4 border border-slate-300 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setImpacts(impacts.filter((_, i) => i !== idx))}
                              className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="text"
                              placeholder="Subtext / Label (e.g. BENEFICIARIES IN 2024)"
                              value={imp.subtext}
                              onChange={(e) => {
                                const copy = [...impacts];
                                copy[idx].subtext = e.target.value;
                                setImpacts(copy);
                              }}
                              className="w-1/3 border border-slate-300 px-3 py-1.5 text-xs focus:border-forest focus:outline-none"
                            />
                            <input
                              type="text"
                              placeholder="Short Description..."
                              value={imp.description}
                              onChange={(e) => {
                                const copy = [...impacts];
                                copy[idx].description = e.target.value;
                                setImpacts(copy);
                              }}
                              className="flex-1 border border-slate-300 px-3 py-1.5 text-xs focus:border-forest focus:outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // 10. Leaders Repeater (for ventures)
            if (field.type === "leaders-repeater") {
              return (
                <div key={field.name} className="md:col-span-2 space-y-3 rounded-md border border-slate-200 bg-slate-50/70 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">{field.label}</span>
                    <button
                      type="button"
                      onClick={() => setRepeaterLeaders([...repeaterLeaders, { role: "", name: "" }])}
                      className="inline-flex items-center gap-1.5 bg-forest px-3 py-1.5 text-xs font-medium text-white hover:bg-forest/90"
                    >
                      <Plus size={14} /> Add Director
                    </button>
                  </div>
                  {repeaterLeaders.length === 0 ? (
                    <p className="text-xs text-slate-500 py-3 text-center">No directors or leaders added yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {repeaterLeaders.map((ldr, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white p-2.5 border border-slate-200">
                          <input
                            type="text"
                            placeholder="Designation / Role (e.g. MANAGING DIRECTOR)"
                            value={ldr.role}
                            onChange={(e) => {
                              const copy = [...repeaterLeaders];
                              copy[idx].role = e.target.value;
                              setRepeaterLeaders(copy);
                            }}
                            className="w-1/2 border border-slate-300 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Full Name (e.g. Sir Chukwuemeka Okosikwo)"
                            value={ldr.name}
                            onChange={(e) => {
                              const copy = [...repeaterLeaders];
                              copy[idx].name = e.target.value;
                              setRepeaterLeaders(copy);
                            }}
                            className="w-1/2 border border-slate-300 px-3 py-1.5 text-sm focus:border-forest focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setRepeaterLeaders(repeaterLeaders.filter((_, i) => i !== idx))}
                            className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // 11. Textarea, List, JSON, RichText
            if (resource.key === "news-posts" && field.name === "content") {
              return (
                <div key={field.name} className="md:col-span-2">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    {field.label} {field.required && "*"}
                  </span>
                  <NewsContentEditor
                    content={newsContent}
                    imageFiles={newsImageFiles}
                    onChange={setNewsContent}
                    onImageSelect={(key, file) => setNewsImageFiles((current) => ({ ...current, [key]: file }))}
                    onImageRemove={(key) => setNewsImageFiles((current) => {
                      const next = { ...current };
                      delete next[key];
                      return next;
                    })}
                  />
                </div>
              );
            }

            if (field.type === "textarea" || field.type === "list" || field.type === "json") {
              return (
                <label key={field.name} className={`block ${isFullWidth ? "md:col-span-2" : ""}`}>
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    {field.label} {field.required && "*"}
                  </span>
                  <textarea
                    name={field.name}
                    required={field.required}
                    rows={field.type === "textarea" ? 4 : 6}
                    defaultValue={serialized}
                    placeholder={field.placeholder}
                    className="w-full border border-slate-300 bg-white p-3 text-sm focus:border-forest focus:outline-none font-sans leading-relaxed"
                  />
                  {field.type === "list" && (
                    <span className="mt-1 block text-[11px] text-slate-500">Separate each paragraph or bullet point with a new line.</span>
                  )}
                </label>
              );
            }

            // 12. Rich Text Editor
            if (field.type === "richtext") {
              return (
                <div key={field.name} className="md:col-span-2">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    {field.label} {field.required && "*"}
                  </span>
                  <input
                    type="hidden"
                    name={field.name}
                    value={richTextContent[field.name] || ""}
                  />
                  <RichTextEditor
                    content={richTextContent[field.name] || ""}
                    onChange={(content) => setRichTextContent((prev) => ({ ...prev, [field.name]: content }))}
                    placeholder={field.placeholder}
                  />
                </div>
              );
            }

            // 12. Standard text, number, date, datetime inputs
            const inputType =
              field.type === "number"
                ? "number"
                : field.type === "date"
                ? "date"
                : field.type === "datetime"
                ? "datetime-local"
                : "text";

            return (
              <label key={field.name} className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  {field.label} {field.required && "*"}
                </span>
                <input
                  name={field.name}
                  type={inputType}
                  step={field.type === "number" ? "any" : undefined}
                  required={field.required}
                  defaultValue={serialized}
                  placeholder={field.placeholder}
                  className="w-full border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
                />
              </label>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-forest px-6 py-3 text-sm font-medium text-white hover:bg-forest/90 disabled:opacity-50 transition-colors shadow-xs"
            >
              {saving ? "Saving Changes..." : record ? "Save Changes" : `Create ${resource.singular}`}
            </button>
            {!resource.isSingleton && (
              <Link
                href={redirectUrl || `/admin/${resource.key}`}
                className="px-4 py-3 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </Link>
            )}
          </div>
          {resource.isSingleton && (
            <span className="text-xs text-slate-400">Single Document Mode</span>
          )}
        </div>
      </form>
    </div>
  );
}