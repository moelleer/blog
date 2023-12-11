import Img from "@/components/mdx/img";
import Pre from "@/components/mdx/pre";
import { getPost } from "@/lib/posts";
import "highlight.js/styles/tokyo-night-dark.min.css";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";
import rehypeHighlight from "rehype-highlight";

const options = {
  parseFrontmatter: true,
  mdxOptions: {
    rehypePlugins: [[rehypeHighlight]],
  },
};

const components = { pre: Pre, img: Img };

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
    metadataBase: new URL("https://blog-moelleer.vercel.app/"),
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
    <div className="w-full">
      <div className="max-w-screen-xl mx-auto pb-10 lg:pb-20">
        <figure className="relative aspect-video">
          <Image
            src={String(post.meta.previewImage)}
            alt={String(post.meta.title)}
            className="xl:rounded-xl object-cover"
            loading="eager"
            fill
          />
        </figure>
      </div>

      <div className="max-w-screen-md px-6 mx-auto prose lg:prose-xl dark:prose-invert pb-10 lg:pb-20 marker:text-black dark:marker:text-slate-300">
        <MDXRemote
          source={post.source}
          components={components as any}
          options={options as any}
        />
      </div>
    </div>
  );
}
