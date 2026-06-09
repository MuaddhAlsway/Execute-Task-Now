import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "./LanguageContext";

gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps {
  onStartProject: () => void;
}

export function CTASection({ onStartProject }: CTASectionProps) {
  const { isAr, t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
      tl.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      ).fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        direction: isAr ? "rtl" : "ltr",
        background: "#000",
        padding: "140px 48px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Big glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(251,100,145,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Drift light */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "20%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(251,100,145,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "driftLight 8s ease-in-out infinite",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <h2
          ref={headlineRef}
          style={{
            fontFamily: isAr ? "'Cairo', sans-serif" : "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3rem, 9vw, 9rem)",
            lineHeight: isAr ? 1.3 : 1.0,
            letterSpacing: isAr ? "0" : "-0.02em",
            textTransform: isAr ? "none" : "uppercase",
            color: "#fff",
            marginBottom: "1.5rem",
            opacity: 0,
          }}
        >
          {t("Let's Build", "لنبني")}
          <br />
          <span style={{ color: "#fb6491" }}>
            {t("Something Iconic", "شيئاً أسطورياً")}
          </span>
        </h2>

        <p
          style={{
            fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
            fontSize: "1rem",
            fontWeight: 300,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "3.5rem",
          }}
        >
          {t(
            "Your vision. Our craft. Extraordinary results.",
            "رؤيتك. حرفيتنا. نتائج استثنائية."
          )}
        </p>

        <button
          ref={ctaRef}
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
            padding: "20px 56px",
            position: "relative",
            overflow: "hidden",
            opacity: 0,
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: "0 0 50px rgba(251,100,145,0.35)",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "scale(1.05)";
            el.style.boxShadow = "0 0 80px rgba(251,100,145,0.55)";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "scale(1)";
            el.style.boxShadow = "0 0 50px rgba(251,100,145,0.35)";
          }}
        >
          {t("Start a Project", "ابدأ مشروعك")}
        </button>
      </div>

      <style>{`
        @keyframes driftLight {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(80px, -40px) scale(1.1); }
          66% { transform: translate(-40px, 60px) scale(0.9); }
        }
      `}</style>
    </section>
  );
}
