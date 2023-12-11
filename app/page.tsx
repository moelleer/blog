import { getPosts } from "@/lib/posts";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Johan Möller",
  description: "Min blogg om lite allt möjligt",
};

export default async function Home() {
  const { postPreviews } = await getPosts();

  return (
    <div className="dark:prose-invert prose prose-a:no-underline hover:prose-a:underline px-6">
      <h1>Här var det en liten blogg!</h1>
      {postPreviews.map((postPreview) => {
        return (
          <Link href={postPreview.slug} key={postPreview.slug}>
            <div>
              <h2>{postPreview.title}</h2>
              <p>{postPreview.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
