import { writeClient } from "@/sanity/lib/writeClient";

type NewsContentBlock = {
  _type?: string;
  _key?: string;
  image?: {
    _type?: string;
    _key?: string;
    asset?: { _type?: string; _ref?: string };
  };
  [key: string]: unknown;
};

export class InvalidNewsContentError extends Error {}

export async function parseNewsPostContent(data: FormData): Promise<NewsContentBlock[]> {
  let content: unknown;
  try {
    content = JSON.parse(String(data.get("content") || "[]"));
  } catch {
    throw new InvalidNewsContentError("Article content is invalid.");
  }

  if (!Array.isArray(content)) {
    throw new InvalidNewsContentError("Article content must be a list of blocks.");
  }

  const preparedContent: NewsContentBlock[] = [];
  for (const value of content) {
    if (!value || typeof value !== "object") continue;
    const block = value as NewsContentBlock;

    if (block._type === "contentImage") {
      const file = data.get(`contentImage:${block._key}`);
      if (file instanceof File && file.size > 0) {
        const asset = await writeClient.assets.upload(
          "image",
          Buffer.from(await file.arrayBuffer()),
          { filename: file.name, contentType: file.type },
        );
        block.image = {
          _type: "image",
          _key: crypto.randomUUID(),
          asset: { _type: "reference", _ref: asset._id },
        };
      } else if (!block.image?.asset?._ref) {
        throw new InvalidNewsContentError("Choose an image for every article image block before saving.");
      }
    }

    preparedContent.push(block);
  }

  return preparedContent;
}