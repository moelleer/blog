"use server";

import { PostPreview } from "@/types/posts";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

export async function getPosts() {
  const resolvedPath = path.resolve(process.cwd(), "_posts");
  const postFilePaths = fs.readdirSync(resolvedPath).filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  const postPreviews: PostPreview[] = [];

  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`${resolvedPath}/${postFilePath}`, "utf8");

    const serializedPost = await serialize(postFile, {
      parseFrontmatter: true,
    });

    postPreviews.push({
      ...serializedPost.frontmatter,
      slug: postFilePath.replace(".mdx", ""),
    } as PostPreview);
  }

  const sortedPostPreviews = postPreviews.toSorted((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (dateA.getTime() / 1000 < dateB.getTime() / 1000) {
      return 1;
    }

    if (dateA.getTime() / 1000 > dateB.getTime() / 1000) {
      return -1;
    }

    return 0;
  });

  return {
    postPreviews: sortedPostPreviews,
  };
}

export async function getPost(slug: string) {
  const resolvedPath = path.resolve(process.cwd(), "_posts");
  const postFilePaths = fs.readdirSync(resolvedPath).filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  const postFilePath = postFilePaths.find((path) => path === `${slug}.mdx`);

  if (!postFilePath) {
    return null;
  }

  const postFile = fs.readFileSync(`${resolvedPath}/${postFilePath}`, "utf8");

  const serializedPost = await serialize(postFile, {
    parseFrontmatter: true,
  });
  return { source: postFile, meta: serializedPost.frontmatter };
}
