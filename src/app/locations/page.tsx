import type { Metadata } from "next";
import { branches } from "@/data/branches";
import { photosOf } from "@/data/photos";
import { siteUrl } from "@/lib/site";
import Photo from "@/components/ui/Photo";
import OpenStatus from "@/components/i18n/OpenStatus";
import Link from "next/link";
import { T } from "@/components/i18n/LangProvider";
import KaiRichyMapSection from "@/components/brand/KaiRichyMapSection";

export const metadata: Metadata = {
  title: "สาขาของเรา",
  description: "สาขาของ KAI RICHY: เซ็นทรัล ภูเก็ต ฟลอเรสต้า (KAI RICHY) และตลาดท้ายรถนาคา (ริชชี่โกลด์หลอมทอง) ที่อยู่ เวลาเปิด และเบอร์โทร",
};

// Structured data uses verified branch facts only: no ratings, reviews or prices.
const jsonLd = branches.map((b) => ({
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: b.id === "kai-richy-floresta" ? "KAI RICHY สาขาเซ็นทรัล ภูเก็ต ฟลอเรสต้า" : "ริชชี่โกลด์หลอมทอง สาขาตลาดท้ายรถนาคา (RICHY GOLD)",
  telephone: b.phoneHref.replace("tel:", ""),
  address: { "@type": "PostalAddress", streetAddress: b.address, addressRegion: "ภูเก็ต", addressCountry: "TH" },
  openingHours: b.id === "kai-richy-floresta" ? "Mo-Su 10:00-20:00" : "Mo-Su 09:00-19:30",
  hasMap: b.mapsUrl,
  ...(siteUrl ? { url: siteUrl + "/locations" } : {}),
}));

// Lead photograph per branch (the rest follow in a uniform grid).
const LEAD: Record<string, string> = { "kai-richy-floresta": "CEBE7D37", "richy-gold-naka": "636A36E8" };

export default function LocationsPage() {
  return (
    <div className="air">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="page-hero">
        <div className="container">
          <p className="label gold">Locations</p>
          <h1><T th="สาขาของเรา" en="Our Branches" /></h1>
          <p className="reading lead"><T th="สองสาขาในจังหวัดภูเก็ต" en="Two branches in Phuket" /></p>
        </div>
      </section>

      <KaiRichyMapSection />

      {branches.map((b, idx) => {
        const all = photosOf(b.id);
        const lead = all.find((p) => p.id === LEAD[b.id]) ?? all[0];
        // 394AFAAD (candid selfie) stays in the inventory but is not placed on this page.
        const rest = all.filter((p) => p !== lead && p.id !== "394AFAAD");
        return (
          <section key={b.id} id={b.id} className={`section ${idx % 2 === 0 ? "section--white" : "section--ivory"}`}>
            <div className="container loc-block">
              <div className="loc-block__info">
                <p className="loc-no en">{b.number}</p>
                <p className="label"><T th={`สาขา ${b.number}`} en={`Branch ${b.number}`} /></p>
                <h2>{b.brandName}</h2>
                <p className="bcard__name">{b.nameTh}</p>
                <dl className="facts facts--large">
                  {b.locationNote && (<><dt><T th="ตำแหน่ง" en="Location" /></dt><dd>{b.locationNote}</dd></>)}
                  <dt><T th="ที่อยู่" en="Address" /></dt><dd>{b.address}</dd>
                  <dt><T th="เวลาเปิดทำการ" en="Opening hours" /></dt><dd><T th={b.hours} en={b.hoursEn} /><OpenStatus openMin={b.openMin} closeMin={b.closeMin} /></dd>
                  <dt><T th="โทรศัพท์" en="Telephone" /></dt><dd><a href={b.phoneHref}>{b.phoneDisplay}</a></dd>
                  {b.services.xray && (<><dt><T th="ตรวจสอบด้วยเครื่อง X-Ray" en="X-Ray testing" /></dt><dd><T th="มีบริการ" en="Available" /></dd></>)}
                  {b.services.goldMelting && (<><dt><T th="บริการหลอมทอง" en="Gold melting" /></dt><dd><T th="มีบริการ (เฉพาะสาขานี้)" en="Available (this branch only)" /></dd></>)}
                </dl>
                <div className="inquiry">
                  <a className="btn btn--primary" href={b.phoneHref}><T th="โทร" en="Call" /> {b.phoneDisplay}</a>
                  <a className="btn btn--secondary" href={b.mapsUrl} target="_blank" rel="noopener noreferrer"><T th="เปิดใน Google Maps" en="Open in Google Maps" /></a>
                  <Link className="link-gold bcard__more" href={`/locations/${b.id}`}><T th="ดูรายละเอียดสาขา" en="Branch details" /><span className="sr-only"> {b.brandName}</span></Link>
                </div>
              </div>
              <div className="loc-photos">
                <div className="loc-photos__lead frame-offset" style={{ marginBottom: 8 }}>
                  <Photo photo={lead} ratio="4 / 3" focus="center 35%" priority={idx === 0} sizes="(min-width:1024px) 55vw, 100vw" />
                </div>
                {rest.map((p) => (
                  <Photo key={p.id} photo={p} ratio="4 / 3" focus="center 32%" sizes="(min-width:1024px) 27vw, 50vw" />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
