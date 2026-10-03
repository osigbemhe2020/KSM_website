"use client";

import { Bold, ImagePlus, Italic, Quote, Trash2, Undo, Redo, Type } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { urlFor } from "@/sanity/lib/image";

type PortableSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

type PortableBlock = {
  _type: "block";
  _key: string;
  style: "normal";
  markDefs: unknown[];
  children: PortableSpan[];
};

type NewsBlock = {
  _key?: string;
  _type?: string;
  style?: string;
  text?: string | PortableBlock[];
  cite?: string;
  [key: string]: unknown;
};

function makeKey() {
  return crypto.randomUUID().replaceAll("-", "");
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function portableTextToHtml(value: unknown): string {
  if (typeof value === "string") {
    return value.split(/\r?\n/).map((line) => `<p>${escapeHtml(line)}</p>`).join("");
  }
  if (!Array.isArray(value)) return "<p></p>";

  return value.map((block) => {
    const children = Array.isArray(block?.children) ? block.children : [];
    const html = children.map((child: PortableSpan) => {
      let text = escapeHtml(child.text || "");
      if (child.marks?.includes("strong")) text = `<strong>${text}</strong>`;
      if (child.marks?.includes("em")) text = `<em>${text}</em>`;
      return text;
    }).join("");
    return `<p>${html}</p>`;
  }).join("") || "<p></p>";
}

function htmlToPortableText(html: string, keyPrefix: string): PortableBlock[] {
  const parsed = new DOMParser().parseFromString(html, "text/html");
  const paragraphs = Array.from(parsed.body.children);
  const sourceNodes = paragraphs.length ? paragraphs : [parsed.body];

  return sourceNodes.map((paragraph, paragraphIndex) => {
    const blockKey = paragraphIndex === 0 ? keyPrefix : `${keyPrefix}_${paragraphIndex}`;
    let spanIndex = 0;

    function readNode(node: Node, activeMarks: string[] = []): PortableSpan[] {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        return text ? [{ _type: "span", _key: `${blockKey}_${spanIndex++}`, text, marks: activeMarks }] : [];
      }
      if (!(node instanceof HTMLElement)) return [];
      if (node.tagName === "BR") {
        return [{ _type: "span", _key: `${blockKey}_${spanIndex++}`, text: "\n", marks: activeMarks }];
      }

      const marks = [...activeMarks];
      if (["STRONG", "B"].includes(node.tagName) && !marks.includes("strong")) marks.push("strong");
      if (["EM", "I"].includes(node.tagName) && !marks.includes("em")) marks.push("em");
      return Array.from(node.childNodes).flatMap((child) => readNode(child, marks));
    }

    const children = Array.from(paragraph.childNodes).flatMap((node) => readNode(node));
    return {
      _type: "block",
      _key: blockKey,
      style: "normal",
      markDefs: [],
      children: children.length ? children : [{ _type: "span", _key: `${blockKey}_empty`, text: "", marks: [] }],
    };
  });
}

