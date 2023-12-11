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
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: "90px",
            height: "90px",
            fontSize: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid #000",
            borderRadius: "100%",
          }}
        >
          JM
        </span>
      </div>
    ),
    { ...size }
  );
}
