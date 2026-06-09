import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "./LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    en: "Profile Design",
    ar: "بروفايل",
    descEn: "Crafting your digital persona with precision and elegance.",
    descAr: "صياغة هويتك الرقمية بدقة وأناقة.",
    num: "01",
    slug: "profile-design",
  },
  {
    en: "Visual Identity",
    ar: "هويات بصرية",
    descEn: "Building brands that endure through impeccable design systems.",
    descAr: "بناء علامات تجارية راسخة من خلال أنظمة تصميم لا تُضاهى.",
    num: "02",
    slug: "visual-identity",
  },
  {
    en: "Websites",
    ar: "مواقع",
    descEn: "Digital experiences engineered for impact and conversion.",
    descAr: "تجارب رقمية مصممة للتأثير والتحويل.",
    num: "03",
    slug: "websites",
  },
  {
    en: "Social Media Management",
    ar: "إدارة حسابات سوشال ميديا",
    descEn: "Strategic content that builds community and drives growth.",
    descAr: "محتوى استراتيجي يبني مجتمعاً ويحقق نمواً.",
    num: "04",
    slug: "social-media-management",
  },
];

export function Services() {
  const { isAr, t } = useLang();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
            },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        direction: isAr ? "rtl" : "ltr",
        background: "#000",
        padding: "100px 48px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "5rem",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div>
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
              {t("What We Do", "ماذا نقدم")}
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
                margin: 0,
              }}
            >
              {t("Our Services", "خدماتنا")}
            </h2>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2px",
          }}
        >
          {services.map((service, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el; }}
              onClick={() => navigate(`/services/${service.slug}`)}
              style={{
                opacity: 0,
                background: "#050505",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "48px 36px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(251,100,145,0.4)";
                el.style.background = "#0a0405";
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = "0 20px 60px rgba(251,100,145,0.1)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.05)";
                el.style.background = "#050505";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Service number */}
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "rgba(251,100,145,0.4)",
                  marginBottom: "2rem",
                }}
              >
                {service.num}
              </div>

              {/* Pink top accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: isAr ? "auto" : 0,
                  right: isAr ? 0 : "auto",
                  width: 0,
                  height: "2px",
                  background: "#fb6491",
                  transition: "width 0.4s ease",
                }}
                className="service-accent"
              />

              <h3
                style={{
                  fontFamily: isAr ? "'Cairo', sans-serif" : "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: isAr ? "1.6rem" : "2.2rem",
                  lineHeight: isAr ? 1.4 : 1.1,
                  letterSpacing: isAr ? "0" : "-0.01em",
                  textTransform: isAr ? "none" : "uppercase",
                  color: "#fff",
                  marginBottom: "1.2rem",
                }}
              >
                {isAr ? service.ar : service.en}
              </h3>

              <p
                style={{
                  fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.4)",
                  margin: 0,
                }}
              >
                {isAr ? service.descAr : service.descEn}
              </p>

              {/* Arrow indicator */}
              <div
                style={{
                  marginTop: "2.5rem",
                  color: "#fb6491",
                  fontSize: "1.2rem",
                  opacity: 0,
                  transform: isAr ? "translateX(10px)" : "translateX(-10px)",
                  transition: "all 0.3s ease",
                }}
                className="service-arrow"
              >
                {isAr ? "←" : "→"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        div:hover .service-accent { width: 100% !important; }
        div:hover .service-arrow { opacity: 1 !important; transform: translateX(0) !important; }
      `}</style>
    </section>
  );
}
