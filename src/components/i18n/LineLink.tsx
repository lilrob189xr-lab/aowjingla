"use client";

import type { ReactNode } from "react";
import { contact } from "@/data/contact";
import { useLang } from "./LangProvider";

const GREETING = {
  th: "สวัสดีครับ สนใจสอบถามสินค้าและบริการของ KAI RICHY ครับ",
  en: "Hello, I’d like to ask about your products and services at KAI RICHY.",
} as const;
const COPIED = {
  th: "คัดลอกข้อความแล้ว วางในแชท LINE ได้เลย",
  en: "Message copied, paste it in the LINE chat",
} as const;

/** LINE link. The LINE URL cannot pre-fill a message, so tapping copies a short greeting to paste in the chat. */
export default function LineLink({ className, children, tabIndex }: { className?: string; children: ReactNode; tabIndex?: number }) {
  const { lang, notify } = useLang();
  const onClick = () => {
    try {
      navigator.clipboard?.writeText(GREETING[lang]).then(() => notify(COPIED[lang]), () => {});
    } catch {}
  };
  return (
    <a className={className} href={contact.line.url} target="_blank" rel="noopener noreferrer" tabIndex={tabIndex} onClick={onClick}>
      {children}
    </a>
  );
}
