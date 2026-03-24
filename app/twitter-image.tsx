import { ImageResponse } from "next/og";

import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site-config";

export const runtime = "edge";
export const alt = SITE_NAME;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #f6efe5 0%, #eef5ff 50%, #f4f8ef 100%)",
          padding: "64px",
          color: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(15,23,42,0.12)",
            borderRadius: "36px",
            padding: "44px",
            background: "rgba(255,255,255,0.7)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#475569",
            }}
          >
            Prompting Docs
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", fontSize: 68, fontWeight: 700 }}>
              {SITE_NAME}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                lineHeight: 1.5,
                color: "#334155",
                maxWidth: "900px",
              }}
            >
              {SITE_DESCRIPTION}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#0f172a",
            }}
          >
            96개 기준 문서 · 검색 · 학습 경로
          </div>
        </div>
      </div>
    ),
    size,
  );
}
