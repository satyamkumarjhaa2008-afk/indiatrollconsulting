import { ImageResponse } from "next/og";

export const alt = "IndiaTroll Research & Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "#111111",
          color: "#ffffff",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          IndiaTroll
        </div>
        <div style={{ fontSize: 62, lineHeight: 1.08, fontWeight: 800 }}>
          Research &amp; Consulting
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.4,
            marginTop: 30,
            color: "#d6d6d6",
          }}
        >
          Political Research • Ground Intelligence • Strategy
        </div>
        <div style={{ fontSize: 20, marginTop: 42, color: "#a8a8a8" }}>
          indiatrollconsulting.com
        </div>
      </div>
    ),
    size,
  );
}
