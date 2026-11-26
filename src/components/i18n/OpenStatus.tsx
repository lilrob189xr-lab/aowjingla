"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LangProvider";

/** Minutes after midnight in Phuket (Asia/Bangkok, UTC+7, no DST). */
export function phuketMinutes(date: Date = new Date()): number {
  let h = 0, m = 0;
  new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Bangkok", hour: "2-digit", minute: "2-digit", hour12: false })
    .formatToParts(date)
    .forEach((p) => {
      if (p.type === "hour") h = Number(p.value) % 24;
      if (p.type === "minute") m = Number(p.value);
    });
  return h * 60 + m;
}

const hhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

export function statusText(now: number, openMin: number, closeMin: number, lang: "th" | "en") {
  const isOpen = now >= openMin && now < closeMin;
  const th = lang === "th";
  if (isOpen) return { isOpen, text: th ? `เปิดอยู่ ถึง ${hhmm(closeMin)} น.` : `Open now, until ${hhmm(closeMin)}` };
  const tomorrow = now >= closeMin;
  return {
    isOpen,
    text: th
      ? `ปิดอยู่ เปิด${tomorrow ? "พรุ่งนี้" : "วันนี้"} ${hhmm(openMin)} น.`
      : `Closed, opens ${tomorrow ? "tomorrow" : "today"} ${hhmm(openMin)}`,
  };
}

/** Open / closed line based on Phuket time. Renders empty until mounted so server and client markup match. */
export default function OpenStatus({ openMin, closeMin }: { openMin: number; closeMin: number }) {
  const { lang } = useLang();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(phuketMinutes());
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return <p className="st" aria-hidden="true">&nbsp;</p>;
  const { isOpen, text } = statusText(now, openMin, closeMin, lang);
  return <p className={`st ${isOpen ? "on" : "off"}`} role="status">{text}</p>;
}
