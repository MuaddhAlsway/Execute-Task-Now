import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "./LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const platforms = [
  {
    name: "Instagram",
    handle: "@threesisters.ksa",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="5"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@threesisters.ksa",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "Three Sisters KSA",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: "Behance",
    handle: "Three Sisters KSA",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.7zM15.97 13h5.734c-.317-1.385-1.326-2.062-2.877-2.062-1.575 0-2.58.694-2.857 2.062zM3 6l2.443 3.759a1.504 1.504 0 0 1 0 1.584L3 15.006h3.147l1.777-2.74.005-.007 1.778 2.747H13L10.557 11.3a1.504 1.504 0 0 1 0-1.584L13 6H9.707L7.929 8.747 6.152 6H3z"/>
      </svg>
    ),
  },
];

export function SocialMedia() {
  const { isAr, t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="social"
      style={{
        direction: isAr ? "rtl" : "ltr",
        background: "#000",
        padding: "100px 48px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: isAr ? "auto" : "-100px",
          left: isAr ? "-100px" : "auto",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(251,100,145,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.25em",
            color: "#fb6491",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          {t("Find Us", "تابعنا")}
        </p>
        <h2
          style={{
            fontFamily: isAr ? "'Cairo', sans-serif" : "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 5vw, 5rem)",
            lineHeight: isAr ? 1.3 : 1.0,
            letterSpacing: isAr ? "0" : "-0.02em",
            textTransform: isAr ? "none" : "uppercase",
            color: "#fff",
            marginBottom: "4rem",
          }}
        >
          {t("Social Media", "سوشال ميديا")}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2px",
          }}
        >
          {platforms.map((p, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el; }}
              style={{
                opacity: 0,
                background: "#050505",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "48px 36px",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(251,100,145,0.4)";
                el.style.transform = "translateY(-6px) scale(1.01)";
                el.style.boxShadow = "0 20px 60px rgba(251,100,145,0.12)";
                const icon = el.querySelector(".social-icon") as HTMLElement;
                if (icon) icon.style.color = "#fb6491";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.05)";
                el.style.transform = "translateY(0) scale(1)";
                el.style.boxShadow = "none";
                const icon = el.querySelector(".social-icon") as HTMLElement;
                if (icon) icon.style.color = "rgba(255,255,255,0.3)";
              }}
            >
              <div
                className="social-icon"
                style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.3s ease" }}
              >
                {p.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: isAr ? "'Cairo', sans-serif" : "'Barlow Condensed', sans-serif",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "#fff",
                    marginBottom: "0.3rem",
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 300,
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  {p.handle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
