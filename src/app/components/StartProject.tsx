import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLang } from "./LanguageContext";

interface StartProjectProps {
  open?: boolean;
  onClose: () => void;
}

const projectTypes = {
  en: ["Profile Design", "Visual Identity", "Websites", "Social Media Management"],
  ar: ["بروفايل", "هويات بصرية", "مواقع", "إدارة حسابات سوشال ميديا"],
};

export function StartProject({ open = true, onClose }: StartProjectProps) {
  const { isAr, t } = useLang();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    // Set initial states via GSAP (not inline style) so they always animate in
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(panelRef.current, { y: 60, opacity: 0 });

    gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(panelRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" });

    // Small delay to let form render before querying fields
    const timer = setTimeout(() => {
      const fields = formRef.current?.querySelectorAll(".form-field");
      if (fields && fields.length > 0) {
        gsap.set(fields, { y: 20, opacity: 0 });
        gsap.to(fields, {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [open]);

  const handleClose = () => {
    gsap.to(panelRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: onClose,
    });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.35, ease: "power2.in" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const budgets = ["< 5K SAR", "5K–15K SAR", "15K–50K SAR", "50K+ SAR"];
  const types = isAr ? projectTypes.ar : projectTypes.en;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    color: "#fff",
    fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
    fontSize: "0.95rem",
    fontWeight: 300,
    padding: "14px 0",
    outline: "none",
    transition: "border-color 0.3s",
    textAlign: isAr ? "right" : "left",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.7rem",
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "0.4rem",
  };

  return (
    <div
      ref={overlayRef}
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 20px 60px",
      }}
    >
      <div
        ref={panelRef}
        style={{
          direction: isAr ? "rtl" : "ltr",
          background: "#050505",
          border: "1px solid rgba(251,100,145,0.2)",
          width: "100%",
          maxWidth: "680px",
          padding: "clamp(36px, 5vw, 64px)",
          position: "relative",
          boxShadow: "0 0 80px rgba(251,100,145,0.12)",
        }}
      >
        {/* Close / Back */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "24px",
            right: isAr ? "auto" : "24px",
            left: isAr ? "24px" : "auto",
            background: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = "#fb6491";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(251,100,145,0.4)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          ×
        </button>

        {/* Label */}
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            color: "#fb6491",
            textTransform: "uppercase",
            marginBottom: "0.8rem",
          }}
        >
          {t("New Inquiry", "استفسار جديد")}
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: isAr ? "'Cairo', sans-serif" : "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: isAr ? "2.4rem" : "3.2rem",
            lineHeight: isAr ? 1.3 : 1.0,
            letterSpacing: isAr ? "0" : "-0.02em",
            textTransform: isAr ? "none" : "uppercase",
            color: "#fff",
            marginBottom: "3rem",
          }}
        >
          {t("Start a Project", "ابدأ مشروعك")}
        </h2>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "4rem",
                fontWeight: 800,
                color: "#fb6491",
                textShadow: "0 0 40px rgba(251,100,145,0.4)",
                marginBottom: "1rem",
              }}
            >
              ✓
            </div>
            <p
              style={{
                fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
                fontSize: "1.1rem",
                fontWeight: 300,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.7,
              }}
            >
              {t(
                "Your message has been received. We'll be in touch soon.",
                "تم استلام رسالتك. سنتواصل معك قريباً."
              )}
            </p>
            <button
              onClick={handleClose}
              style={{
                marginTop: "2.5rem",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#000",
                background: "#fb6491",
                border: "none",
                cursor: "pointer",
                padding: "14px 36px",
              }}
            >
              {t("Close", "إغلاق")}
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0 2.5rem",
              }}
            >
              {/* Name */}
              <div className="form-field" style={{ marginBottom: "2rem" }}>
                <label style={labelStyle}>{t("Name", "الاسم")}</label>
                <input
                  required
                  style={inputStyle}
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  onFocus={e => (e.currentTarget.style.borderColor = "#fb6491")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                  placeholder={isAr ? "اسمك الكريم" : "Your name"}
                />
              </div>

              {/* Company */}
              <div className="form-field" style={{ marginBottom: "2rem" }}>
                <label style={labelStyle}>{t("Company", "الشركة")}</label>
                <input
                  style={inputStyle}
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  onFocus={e => (e.currentTarget.style.borderColor = "#fb6491")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                  placeholder={isAr ? "اسم الشركة (اختياري)" : "Company (optional)"}
                />
              </div>

              {/* Email */}
              <div className="form-field" style={{ marginBottom: "2rem", gridColumn: "1 / -1" }}>
                <label style={labelStyle}>{t("Email", "البريد الإلكتروني")}</label>
                <input
                  required
                  type="email"
                  style={inputStyle}
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={e => (e.currentTarget.style.borderColor = "#fb6491")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                  placeholder={isAr ? "بريدك الإلكتروني" : "your@email.com"}
                />
              </div>

              {/* Project Type */}
              <div className="form-field" style={{ marginBottom: "2rem" }}>
                <label style={labelStyle}>{t("Project Type", "نوع المشروع")}</label>
                <select
                  required
                  style={{ ...inputStyle, cursor: "pointer" }}
                  value={form.projectType}
                  onChange={e => setForm({ ...form, projectType: e.target.value })}
                  onFocus={e => (e.currentTarget.style.borderColor = "#fb6491")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                >
                  <option value="" style={{ background: "#050505" }}>
                    {isAr ? "اختر نوع المشروع" : "Select type"}
                  </option>
                  {types.map((type) => (
                    <option key={type} value={type} style={{ background: "#050505" }}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div className="form-field" style={{ marginBottom: "2rem" }}>
                <label style={labelStyle}>{t("Budget", "الميزانية")}</label>
                <select
                  style={{ ...inputStyle, cursor: "pointer" }}
                  value={form.budget}
                  onChange={e => setForm({ ...form, budget: e.target.value })}
                  onFocus={e => (e.currentTarget.style.borderColor = "#fb6491")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                >
                  <option value="" style={{ background: "#050505" }}>
                    {isAr ? "اختر الميزانية" : "Select budget"}
                  </option>
                  {budgets.map((b) => (
                    <option key={b} value={b} style={{ background: "#050505" }}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="form-field" style={{ marginBottom: "3rem", gridColumn: "1 / -1" }}>
                <label style={labelStyle}>{t("Message", "الرسالة")}</label>
                <textarea
                  rows={4}
                  style={{
                    ...inputStyle,
                    resize: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                  }}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  onFocus={e => (e.currentTarget.style.borderColor = "#fb6491")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                  placeholder={isAr ? "أخبرنا عن مشروعك" : "Tell us about your project"}
                />
              </div>
            </div>

            <button
              type="submit"
              className="form-field"
              disabled={loading}
              style={{
                fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#000",
                background: loading ? "rgba(251,100,145,0.5)" : "#fb6491",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                padding: "18px 48px",
                transition: "all 0.3s ease",
                boxShadow: "0 0 30px rgba(251,100,145,0.25)",
              }}
              onMouseEnter={e => {
                if (loading) return;
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "scale(1.04)";
                el.style.boxShadow = "0 0 50px rgba(251,100,145,0.45)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "scale(1)";
                el.style.boxShadow = "0 0 30px rgba(251,100,145,0.25)";
              }}
            >
              {loading
                ? t("Sending...", "جارٍ الإرسال...")
                : t("Send Inquiry", "أرسل الاستفسار")}
            </button>

            {error && (
              <p style={{
                marginTop: "1rem",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                color: "#fb6491",
                opacity: 0.8,
              }}>
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
