import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    // Hide default cursor globally
    document.documentElement.style.cursor = "none";

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    // Dot follows instantly
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY });
    };
    window.addEventListener("mousemove", onMove);

    // Ring lags behind with GSAP ticker
    const ticker = gsap.ticker.add(() => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
      gsap.set(label, { x: ringX + 24, y: ringY - 12 });
    });

    // Hover states
    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest("a, button, [role='button'], [style*='cursor: pointer']");

      if (isLink) {
        gsap.to(dot, { scale: 0, duration: 0.3, ease: "power3.out" });
        gsap.to(ring, {
          width: 64,
          height: 64,
          borderColor: "#fb6491",
          backgroundColor: "rgba(251,100,145,0.08)",
          duration: 0.35,
          ease: "power3.out",
        });

        // Show label if data-cursor exists
        const cursorText = (isLink as HTMLElement).dataset.cursor;
        if (cursorText) {
          label.textContent = cursorText;
          gsap.to(label, { opacity: 1, duration: 0.25 });
        }
      }
    };

    const onLeave = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
      gsap.to(ring, {
        width: 36,
        height: 36,
        borderColor: "rgba(251,100,145,0.5)",
        backgroundColor: "transparent",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(label, { opacity: 0, duration: 0.2 });
    };

    const onClick = () => {
      gsap.timeline()
        .to(ring, { scale: 0.75, duration: 0.1, ease: "power2.in" })
        .to(ring, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    };

    // Hide when leaving window
    const onLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };
    const onEnterWindow = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("click", onClick);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(ticker);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1px solid rgba(251,100,145,0.5)",
          backgroundColor: "transparent",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "normal",
          willChange: "transform",
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          backgroundColor: "#fb6491",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          boxShadow: "0 0 8px rgba(251,100,145,0.8)",
        }}
      />

      {/* Hover label */}
      <div
        ref={labelRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#fb6491",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          whiteSpace: "nowrap",
        }}
      />

      <style>{`
        * { cursor: none !important; }
      `}</style>
    </>
  );
}
