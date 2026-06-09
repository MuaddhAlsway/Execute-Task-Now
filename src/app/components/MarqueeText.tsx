import { useLang } from "./LanguageContext";

export function MarqueeText() {
  const { isAr } = useLang();

  const textEn = "Three Sisters KSA / Branding / Identity / Digital Experience / ";
  const textAr = "ثري سيسترز / علامات تجارية / هوية / تجارب رقمية / ";

  const text = isAr ? textAr : textEn;
  const doubled = text.repeat(4);

  return (
    <section
      style={{
        background: "#000",
        padding: "60px 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        position: "relative",
      }}
    >
      {/* Pink streak */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: "200px",
          height: "2px",
          background: "linear-gradient(to right, transparent, #fb6491, transparent)",
          animation: "pinkStreak 4s linear infinite",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <Row text={doubled} direction="left" size="clamp(2rem, 5vw, 4rem)" speed={60} opacity={1} />
      <div style={{ marginTop: "1rem" }}>
        <Row text={doubled} direction="right" size="clamp(1.2rem, 3vw, 2.4rem)" speed={45} opacity={0.25} />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Row text={doubled} direction="left" size="clamp(0.8rem, 1.5vw, 1.2rem)" speed={30} opacity={0.1} />
      </div>

      <style>{`
        @keyframes pinkStreak {
          from { left: -200px; }
          to { left: 100vw; }
        }
      `}</style>
    </section>
  );
}

function Row({ text, direction, size, speed, opacity }: {
  text: string;
  direction: "left" | "right";
  size: string;
  speed: number;
  opacity: number;
}) {
  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `${direction === "left" ? "marqueeLeft" : "marqueeRight"} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: size,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#fff",
            opacity,
            whiteSpace: "nowrap",
            padding: "0 2rem",
          }}
        >
          {text}
        </span>
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: size,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#fb6491",
            opacity: opacity * 0.5,
            whiteSpace: "nowrap",
            padding: "0 2rem",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
