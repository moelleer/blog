import { getPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
  const { postPreviews } = await getPosts();

  return (
    <div className="dark:prose-invert prose prose-a:no-underline hover:prose-a:underline">
      <h1>Välkommen till min blogg!</h1>
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
