import { ImageResponse } from "next/og";

export const alt = "Kalabe Kebede: Senior Software Engineer | Forward Deployed Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0d1017";
const MUTED = "#495064";
const INDIGO = "#3b3fc4";
const CYAN = "#0b6f8a";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "#fbfbfc",
          backgroundImage:
            "linear-gradient(to right, rgba(13,16,23,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,16,23,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: INK,
        }}
      >
        <div
          style={{
            display: "flex",
            height: 10,
            width: "100%",
            backgroundImage: `linear-gradient(to right, ${INDIGO}, ${CYAN})`,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "52px 72px 56px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                borderRadius: 14,
                background: INDIGO,
                color: "#ffffff",
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: -2,
              }}
            >
              KK
            </div>
            <div style={{ display: "flex", fontSize: 28, color: MUTED }}>
              6+ years software engineering
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 104,
                fontWeight: 700,
                letterSpacing: -3,
                lineHeight: 1.05,
              }}
            >
              Kalabe Kebede
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 20,
                fontSize: 46,
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              <div style={{ display: "flex" }}>Senior Software Engineer</div>
              <div style={{ display: "flex", color: MUTED }}>Forward Deployed Engineer</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                lineHeight: 1.35,
                color: INK,
                maxWidth: 1040,
              }}
            >
              Java · Spring Boot · Distributed Systems · AWS · Kafka · Data Engineering · Python/FastAPI · RAG &amp; Applied AI
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 14,
                fontSize: 26,
                fontWeight: 600,
                color: CYAN,
              }}
            >
              Banking · Distributed Systems · Applied AI
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
