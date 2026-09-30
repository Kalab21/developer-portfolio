import { ImageResponse } from "next/og";

export const alt = "Kalabe Kebede: Senior Software Engineer | Forward Deployed Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#090b11",
          color: "#eceef3",
        }}
      >
        <div style={{ display: "flex", height: 8, width: 120, background: "#9aa6ff", marginBottom: 40 }} />
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>Kalabe Kebede</div>
        <div style={{ fontSize: 40, marginTop: 20, color: "#a5adbd" }}>
          Senior Software Engineer | Forward Deployed Engineer
        </div>
        <div style={{ fontSize: 26, marginTop: 48, color: "#67d4ee" }}>
          Java · Spring Boot · Distributed Systems · AWS · Kafka · Python/FastAPI · RAG
        </div>
      </div>
    ),
    size,
  );
}
