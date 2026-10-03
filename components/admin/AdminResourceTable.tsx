"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Plus, ExternalLink, Calendar, Filter } from "lucide-react";
import type { AdminResource } from "@/lib/adminResources";
import DeleteResourceButton from "./DeleteResourceButton";

type RecordItem = Record<string, unknown> & { _id: string };

function getImageSrc(item: RecordItem, imageField?: string): string {
  if (!imageField || !item[imageField]) return "";
  const val = item[imageField];
  if (typeof val === "object" && val !== null) {
    const asset = (val as { asset?: { url?: string } }).asset;
    return asset?.url || "";
  }
  return "";
}

function formatDate(val: unknown): string {
  if (!val || typeof val !== "string") return "-";
  try {
    const d = new Date(val);
    if (isNaN(d.getTime())) return String(val);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return String(val);
  }
}

export default function AdminResourceTable({
  resource,
  records,
}: {
  resource: AdminResource;
  records: RecordItem[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Determine if there is a primary filter column like category or status
  const filterCol = resource.listColumns.find(
    (c) => c.field === "category" || c.field === "status" || c.field === "region" || c.field === "context"
  );

  const filterOptions = useMemo(() => {
    if (!filterCol) return [];
    const values = new Set<string>();
    records.forEach((r) => {
      const v = r[filterCol.field];
      if (v && typeof v === "string") values.add(v);
    });
    return Array.from(values);
  }, [records, filterCol]);

  // Filter & Search records
  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      // 1. Category / Status filter
      if (selectedFilter !== "all" && filterCol) {
        if (String(item[filterCol.field]) !== selectedFilter) return false;
      }
      // 2. Search term
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return resource.listColumns.some((col) => {
        const val = item[col.field];
        return val != null && String(val).toLowerCase().includes(term);
      });
    });
  }, [records, searchTerm, selectedFilter, filterCol, resource.listColumns]);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest">
            <span>Content Library</span>
            <span>/</span>
            <span>{resource.category}</span>
          </div>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
            {resource.title} <span className="text-xl font-normal text-slate-400">({records.length})</span>
          </h1>
        </div>

        <Link
          href={`/member-page/admin/${resource.key}/new`}
          className="inline-flex items-center justify-center gap-2 bg-forest px-5 py-2.5 text-sm font-medium text-white hover:bg-forest/90 transition-colors shadow-xs"
        >
          <Plus size={16} />
          <span>Add {resource.singular}</span>
        </Link>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={`Search ${resource.title.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50/50 py-2 pl-9 pr-4 text-sm focus:bg-white focus:outline-none"
          />
        </div>

        {filterOptions.length > 0 && (
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400 shrink-0" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-slate-50 py-2 px-3 text-xs font-medium text-slate-700 border border-slate-200 focus:outline-none"
            >
              <option value="all">All {filterCol?.label || "Categories"}</option>
              {filterOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Table List */}
      <div className="overflow-hidden border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <tr>
                {resource.listColumns.map((col, idx) => (
                  <th key={col.field} className={`py-3.5 px-5 ${idx === 0 ? "min-w-[240px]" : ""}`}>
                    {col.label}
                  </th>
                ))}
                <th className="py-3.5 px-5 text-right w-36">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={resource.listColumns.length + 1} className="py-12 text-center text-slate-500">
                    {searchTerm || selectedFilter !== "all"
                      ? "No matching records found."
                      : `No ${resource.title.toLowerCase()} yet. Click "Add ${resource.singular}" to create one.`}
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item) => {
                  const imageUrl = getImageSrc(item, resource.imageField);

                  return (
                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                      {resource.listColumns.map((col, idx) => {
                        const val = item[col.field];

                        if (idx === 0) {
                          return (
                            <td key={col.field} className="py-4 px-5">
                              <div className="flex items-center gap-3.5">
                                {resource.imageField && (
                                  <div className="h-11 w-14 shrink-0 overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                                    {imageUrl ? (
                                      <img src={imageUrl} alt="" className="h-full w-full object-cover" />
                                    ) : (
                                      <span className="text-[10px] text-slate-400">No img</span>
                                    )}
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-slate-900 line-clamp-1">{String(val || "Untitled")}</p>
                                  {Boolean(item.slug) && (
                                    <p className="text-[11px] text-slate-400">
                                      /{typeof item.slug === "object" ? (item.slug as { current: string }).current : String(item.slug)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                          );
                        }

                        if (col.type === "badge" || col.field === "category" || col.field === "status" || col.field === "region") {
                          const badgeStr = String(val || "General");
                          const isSuccess = badgeStr === "COMPLETED" || badgeStr === "Upcoming" || badgeStr === "ONGOING";
                          const isWarning = badgeStr === "UPCOMING" || badgeStr === "executive";
                          const isMuted = badgeStr === "Past" || badgeStr === "Cancelled";

                          return (
                            <td key={col.field} className="py-4 px-5">
                              <span
                                className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${
                                  isSuccess
                                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                    : isWarning
                                    ? "bg-amber-50 text-amber-800 border border-amber-200"
                                    : isMuted
                                    ? "bg-slate-100 text-slate-600"
                                    : "bg-slate-100 text-slate-800"
                                }`}
                              >
                                {badgeStr}
                              </span>
                            </td>
                          );
                        }

                        if (col.type === "date" || col.field.includes("Date") || col.field.includes("At")) {
                          return (
                            <td key={col.field} className="py-4 px-5 text-xs text-slate-600">
                              <span className="inline-flex items-center gap-1.5">
                                <Calendar size={13} className="text-slate-400" />
                                {formatDate(val)}
                              </span>
                            </td>
                          );
                        }

                        return (
                          <td key={col.field} className="py-4 px-5 text-slate-600 max-w-[260px] truncate">
                            {val != null ? String(val) : "-"}
                          </td>
                        );
                      })}

                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-3 text-xs font-medium">
                          <Link
                            href={`/member-page/admin/${resource.key}/${item._id}/edit`}
                            className="text-forest hover:text-forest-deep transition-colors"
                          >
                            Edit
                          </Link>
                          <span className="text-slate-300">|</span>
                          <DeleteResourceButton resource={resource.key} id={item._id} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
