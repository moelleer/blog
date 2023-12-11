import Header from "@/components/header";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Johan Möller";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div className="w-full h-full grid place-items-center bg-slate-300 dark:bg-zinc-900">
        <Header />
      </div>
    ),
    { ...size }
  );
}
