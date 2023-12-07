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
    <main className="bg-slate-300">
      <div className="max-w-6xl mx-auto py-20">
        <figure className="relative aspect-video">
          <Image
            src={String(post.meta.previewImage)}
            alt={String(post.meta.title)}
            className="rounded-xl"
            fill
          />
        </figure>
      </div>

      <div className="max-w-3xl mx-auto prose lg:prose-xl pb-20">
        <MDXRemote source={post.source} options={{ parseFrontmatter: true }} />
      </div>
    </main>
  );
}
