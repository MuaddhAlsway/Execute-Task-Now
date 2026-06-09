import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageContext";

interface NavbarProps {
  onStartProject: () => void;
  onScrollTo: (section: string) => void;
}

export function Navbar({ onStartProject, onScrollTo }: NavbarProps) {
  const { lang, setLang, isAr, t } = useLang();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 100);
      setScrolled(y > 50);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t("About Us", "من نحن"), section: "about" },
    { label: t("Services", "خدماتنا"), section: "services" },
    { label: t("Social Media", "سوشال ميديا"), section: "social" },
  ];

  return (
    <nav
      style={{
        direction: isAr ? "rtl" : "ltr",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(251,100,145,0.08)" : "none",
        transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), background 0.4s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between"
    >
      {/* Logo */}
      <div
        className="cursor-pointer select-none"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: "1.4rem",
            letterSpacing: "0.04em",
            color: "#fff",
          }}
        >
          THREE{" "}
          <span style={{ color: "#fb6491" }}>SISTERS</span>{" "}
          KSA
        </span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <button
            key={link.section}
            onClick={() => onScrollTo(link.section)}
            style={{
              fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
              fontSize: "0.875rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "#aaa",
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              padding: "4px 0",
              transition: "color 0.2s",
            }}
            className="nav-link group"
            onMouseEnter={e => (e.currentTarget.style.color = "#fb6491")}
            onMouseLeave={e => (e.currentTarget.style.color = "#aaa")}
          >
            {link.label}
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 0,
                height: "1px",
                background: "#fb6491",
                transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
              }}
              className="nav-underline"
            />
          </button>
        ))}

        <button
          onClick={onStartProject}
          style={{
            fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "#000",
            background: "#fb6491",
            border: "none",
            cursor: "pointer",
            padding: "10px 24px",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "#fff";
            (e.currentTarget as HTMLElement).style.color = "#000";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "#fb6491";
            (e.currentTarget as HTMLElement).style.color = "#000";
          }}
        >
          {t("Start a Project", "ابدأ مشروعك")}
        </button>

        {/* Language Toggle */}
        <button
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "#fb6491",
            background: "transparent",
            border: "1px solid rgba(251,100,145,0.4)",
            cursor: "pointer",
            padding: "6px 14px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "#fb6491";
            (e.currentTarget as HTMLElement).style.color = "#000";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "#fb6491";
          }}
        >
          {lang === "en" ? "AR" : "EN"}
        </button>
      </div>

      {/* Mobile: lang + cta */}
      <div className="flex md:hidden items-center gap-3">
        <button
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#fb6491",
            background: "transparent",
            border: "1px solid rgba(251,100,145,0.4)",
            cursor: "pointer",
            padding: "5px 10px",
          }}
        >
          {lang === "en" ? "AR" : "EN"}
        </button>
        <button
          onClick={onStartProject}
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#000",
            background: "#fb6491",
            border: "none",
            cursor: "pointer",
            padding: "8px 16px",
          }}
        >
          {t("Start", "ابدأ")}
        </button>
      </div>
    </nav>
  );
}
