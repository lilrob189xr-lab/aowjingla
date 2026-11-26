"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export type Lang = "th" | "en";
/** Default language. V5 content is Thai-first; change to "en" to start in English like the static Redesign. */
export const DEFAULT_LANG: Lang = "th";
const STORAGE_KEY = "kr-lang";

interface LangCtx {
  lang: Lang;
  toggle: () => void;
  /** Show a short toast message (used by the LINE button). */
  notify: (message: string) => void;
}

const LangContext = createContext<LangCtx>({ lang: DEFAULT_LANG, toggle: () => {}, notify: () => {} });

export const useLang = () => useContext(LangContext);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read the saved choice after hydration so server and client markup match.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "th" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    const next: Lang = lang === "th" ? "en" : "th";
    setLang(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  }, [lang]);

  const notify = useCallback((message: string) => {
    setToast(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <LangContext.Provider value={{ lang, toggle, notify }}>
      {children}
      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </LangContext.Provider>
  );
}

/** Inline bilingual text. Falls back to Thai when no English is given (only owner-approved English is translated). */
export function T({ th, en }: { th: ReactNode; en?: ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "en" && en !== undefined ? en : th}</>;
}

/** TH / EN switch. The label shows the language you will switch to. */
export function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <button type="button" className="lang-toggle" onClick={toggle} aria-label={lang === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}>
      {lang === "th" ? "EN" : "TH"}
    </button>
  );
}
