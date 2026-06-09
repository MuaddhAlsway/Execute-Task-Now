import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "ar";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  isAr: boolean;
  t: (en: string, ar: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  isAr: false,
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const isAr = lang === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);
  return (
    <LangContext.Provider value={{ lang, setLang, isAr, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
