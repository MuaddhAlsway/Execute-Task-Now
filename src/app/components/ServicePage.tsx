import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import gsap from "gsap";
import { useLang } from "./LanguageContext";

const WA = "https://wa.me/966553254299";
const PINK = "#fb6491";

const serviceData = {
  "profile-design": {
    num: "01",
    en: "Profile Design",
    ar: "بروفايل",
    taglineEn: "Crafting your digital persona with precision and elegance.",
    taglineAr: "صياغة هويتك الرقمية بدقة وأناقة.",
    descEn: "Your profile is your first impression — and in today's world, it needs to stop the scroll. We design social media profiles, LinkedIn presences, and personal brand visuals that communicate authority, taste, and personality in a single glance.",
    descAr: "ملفك الشخصي هو انطباعك الأول — وفي عالم اليوم، يجب أن يوقف التمرير. نصمم ملفات تعريفية لوسائل التواصل الاجتماعي وحضور LinkedIn ومرئيات العلامة التجارية الشخصية التي تنقل السلطة والذوق والشخصية في لمحة واحدة.",
    whatEn: ["Instagram & LinkedIn profile visuals","Bio & highlights covers","Profile photo direction & retouching","Personal brand color palette","Typography & font system","Digital business card design"],
    whatAr: ["مرئيات ملف إنستغرام ولينكدإن","أغلفة الهايلايت والبيو","توجيه صورة الملف الشخصي وتعديلها","لوحة ألوان العلامة التجارية الشخصية","نظام الطباعة والخطوط","تصميم بطاقة أعمال رقمية"],
    processEn: [
      { step: "01", title: "Discovery", desc: "We learn your personality, goals, and target audience." },
      { step: "02", title: "Concept", desc: "Two visual directions crafted for your review." },
      { step: "03", title: "Refinement", desc: "One direction refined to perfection based on your feedback." },
      { step: "04", title: "Delivery", desc: "All assets exported in every format you need." },
    ],
    processAr: [
      { step: "01", title: "الاستكشاف", desc: "نتعرف على شخصيتك وأهدافك وجمهورك المستهدف." },
      { step: "02", title: "التصور", desc: "اتجاهان بصريان مصممان لمراجعتك." },
      { step: "03", title: "التحسين", desc: "اتجاه واحد مُصقَّل إلى الكمال بناءً على ملاحظاتك." },
      { step: "04", title: "التسليم", desc: "جميع الأصول مُصدَّرة بكل تنسيق تحتاجه." },
    ],
  },
  "visual-identity": {
    num: "02",
    en: "Visual Identity",
    ar: "هويات بصرية",
    taglineEn: "Building brands that endure through impeccable design systems.",
    taglineAr: "بناء علامات تجارية راسخة من خلال أنظمة تصميم لا تُضاهى.",
    descEn: "A visual identity is the foundation of every successful brand. We design comprehensive brand systems — from logo and color to typography and brand guidelines — that communicate your values instantly and consistently across every touchpoint.",
    descAr: "الهوية البصرية هي أساس كل علامة تجارية ناجحة. نصمم أنظمة علامات تجارية شاملة — من الشعار واللون إلى الطباعة وإرشادات العلامة التجارية — تنقل قيمك فوراً وباتساق عبر كل نقطة تواصل.",
    whatEn: ["Logo design (primary + variants)","Brand color palette & usage rules","Typography system","Brand guidelines document","Business stationery design","Brand pattern & iconography"],
    whatAr: ["تصميم الشعار (أساسي + متغيرات)","لوحة ألوان العلامة التجارية وقواعد الاستخدام","نظام الطباعة","وثيقة إرشادات العلامة التجارية","تصميم القرطاسية التجارية","نمط العلامة التجارية والأيقونات"],
    processEn: [
      { step: "01", title: "Brand Audit", desc: "We analyze your market, competitors, and brand positioning." },
      { step: "02", title: "Strategy", desc: "Define brand personality, values, and visual direction." },
      { step: "03", title: "Design", desc: "Full visual identity crafted and presented for approval." },
      { step: "04", title: "Guidelines", desc: "Complete brand book delivered for consistent use." },
    ],
    processAr: [
      { step: "01", title: "تدقيق العلامة", desc: "نحلل سوقك ومنافسيك وتموضع علامتك التجارية." },
      { step: "02", title: "الاستراتيجية", desc: "تحديد شخصية العلامة وقيمها والاتجاه البصري." },
      { step: "03", title: "التصميم", desc: "هوية بصرية كاملة مصممة ومقدمة للموافقة." },
      { step: "04", title: "الإرشادات", desc: "كتاب علامة تجارية كامل مسلَّم للاستخدام المتسق." },
    ],
  },
  "websites": {
    num: "03",
    en: "Websites",
    ar: "مواقع",
    taglineEn: "Digital experiences engineered for impact and conversion.",
    taglineAr: "تجارب رقمية مصممة للتأثير والتحويل.",
    descEn: "We build websites that work as hard as you do. From sleek portfolio sites to high-converting landing pages and full brand websites — every pixel is intentional, every interaction purposeful, and every second of load time accounted for.",
    descAr: "نبني مواقع تعمل بنفس جدك واجتهادك. من مواقع المحافظ الأنيقة إلى صفحات الهبوط عالية التحويل والمواقع الكاملة للعلامة التجارية — كل بكسل مقصود، وكل تفاعل هادف، وكل ثانية من وقت التحميل محسوبة.",
    whatEn: ["Brand website design & development","Landing page design","Portfolio & showcase sites","Mobile-first responsive design","SEO-ready structure","CMS integration (if needed)"],
    whatAr: ["تصميم وتطوير موقع العلامة التجارية","تصميم صفحة الهبوط","مواقع المحافظ والعرض","تصميم متجاوب يُعطي الأولوية للجوال","هيكل جاهز لمحركات البحث","تكامل نظام إدارة المحتوى (عند الحاجة)"],
    processEn: [
      { step: "01", title: "Discovery", desc: "Goals, audience, and content architecture defined." },
      { step: "02", title: "Wireframe", desc: "Layout and user flow mapped before any design begins." },
      { step: "03", title: "Design", desc: "High-fidelity mockups crafted in your brand language." },
      { step: "04", title: "Build & Launch", desc: "Developed, tested, and deployed live." },
    ],
    processAr: [
      { step: "01", title: "الاستكشاف", desc: "تحديد الأهداف والجمهور وهيكل المحتوى." },
      { step: "02", title: "الإطار", desc: "رسم التخطيط وتدفق المستخدم قبل بدء أي تصميم." },
      { step: "03", title: "التصميم", desc: "نماذج عالية الدقة مصممة بلغة علامتك التجارية." },
      { step: "04", title: "البناء والإطلاق", desc: "تم تطويره واختباره ونشره." },
    ],
  },
  "social-media-management": {
    num: "04",
    en: "Social Media Management",
    ar: "إدارة حسابات سوشال ميديا",
    taglineEn: "Strategic content that builds community and drives growth.",
    taglineAr: "محتوى استراتيجي يبني مجتمعاً ويحقق نمواً.",
    descEn: "Consistency is the secret to social media success. We manage your accounts end-to-end — from content strategy and copywriting to design, scheduling, and analytics — so you show up professionally every single day without lifting a finger.",
    descAr: "الاتساق هو سر النجاح في وسائل التواصل الاجتماعي. ندير حساباتك من البداية إلى النهاية — من استراتيجية المحتوى والكتابة الإبداعية إلى التصميم والجدولة والتحليلات — حتى تظهر باحترافية كل يوم دون أن ترفع إصبعاً.",
    whatEn: ["Monthly content strategy","Post design & copywriting","Content calendar & scheduling","Stories & reels creative direction","Community management & replies","Monthly performance report"],
    whatAr: ["استراتيجية محتوى شهرية","تصميم المنشورات والكتابة الإبداعية","تقويم المحتوى والجدولة","التوجيه الإبداعي للستوري والريلز","إدارة المجتمع والردود","تقرير الأداء الشهري"],
    processEn: [
      { step: "01", title: "Onboarding", desc: "Brand voice, tone, and content pillars established." },
      { step: "02", title: "Strategy", desc: "Monthly content plan reviewed and approved by you." },
      { step: "03", title: "Execution", desc: "Content designed, written, and scheduled on time." },
      { step: "04", title: "Report", desc: "Monthly insights delivered with growth recommendations." },
    ],
    processAr: [
      { step: "01", title: "الانضمام", desc: "تأسيس صوت العلامة التجارية ونبرتها وركائز المحتوى." },
      { step: "02", title: "الاستراتيجية", desc: "خطة محتوى شهرية تُراجَع وتُعتمَد منك." },
      { step: "03", title: "التنفيذ", desc: "محتوى مصمم ومكتوب ومجدول في الوقت المحدد." },
      { step: "04", title: "التقرير", desc: "رؤى شهرية مُسلَّمة مع توصيات النمو." },
    ],
  },
};

