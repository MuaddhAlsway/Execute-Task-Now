import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!isScrolling.current) setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade button in/out
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

  const handleClick = () => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    setVisible(false);

    // Collect all animatable sections/elements on the page
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        "section, nav, footer, [data-scroll-animate]"
      )
    ).filter(el => {
      const rect = el.getBoundingClientRect();
      // Only elements currently above or near viewport top
      return rect.bottom > 0;
    });

    // Sort top to bottom (they'll animate in that order as we scroll up)
    sections.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

    // Step 1: fade out current view
    gsap.to(sections.slice(0, 3), {
      opacity: 0,
      y: 60,
      duration: 0.3,
      ease: "power2.in",
      stagger: 0.04,
      onComplete: () => {
        // Step 2: instant jump to top
        window.scrollTo(0, 0);

        // Step 3: re-collect all sections now visible from top
        const allSections = Array.from(
          document.querySelectorAll<HTMLElement>(
            "section, nav, footer"
          )
        );

        // Set all off-screen downward
        gsap.set(allSections, { opacity: 0, y: -50 });

        // Step 4: animate them top-to-bottom cascading in
        gsap.to(allSections, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          onComplete: () => {
            // Clean up inline styles so normal scroll behavior resumes
            gsap.set(allSections, { clearProps: "opacity,y,transform" });
            isScrolling.current = false;
            setVisible(false);
          },
        });
      },
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
