"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePostButton({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Delete this news post? This cannot be undone.")) return;
    setDeleting(true);
    const response = await fetch(`/api/admin/news-posts/${id}`, { method: "DELETE" });
    if (!response.ok) window.alert("The post could not be deleted.");
    setDeleting(false);
    router.refresh();
  }

  return <button type="button" onClick={handleDelete} disabled={deleting} className="text-red-600 hover:underline disabled:opacity-50">{deleting ? "Deleting..." : "Delete"}</button>;
}