type ServiceKey = keyof typeof serviceData;

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isAr, t } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const service = serviceData[slug as ServiceKey];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!heroRef.current || !contentRef.current) return;
    gsap.fromTo(heroRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" });
    gsap.fromTo(
      contentRef.current.querySelectorAll(".reveal"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.3 }
    );
  }, [slug]);

  if (!service) {
    return (
      <div style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: PINK, fontFamily: "'DM Sans',sans-serif", marginBottom: "16px" }}>Service not found</p>
          <button onClick={() => navigate("/")} style={{ background: PINK, border: "none", color: "#000", padding: "12px 28px", cursor: "pointer", fontWeight: 700 }}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const process = isAr ? service.processAr : service.processEn;
  const what = isAr ? service.whatAr : service.whatEn;

  return (
    <div style={{ background: "#000", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", direction: isAr ? "rtl" : "ltr", overflowX: "hidden" }}>

      {/* Hero */}
      <div
        ref={heroRef}
        style={{
          padding: "clamp(100px, 15vw, 160px) clamp(20px, 5vw, 48px) clamp(48px, 8vw, 100px)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer",
            padding: "8px 18px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            transition: "all 0.2s",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "clamp(24px, 4vw, 48px)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = PINK;
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(251,100,145,0.4)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          {isAr ? "→" : "←"} {t("Back", "رجوع")}
        </button>

        <div style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: PINK, textTransform: "uppercase", marginBottom: "1.2rem" }}>
          {service.num} / {t("Our Services", "خدماتنا")}
        </div>

        <h1 style={{
          fontFamily: isAr ? "'Cairo', sans-serif" : "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(2.8rem, 9vw, 9rem)",
          lineHeight: isAr ? 1.2 : 0.95,
          letterSpacing: isAr ? "0" : "-0.03em",
          textTransform: isAr ? "none" : "uppercase",
          color: "#fff",
          margin: "0 0 1.5rem",
          wordBreak: "break-word",
        }}>
          {isAr ? service.ar : service.en}
        </h1>

        <p style={{
          fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
          fontSize: "clamp(0.95rem, 2vw, 1.3rem)",
          fontWeight: 300,
          color: "rgba(255,255,255,0.45)",
          maxWidth: "580px",
          lineHeight: 1.7,
          margin: 0,
        }}>
          {isAr ? service.taglineAr : service.taglineEn}
        </p>
      </div>

      {/* Pink divider */}
      <div style={{
        height: "1px",
        background: `linear-gradient(${isAr ? "270deg" : "90deg"}, ${PINK}, transparent)`,
        margin: "0 clamp(20px, 5vw, 48px)",
      }} />

      {/* Content */}
      <div ref={contentRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(40px, 6vw, 80px) clamp(20px, 5vw, 48px) clamp(60px, 10vw, 120px)" }}>

        {/* Overview + What's Included — stack on mobile */}
        <div className="reveal" style={{ marginBottom: "clamp(48px, 8vw, 100px)" }}>
          <style>{`
            @media (max-width: 768px) {
              .sp-two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
              .sp-border-col { border-left: none !important; border-right: none !important; border-top: 1px solid rgba(255,255,255,0.06) !important; padding-left: 0 !important; padding-right: 0 !important; padding-top: 32px !important; }
              .sp-process-grid { grid-template-columns: 1fr 1fr !important; }
              .sp-cta { flex-direction: column !important; align-items: flex-start !important; padding: 36px 24px !important; }
            }
            @media (max-width: 480px) {
              .sp-process-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          <div className="sp-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "start" }}>
            <div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: PINK, textTransform: "uppercase", marginBottom: "20px" }}>
                {t("Overview", "نظرة عامة")}
              </div>
              <p style={{
                fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.85,
                margin: 0,
              }}>
                {isAr ? service.descAr : service.descEn}
              </p>
            </div>

            <div
              className="sp-border-col"
              style={{
                borderLeft: isAr ? "none" : "1px solid rgba(255,255,255,0.06)",
                borderRight: isAr ? "1px solid rgba(255,255,255,0.06)" : "none",
                paddingLeft: isAr ? "0" : "clamp(20px, 4vw, 48px)",
                paddingRight: isAr ? "clamp(20px, 4vw, 48px)" : "0",
              }}
            >
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: PINK, textTransform: "uppercase", marginBottom: "20px" }}>
                {t("What's Included", "ما يشمله")}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {what.map((item, i) => (
                  <li key={i} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
                    fontSize: "clamp(0.82rem, 1.5vw, 0.9rem)",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.65)",
                  }}>
                    <span style={{ color: PINK, fontSize: "0.6rem", marginTop: "6px", flexShrink: 0 }}>✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="reveal" style={{ marginBottom: "clamp(48px, 8vw, 100px)" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: PINK, textTransform: "uppercase", marginBottom: "clamp(24px, 4vw, 40px)" }}>
            {t("Our Process", "طريقة عملنا")}
          </div>
          <div className="sp-process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
            {process.map((p, i) => (
              <div key={i} style={{
                background: "#050505",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "clamp(20px, 3vw, 36px) clamp(16px, 2.5vw, 28px)",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: isAr ? "auto" : 0,
                  right: isAr ? 0 : "auto",
                  width: i === 0 ? "100%" : "0",
                  height: "2px",
                  background: PINK,
                }} />
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, color: "rgba(251,100,145,0.12)", lineHeight: 1, marginBottom: "12px" }}>
                  {p.step}
                </div>
                <div style={{
                  fontFamily: isAr ? "'Cairo', sans-serif" : "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: isAr ? "clamp(0.9rem, 2vw, 1.1rem)" : "clamp(1rem, 2vw, 1.3rem)",
                  textTransform: isAr ? "none" : "uppercase",
                  color: "#fff",
                  marginBottom: "8px",
                  letterSpacing: isAr ? "0" : "0.02em",
                }}>
                  {p.title}
                </div>
                <p style={{
                  fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
                  fontSize: "clamp(0.75rem, 1.5vw, 0.82rem)",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="reveal sp-cta" style={{
          background: "#050505",
          border: `1px solid rgba(251,100,145,0.2)`,
          padding: "clamp(32px, 5vw, 64px) clamp(24px, 5vw, 56px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "28px",
          boxShadow: "0 0 80px rgba(251,100,145,0.06)",
        }}>
          <div>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: PINK, textTransform: "uppercase", marginBottom: "12px" }}>
              {t("Ready to start?", "مستعد للبدء؟")}
            </div>
            <h3 style={{
              fontFamily: isAr ? "'Cairo', sans-serif" : "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: isAr ? "clamp(1.5rem, 4vw, 2rem)" : "clamp(1.8rem, 5vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: isAr ? "0" : "-0.02em",
              textTransform: isAr ? "none" : "uppercase",
              color: "#fff",
              margin: 0,
            }}>
              {t("Let's work together", "لنعمل معاً")}
            </h3>
          </div>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: PINK,
              color: "#000",
              fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "18px clamp(24px, 4vw, 48px)",
              transition: "all 0.3s ease",
              boxShadow: "0 0 40px rgba(251,100,145,0.3)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(251,100,145,0.5)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(251,100,145,0.3)";
            }}
          >
            {t("Start on WhatsApp →", "ابدأ على واتساب ←")}
          </a>
        </div>

        {/* Other services */}
        <div className="reveal" style={{ marginTop: "clamp(40px, 6vw, 80px)" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "24px" }}>
            {t("Other Services", "خدمات أخرى")}
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {Object.entries(serviceData)
              .filter(([key]) => key !== slug)
              .map(([key, s]) => (
                <button
                  key={key}
                  onClick={() => navigate(`/services/${key}`)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.45)",
                    cursor: "pointer",
                    padding: "10px 18px",
                    fontFamily: isAr ? "'Cairo', sans-serif" : "'DM Sans', sans-serif",
                    fontSize: "clamp(0.72rem, 1.5vw, 0.8rem)",
                    letterSpacing: "0.06em",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = PINK;
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(251,100,145,0.3)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  {isAr ? s.ar : s.en} →
                </button>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
