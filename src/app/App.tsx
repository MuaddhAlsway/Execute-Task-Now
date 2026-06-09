import "../styles/fonts.css";
import { Routes, Route } from "react-router";
import { LanguageProvider } from "./components/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Counters } from "./components/Counters";
import { Clients } from "./components/Clients";
import { Services } from "./components/Services";
import { SocialMedia } from "./components/SocialMedia";
import { MarqueeText } from "./components/MarqueeText";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { AdminPanel } from "./components/AdminPanel";

const globalStyles = `
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: #000; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #000; }
  ::-webkit-scrollbar-thumb { background: rgba(251,100,145,0.3); }
  ::-webkit-scrollbar-thumb:hover { background: #fb6491; }
  @keyframes marqueeLeft {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes marqueeRight {
    from { transform: translateX(-50%); }
    to { transform: translateX(0); }
  }
  select option { background: #050505; color: #fff; }
  input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
  input, textarea, select { color-scheme: dark; }
`;

const WA = "https://wa.me/966560394576";

function HomePage() {
  const scrollTo = (section: string) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <Navbar onStartProject={() => window.open(WA, "_blank")} onScrollTo={scrollTo} />
      <Hero onStartProject={() => window.open(WA, "_blank")} />
      <Counters />
      <MarqueeText />
      <Clients />
      <Services />
      <SocialMedia />
      <CTASection onStartProject={() => window.open(WA, "_blank")} />
      <Footer onScrollTo={scrollTo} onStartProject={() => window.open(WA, "_blank")} />
      <style>{globalStyles}</style>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </LanguageProvider>
  );
}
