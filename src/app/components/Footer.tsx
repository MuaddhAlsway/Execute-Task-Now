import { useLang } from "./LanguageContext";

interface FooterProps {
  onScrollTo: (section: string) => void;
  onStartProject: () => void;
}

export function Footer({ onScrollTo, onStartProject }: FooterProps) {
  const { isAr, t } = useLang();

  const links = [
    { label: t("About Us", "من نحن"), section: "about" },
    { label: t("Services", "خدماتنا"), section: "services" },
    { label: t("Social Media", "سوشال ميديا"), section: "social" },
  ];

  return (
    <footer
      style={{
        direction: isAr ? "rtl" : "ltr",
        background: "#000",
        padding: "60px 48px 40px",
        borderTop: "1px solid rgba(251,100,145,0.15)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "3rem",
            marginBottom: "4rem",
          }}
        >
          {/* Logo */}
          <div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "1.6rem",
                letterSpacing: "0.04em",
                color: "#fff",
                marginBottom: "0.8rem",
              }}
            >
              THREE{" "}
              <span style={{ color: "#fb6491" }}>SISTERS</span>{" "}
              KSA
            </div>
            <p
              style={{
                fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 300,
                color: "rgba(255,255,255,0.3)",
                maxWidth: "260px",
                lineHeight: 1.7,
              }}
            >
              {t(
                "Branding & Advertising Studio — Saudi Arabia",
                "استوديو إبداعي للعلامات التجارية — المملكة العربية السعودية"
              )}
            </p>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  color: "rgba(251,100,145,0.6)",
                  textTransform: "uppercase",
                  marginBottom: "1.2rem",
                }}
              >
                {t("Navigation", "الروابط")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {links.map((l) => (
                  <button
                    key={l.section}
                    onClick={() => onScrollTo(l.section)}
                    style={{
                      fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.4)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      textAlign: isAr ? "right" : "left",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fb6491")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  onClick={onStartProject}
                  style={{
                    fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.4)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    textAlign: isAr ? "right" : "left",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fb6491")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                >
                  {t("Start a Project", "ابدأ مشروعك")}
                </button>
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  color: "rgba(251,100,145,0.6)",
                  textTransform: "uppercase",
                  marginBottom: "1.2rem",
                }}
              >
                {t("Social", "تواصل")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {["Instagram", "TikTok", "LinkedIn", "Behance"].map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.4)",
                      cursor: "pointer",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fb6491")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 300,
              color: "rgba(255,255,255,0.2)",
            }}
          >
            © 2025 Three Sisters KSA. {t("All rights reserved.", "جميع الحقوق محفوظة.")}
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 300,
              color: "rgba(255,255,255,0.2)",
            }}
          >
            {t("Made with", "صُنع بـ")}{" "}
            <span style={{ color: "#fb6491" }}>♥</span>
            {" "}{t("by MULAB", "بواسطة MULAB")}
          </p>
        </div>
      </div>
    </footer>
  );
}
