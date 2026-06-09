import { useRef } from "react";
import { useLang } from "./LanguageContext";

const clients = [
  "ALPHAA", "NOURA", "SAWA", "ZEEN", "BLOOM", "MISK", "ZYAD", "TALAH",
  "NOOR", "HESSA", "LUJAIN", "SHAHD", "RAWAN", "DALAL", "GHADAH",
];

const clients2 = [
  "MALAK", "SUMAYAH", "HANA", "REEM", "AMANI", "WAFA", "DINA", "SARA",
  "LAMYA", "ABEER", "NOUF", "AFAF", "HIND", "DALIA", "RANA",
];

export function Clients() {
  const { isAr, t } = useLang();

  return (
    <section
      style={{
        direction: "ltr",
        background: "#000",
        padding: "80px 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        position: "relative",
      }}
    >
      {/* Pink gradient bg */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(251,100,145,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px", marginBottom: "3rem" }}>
        <p
          style={{
            fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: isAr ? "0.1em" : "0.25em",
            color: "#fb6491",
            textTransform: isAr ? "none" : "uppercase",
            textAlign: isAr ? "right" : "left",
            direction: isAr ? "rtl" : "ltr",
          }}
        >
          {t("Trusted By", "عملاؤنا")}
        </p>
      </div>

      <MarqueeRow items={clients} direction="left" speed={40} />
      <div style={{ marginTop: "1.5rem" }}>
        <MarqueeRow items={clients2} direction="right" speed={30} />
      </div>

      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

function MarqueeRow({ items, direction, speed }: { items: string[]; direction: "left" | "right"; speed: number }) {
  const doubled = [...items, ...items];

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      {/* Edge fades */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "100px",
        background: "linear-gradient(to right, #000, transparent)", zIndex: 2, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "100px",
        background: "linear-gradient(to left, #000, transparent)", zIndex: 2, pointerEvents: "none",
      }} />

      <div
        style={{
          display: "flex",
          gap: "48px",
          width: "max-content",
          animation: `${direction === "left" ? "marqueeLeft" : "marqueeRight"} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((name, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.15)",
              whiteSpace: "nowrap",
              padding: "8px 24px",
              border: "1px solid rgba(255,255,255,0.04)",
              cursor: "default",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "#fb6491";
              el.style.borderColor = "rgba(251,100,145,0.3)";
              el.style.transform = "scale(1.05)";
              el.style.textShadow = "0 0 20px rgba(251,100,145,0.4)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "rgba(255,255,255,0.15)";
              el.style.borderColor = "rgba(255,255,255,0.04)";
              el.style.transform = "scale(1)";
              el.style.textShadow = "none";
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
