import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "./LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const counterData = [
  { labelEn: "Profile Design", labelAr: "بروفايل", value: 45 },
  { labelEn: "Visual Identity", labelAr: "هويات بصرية", value: 100 },
  { labelEn: "Websites", labelAr: "مواقع", value: 6 },
  { labelEn: "Social Media", labelAr: "إدارة سوشال ميديا", value: 30 },
];

export function Counters() {
  const { isAr, t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      numRefs.current.forEach((el, i) => {
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: counterData[i].value,
          duration: 2,
          ease: "power2.out",
          onUpdate() {
            el.textContent = String(Math.round(obj.val));
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        direction: isAr ? "rtl" : "ltr",
        background: "#000",
        padding: "100px 48px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.25em",
            color: "#fb6491",
            textTransform: "uppercase",
            marginBottom: "4rem",
          }}
        >
          {t("Our Numbers", "أرقامنا")}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2px",
          }}
        >
          {counterData.map((item, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el; }}
              style={{
                padding: "48px 32px",
                background: "#060606",
                border: "1px solid rgba(255,255,255,0.04)",
                position: "relative",
                overflow: "hidden",
                opacity: 0,
                cursor: "default",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(251,100,145,0.25)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.04)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: "linear-gradient(to right, transparent, rgba(251,100,145,0.4), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
                className="card-top-glow"
              />

              <div
                style={{
                  fontFamily: isAr ? "'Cairo', sans-serif" : "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                  fontWeight: 800,
                  lineHeight: 1,
                  color: "#fb6491",
                  marginBottom: "0.3em",
                  textShadow: "0 0 40px rgba(251,100,145,0.25)",
                  letterSpacing: isAr ? "0" : "-0.02em",
                }}
              >
                <span ref={el => { numRefs.current[i] = el; }}>0</span>
                <span style={{ fontSize: "0.4em", color: "rgba(251,100,145,0.6)" }}>+</span>
              </div>

              <div
                style={{
                  fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 400,
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {isAr ? item.labelAr : item.labelEn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
