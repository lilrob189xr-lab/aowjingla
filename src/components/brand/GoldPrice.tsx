"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { T } from "@/components/i18n/LangProvider";
import type { GoldPrices } from "@/lib/gold";

const REFRESH_MS = 5 * 60 * 1000;
const FETCH_TIMEOUT_MS = 8000;
const SOURCE_SITE = "https://www.goldtraders.or.th/";

type State = { status: "loading" } | { status: "ok"; data: GoldPrices } | { status: "error"; last: GoldPrices | null };

/** Reference gold price (Home + Services). Prices come only from /api/gold; nothing is hard-coded. */
export default function GoldPrice({ variant }: { variant: "home" | "services" }) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let alive = true;
    let last: GoldPrices | null = null;
    const load = async () => {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), FETCH_TIMEOUT_MS);
      try {
        const res = await fetch("/api/gold", { cache: "no-store", signal: ctl.signal });
        const json = await res.json();
        if (!res.ok || !json?.ok || !json.data) throw new Error("bad");
        last = json.data as GoldPrices;
        if (alive) setState({ status: "ok", data: last });
      } catch {
        if (alive) setState({ status: "error", last });
      } finally {
        clearTimeout(t);
      }
    };
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => { alive = false; clearInterval(id); };
  }, []);

  const data = state.status === "ok" ? state.data : state.status === "error" ? state.last : null;
  const rows = data
    ? [
        { key: "bar", th: "ทองคำแท่ง", en: "Gold bar", p: data.bar },
        { key: "orn", th: "ทองรูปพรรณ", en: "Ornament gold", p: data.ornament },
      ].filter((g) => g.p.buy || g.p.sell)
    : [];

  return (
    <section className={`section section--ivory gp gp--${variant}`} aria-labelledby={`gp-h-${variant}`}>
      <div className="container gp__wrap">
        <header className="gp__head">
          <p className="label">Gold Price Reference</p>
          <h2 id={`gp-h-${variant}`} className="gp__title"><T th="ราคาทองคำอ้างอิง" en="Reference Gold Price" /></h2>
          {data && (
            <p className="gp__stamp">
              <T th="ประกาศล่าสุด" en="Latest announcement" /><br /><span>{data.updateDate} {data.updateTime}</span>
            </p>
          )}
        </header>

        <div className="gp__main">
          {state.status === "loading" && (
            <p className="gp__msg" role="status"><T th="กำลังโหลดราคาทองคำ…" en="Loading gold prices…" /></p>
          )}

          {state.status === "error" && (
            <p className="gp__warn" role="status">
              {data ? (
                <T
                  th={`ไม่สามารถอัปเดตราคาได้ในขณะนี้ ราคาด้านล่างเป็นข้อมูลที่ประกาศเมื่อ ${data.updateDate} ${data.updateTime} ไม่ใช่ราคาปัจจุบัน`}
                  en={`Prices could not be updated right now. The prices below were announced on ${data.updateDate} ${data.updateTime} and are not current.`}
                />
              ) : (
                <T th="ขณะนี้ไม่สามารถแสดงราคาทองคำได้ กรุณาสอบถามราคาล่าสุดกับสาขา" en="Gold prices are unavailable at the moment. Please ask a branch for the latest price." />
              )}
            </p>
          )}

          {data && rows.length > 0 && (
            <table className={`gp__tbl${state.status === "error" ? " gp__tbl--stale" : ""}`}>
              <caption className="sr-only"><T th="ราคาทองคำอ้างอิง หน่วยบาท" en="Reference gold prices in baht" /></caption>
              <thead>
                <tr>
                  <td />
                  <th scope="col"><T th="รับซื้อ" en="We buy" /> <span className="gp__u">(<T th="บาท" en="THB" />)</span></th>
                  <th scope="col"><T th="ขายออก" en="Sell" /> <span className="gp__u">(<T th="บาท" en="THB" />)</span></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((g) => (
                  <tr key={g.key}>
                    <th scope="row"><T th={g.th} en={g.en} /> <span className="gp__pct en">96.5%</span></th>
                    <td className="en">{g.p.buy ?? "—"}</td>
                    <td className="en">{g.p.sell ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

            <p className="gp__fine">
              {data && (
                <>
                  <T th="แหล่งข้อมูล: " en="Source: " />
                  <a className="link-gold" href={SOURCE_SITE} target="_blank" rel="noopener noreferrer"><T th="สมาคมค้าทองคำแห่งประเทศไทย" en="Gold Traders Association of Thailand" /></a>
                  {" · "}
                </>
              )}
              <T
                th="ราคาที่แสดงเป็นราคาอ้างอิงจากสมาคมค้าทองคำแห่งประเทศไทย ราคาเสนอซื้อจริงขึ้นอยู่กับประเภทสินค้า น้ำหนัก เปอร์เซ็นต์ทอง และผลการตรวจสอบจากทางร้าน"
                en="Prices shown are reference prices from the Gold Traders Association of Thailand. Actual purchase offers depend on the type of item, weight, gold purity and the shop's inspection results."
              />
              {variant === "home" && (
                <>
                  {" "}
                  <Link className="link-gold" href="/services#gold-precious-metals"><T th="ดูบริการรับซื้อทองคำและโลหะมีค่า" en="View our gold & precious metals buying service" /></Link>
                </>
              )}
            </p>
        </div>

      </div>
    </section>
  );
}
