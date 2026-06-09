import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);
  const scrollDir = useRef<"up" | "down">("down");

  // ── Track scroll direction + button visibility ─────────────────
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      scrollDir.current = y < lastY.current ? "up" : "down";
      lastY.current = y;
      setVisible(y > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Button fade ────────────────────────────────────────────────
  useEffect(() => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      opacity: visible ? 1 : 0,
      y: visible ? 0 : 16,
      pointerEvents: visible ? "all" : "none",
      duration: 0.35,
      ease: "power3.out",
    });
  }, [visible]);

  // ── IntersectionObserver: animate elements on scroll up ────────
  useEffect(() => {
    const timer = setTimeout(() => {
      // Grab direct children of sections — headlines, paragraphs, cards, buttons
      const selectors = [
        "section > div",
        "section > h1",
        "section > h2",
        "section > p",
        "nav > div",
        "footer > div",
      ];
      const elements = gsap.utils.toArray<HTMLElement>(selectors.join(", "));

      // Store original transforms so we don't break existing GSAP states
      const observed = new Set<HTMLElement>();

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target as HTMLElement;

            if (entry.isIntersecting && scrollDir.current === "up") {
              // Scrolling UP — animate from top (y: -30) coming down into place
              gsap.fromTo(
                el,
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", overwrite: "auto" }
              );
            } else if (entry.isIntersecting && scrollDir.current === "down") {
              // Scrolling DOWN — normal bottom-up entrance
              gsap.fromTo(
                el,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", overwrite: "auto" }
              );
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      elements.forEach((el) => {
        if (!observed.has(el)) {
          observer.observe(el);
          observed.add(el);
        }
      });

      return () => observer.disconnect();
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // ── Button click: smooth scroll to top ────────────────────────
  const handleClick = () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 1.2,
      ease: "power4.inOut",
    });
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        zIndex: 1000,
        width: "48px",
        height: "48px",
        background: "#000",
        border: "1px solid rgba(251,100,145,0.4)",
        color: "#fb6491",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
        opacity: 0,
        transform: "translateY(16px)",
        boxShadow: "0 0 24px rgba(251,100,145,0.15)",
        transition: "background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "#fb6491";
        el.style.color = "#000";
        el.style.borderColor = "#fb6491";
        el.style.boxShadow = "0 0 40px rgba(251,100,145,0.4)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "#000";
        el.style.color = "#fb6491";
        el.style.borderColor = "rgba(251,100,145,0.4)";
        el.style.boxShadow = "0 0 24px rgba(251,100,145,0.15)";
      }}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
