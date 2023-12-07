"use server";

import { getPost } from "@/lib/posts";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: `${String(post.meta.title)} - Johan Möller`,
    description: String(post.meta.description),
    openGraph: {
      images: [String(post.meta.previewImage)],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <main className="bg-slate-300 dark:bg-black">
      <div className="max-w-screen-xl mx-auto py-10 lg:py-20">
        <figure className="relative aspect-video">
          <Image
            src={String(post.meta.previewImage)}
            alt={String(post.meta.title)}
            className="xl:rounded-xl"
            fill
          />
        </figure>
      </div>

      <div className="max-w-3xl px-6 mx-auto prose lg:prose-xl dark:prose-invert pb-10 lg:pb-20 marker:text-black dark:marker:text-slate-300">
        <MDXRemote source={post.source} options={{ parseFrontmatter: true }} />
      </div>
    </main>
  );
}
