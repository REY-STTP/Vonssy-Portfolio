import { ImageResponse } from "next/og";

export const alt = "Vonssy | Web3 Builder & Automation Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          padding: 96,
          backgroundColor: "#111411",
          color: "#e4e8e1",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#8a948a" }}>
          VONSSY · PORTFOLIO
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#e4e8e1",
          }}
        >
          Web3 Builder &amp; Automation Engineer
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#b3bdb3" }}>
          Software that does things.
        </div>
      </div>
    ),
    size
  );
}