function RichTextField({
  value,
  onChange,
  label,
  keyPrefix,
}: {
  value: unknown;
  onChange: (value: PortableBlock[]) => void;
  label: string;
  keyPrefix: string;
}) {
  const content = portableTextToHtml(value);
  const editor = useEditor({
    extensions: [StarterKit.configure({
      heading: false,
      blockquote: false,
      bulletList: false,
      orderedList: false,
      code: false,
      codeBlock: false,
      horizontalRule: false,
      strike: false,
    })],
    content,
    onUpdate: ({ editor: currentEditor }) => onChange(htmlToPortableText(currentEditor.getHTML(), keyPrefix)),
    editorProps: {
      attributes: {
        class: "min-h-24 px-3 py-3 text-sm leading-relaxed text-slate-800 focus:outline-none",
        "aria-label": label,
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) editor.commands.setContent(content);
  }, [content, editor]);

  return (
    <div className="overflow-hidden border border-slate-300 bg-white focus-within:border-forest">
      <div className="flex items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1">
        <button type="button" title="Bold" aria-label="Bold" onClick={() => editor?.chain().focus().toggleBold().run()} className="p-2 text-slate-700 hover:bg-slate-200"><Bold size={16} /></button>
        <button type="button" title="Italic" aria-label="Italic" onClick={() => editor?.chain().focus().toggleItalic().run()} className="p-2 text-slate-700 hover:bg-slate-200"><Italic size={16} /></button>
        <span className="mx-1 h-5 w-px bg-slate-300" />
        <button type="button" title="Undo" aria-label="Undo" onClick={() => editor?.chain().focus().undo().run()} className="p-2 text-slate-700 hover:bg-slate-200"><Undo size={16} /></button>
        <button type="button" title="Redo" aria-label="Redo" onClick={() => editor?.chain().focus().redo().run()} className="p-2 text-slate-700 hover:bg-slate-200"><Redo size={16} /></button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

export default function NewsContentEditor({
  content,
  imageFiles,
  onChange,
  onImageSelect,
  onImageRemove,
}: {
  content: NewsBlock[];
  imageFiles: Record<string, File>;
  onChange: (content: NewsBlock[]) => void;
  onImageSelect: (key: string, file: File) => void;
  onImageRemove: (key: string) => void;
}) {
  const imageInput = useRef<HTMLInputElement>(null);
  const previewUrls = useRef<Record<string, string>>({});
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});

  useEffect(() => () => {
    Object.values(previewUrls.current).forEach((url) => URL.revokeObjectURL(url));
  }, []);

  function setImageFile(key: string, file: File) {
    const previousUrl = previewUrls.current[key];
    if (previousUrl) URL.revokeObjectURL(previousUrl);
    const previewUrl = URL.createObjectURL(file);
    previewUrls.current[key] = previewUrl;
    setImagePreviews((current) => ({ ...current, [key]: previewUrl }));
    onImageSelect(key, file);
  }

  function addImage(file: File) {
    const key = makeKey();
    onChange([...content, { _type: "contentImage", _key: key, caption: "" }]);
    setImageFile(key, file);
  }

  function updateParagraph(index: number, blocks: PortableBlock[]) {
    onChange([...content.slice(0, index), ...blocks, ...content.slice(index + 1)]);
  }

  function addParagraph() {
    const key = makeKey();
    onChange([...content, {
      _type: "block",
      _key: key,
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: `${key}_span`, text: "", marks: [] }],
    }]);
  }

  function addQuote() {
    const key = makeKey();
    onChange([...content, {
      _type: "quote",
      _key: key,
      text: [{
        _type: "block",
        _key: `${key}_text`,
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", _key: `${key}_span`, text: "", marks: [] }],
      }],
      cite: "",
    }]);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">Add paragraphs or quotes. Select text to apply bold or italics; press Enter for a new paragraph.</p>
        <div className="flex gap-2">
          <button type="button" onClick={addParagraph} className="inline-flex items-center gap-1.5 border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"><Type size={14} /> Add paragraph</button>
          <button type="button" onClick={addQuote} className="inline-flex items-center gap-1.5 border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"><Quote size={14} /> Add quote</button>
          <button type="button" onClick={() => imageInput.current?.click()} className="inline-flex items-center gap-1.5 border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"><ImagePlus size={14} /> Add image</button>
          <input
            ref={imageInput}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) addImage(file);
              event.target.value = "";
            }}
          />
        </div>
      </div>

      {content.length === 0 && <p className="border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">No article content yet.</p>}

      {content.map((block, index) => {
        const key = block._key || `${block._type || "block"}-${index}`;
        if (block._type === "contentImage") {
          let existingImageUrl = "";
          if (block.image && typeof block.image === "object") {
            try {
              existingImageUrl = urlFor(block.image as Parameters<typeof urlFor>[0]).width(480).url();
            } catch {
              existingImageUrl = "";
            }
          }
          const preview = imagePreviews[String(key)] || existingImageUrl;
          return (
            <section key={key} className="space-y-3 border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">Article image</span>
                <button type="button" title="Remove image" aria-label="Remove image" onClick={() => {
                  onImageRemove(String(key));
                  onChange(content.filter((_, itemIndex) => itemIndex !== index));
                }} className="p-1.5 text-slate-500 hover:text-red-700"><Trash2 size={16} /></button>
              </div>
              {preview ? (
                <div role="img" aria-label="Article image preview" className="h-40 w-full bg-slate-100 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url("${preview}")` }} />
              ) : (
                <p className="border border-dashed border-slate-300 p-5 text-center text-sm text-slate-500">Choose an image to preview it here.</p>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                  <ImagePlus size={14} /> {preview ? "Replace image" : "Choose image"}
                  <input type="file" accept="image/*" className="sr-only" onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) setImageFile(String(key), file);
                    event.target.value = "";
                  }} />
                </label>
                {imageFiles[String(key)] && <span className="text-xs text-slate-500">{imageFiles[String(key)].name}</span>}
              </div>
              <input
                aria-label="Image caption"
                placeholder="Image caption (optional)"
                value={typeof block.caption === "string" ? block.caption : ""}
                onChange={(event) => onChange(content.map((item, itemIndex) => itemIndex === index ? { ...block, caption: event.target.value } : item))}
                className="w-full border border-slate-300 px-3 py-2 text-sm focus:border-forest focus:outline-none"
              />
            </section>
          );
        }

        if (block._type === "quote") {
          return (
            <section key={key} className="space-y-3 border border-slate-200 border-l-4 border-l-forest bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">Quote</span>
                <button type="button" title="Remove quote" aria-label="Remove quote" onClick={() => onChange(content.filter((_, itemIndex) => itemIndex !== index))} className="p-1.5 text-slate-500 hover:text-red-700"><Trash2 size={16} /></button>
              </div>
              <RichTextField
                label="Quote text"
                keyPrefix={`${key}_text`}
                value={block.text}
                onChange={(text) => onChange(content.map((item, itemIndex) => itemIndex === index ? { ...block, text } : item))}
              />
              <input
                aria-label="Quote citation"
                placeholder="Citation or author"
                value={typeof block.cite === "string" ? block.cite : ""}
                onChange={(event) => onChange(content.map((item, itemIndex) => itemIndex === index ? { ...block, cite: event.target.value } : item))}
                className="w-full border border-slate-300 bg-white px-3 py-2 text-sm focus:border-forest focus:outline-none"
              />
            </section>
          );
        }

        if (block._type === "block" && (!block.style || block.style === "normal")) {
          return (
            <section key={key} className="space-y-2 border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">Paragraph</span>
                <button type="button" title="Remove paragraph" aria-label="Remove paragraph" onClick={() => onChange(content.filter((_, itemIndex) => itemIndex !== index))} className="p-1.5 text-slate-500 hover:text-red-700"><Trash2 size={16} /></button>
              </div>
              <RichTextField
                label="Paragraph text"
                keyPrefix={String(block._key || `paragraph-${index}`)}
                value={[block]}
                onChange={(blocks) => updateParagraph(index, blocks)}
              />
            </section>
          );
        }

        const blockLabel = block._type === "block"
          ? `${String(block.style || "formatted")} block`
          : `${String(block._type || "content")} block`;
        return (
          <div key={key} className="border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-xs text-slate-600">
            {blockLabel} is preserved when you save this article.
          </div>
        );
      })}
    </div>
  );
}