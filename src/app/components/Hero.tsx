import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLang } from "./LanguageContext";

interface HeroProps {
  onStartProject: () => void;
}

export function Hero({ onStartProject }: HeroProps) {
  const { isAr, t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        line1Ref.current,
        { y: 80, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.2 }
      )
        .fromTo(
          line2Ref.current,
          { y: 80, opacity: 0, clipPath: "inset(0 0 100% 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.2 },
          "-=0.8"
        )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        );

      gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isAr]);

  const headlineStyle: React.CSSProperties = {
    fontFamily: isAr ? "'Cairo', sans-serif" : "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    lineHeight: isAr ? 1.3 : 1.0,
    letterSpacing: isAr ? "0.02em" : "-0.02em",
    color: "#fff",
    textTransform: isAr ? "none" : "uppercase",
  };

  return (
    <section
      ref={containerRef}
      style={{
        direction: isAr ? "rtl" : "ltr",
        position: "relative",
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "120px 48px 80px",
      }}
    >
      {/* Background pink glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(251,100,145,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* Noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          opacity: 0.4,
        }}
      />

      {/* Floating orbs */}
      <FloatingOrb x="10%" y="20%" size={200} delay={0} />
      <FloatingOrb x="80%" y="70%" size={140} delay={1.5} />
      <FloatingOrb x="60%" y="15%" size={80} delay={0.8} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", width: "100%", textAlign: isAr ? "right" : "left" }}>
        <div style={{ overflow: "hidden", marginBottom: "0.15em" }}>
          <div
            ref={line1Ref}
            style={{ ...headlineStyle, fontSize: "clamp(4rem, 12vw, 11rem)", opacity: 0 }}
          >
            {t("We Build", "نبني")}
          </div>
        </div>
        <div style={{ overflow: "hidden", marginBottom: "0.5em" }}>
          <div
            ref={line2Ref}
            style={{ ...headlineStyle, fontSize: "clamp(4rem, 12vw, 11rem)", color: "#fb6491", opacity: 0 }}
          >
            {t("Visual Empires", "إمبراطوريات بصرية")}
          </div>
        </div>

        <div
          ref={subRef}
          style={{
            fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
            fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
            fontWeight: 300,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.5)",
            maxWidth: "520px",
            marginBottom: "3rem",
            opacity: 0,
          }}
        >
          {t(
            "Branding & Advertising Studio — Saudi Arabia",
            "استوديو إبداعي للعلامات التجارية والإعلان — المملكة العربية السعودية"
          )}
        </div>

        <div
          ref={ctaRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            opacity: 0,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onStartProject}
            style={{
              fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#000",
              background: "#fb6491",
              border: "none",
              cursor: "pointer",
              padding: "18px 44px",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",
              boxShadow: "0 0 40px rgba(251,100,145,0.3)",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 0 60px rgba(251,100,145,0.6)";
              el.style.transform = "scale(1.04)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 0 40px rgba(251,100,145,0.3)";
              el.style.transform = "scale(1)";
            }}
          >
            {t("Start a Project", "ابدأ مشروعك")}
          </button>

          {/* Divider */}
          <div style={{ width: "1px", height: "36px", background: "rgba(255,255,255,0.1)" }} />

          {/* Instagram */}
          <a
            href="https://www.instagram.com/three_sisters_ksa/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(255,255,255,0.35)",
              transition: "color 0.25s, transform 0.25s",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "#fb6491";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.15)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="5"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>

          {/* Behance */}
          <a
            href="https://www.behance.net/three_sisters_ksa"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(255,255,255,0.35)",
              transition: "color 0.25s, transform 0.25s",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "#fb6491";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.15)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.7zM15.97 13h5.734c-.317-1.385-1.326-2.062-2.877-2.062-1.575 0-2.58.694-2.857 2.062zM3 6l2.443 3.759a1.504 1.504 0 0 1 0 1.584L3 15.006h3.147l1.777-2.74.005-.007 1.778 2.747H13L10.557 11.3a1.504 1.504 0 0 1 0-1.584L13 6H9.707L7.929 8.747 6.152 6H3z"/>
            </svg>
          </a>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: isAr ? "auto" : "0",
            right: isAr ? "0" : "auto",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "60px",
              background: "linear-gradient(to bottom, rgba(251,100,145,0.6), transparent)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              writingMode: isAr ? "horizontal-tb" : "vertical-rl",
            }}
          >
            {t("Scroll", "انتقل")}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }
      `}</style>
    </section>
  );
}

function FloatingOrb({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: -30,
      x: 15,
      duration: 4 + delay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay,
    });
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(251,100,145,0.06) 0%, transparent 70%)",
        border: "1px solid rgba(251,100,145,0.05)",
        pointerEvents: "none",
      }}
    />
  );
}
