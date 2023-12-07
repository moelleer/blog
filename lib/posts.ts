"use server";

import { PostPreview } from "@/types/posts";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

export async function getPosts() {
  const postFilePaths = fs.readdirSync("_posts").filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  const postPreviews: PostPreview[] = [];

  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`_posts/${postFilePath}`, "utf8");

    const serializedPost = await serialize(postFile, {
      parseFrontmatter: true,
    });

    postPreviews.push({
      ...serializedPost.frontmatter,
      slug: postFilePath.replace(".mdx", ""),
    } as PostPreview);
  }

  return {
    postPreviews,
  };
}

export async function getPost(slug: string) {
  try {
    const postFile = fs.readFileSync(`_posts/${slug}.mdx`);
    const serializedPost = await serialize(postFile, {
      parseFrontmatter: true,
    });
    return { source: postFile, meta: serializedPost.frontmatter };
  } catch (e) {
    return null;
  }
}
