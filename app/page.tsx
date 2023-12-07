"use server";

import { getPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
  const { postPreviews } = await getPosts();
  return (
    <main className="flex bg-gradient-to-b from-slate-100 to-slate-300 min-h-screen flex-col items-center justify-between p-24">
      <div className="dark:prose-invert prose lg:prose-xl prose-a:no-underline hover:prose-a:underline">
        <h1>Min blogg!</h1>
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
    </main>
  );
}
