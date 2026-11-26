import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { branches, type Branch } from "@/data/branches";
import { contact } from "@/data/contact";
import { photosOf } from "@/data/photos";
import { siteUrl } from "@/lib/site";
import { T } from "@/components/i18n/LangProvider";
import LineLink from "@/components/i18n/LineLink";
import OpenStatus from "@/components/i18n/OpenStatus";
import Photo from "@/components/ui/Photo";

// Phase 7C: one page per branch, built from data/branches.ts and the branch photographs only. No map is embedded here;
// the combined map is on /locations#map and each branch's Google Maps link opens directions.
export const dynamicParams = false;
export const generateStaticParams = () => branches.map((b) => ({ branch: b.id }));

type Props = { params: Promise<{ branch: string }> };

const find = (id: string): Branch | undefined => branches.find((b) => b.id === id);
const hhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
const LEAD: Record<string, string> = { "kai-richy-floresta": "CEBE7D37", "richy-gold-naka": "636A36E8" };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const b = find((await params).branch);
  if (!b) return {};
  return {
    title: `${b.brandName} ${b.nameTh}`,
    description: `${b.brandName} ${b.nameTh} ${b.hours} โทร ${b.phoneDisplay}`,
  };
}

export default async function BranchDetailPage({ params }: Props) {
  const b = find((await params).branch);
  if (!b) notFound();
  const other = branches.find((x) => x.id !== b.id);

  const all = photosOf(b.id);
  const lead = all.find((p) => p.id === LEAD[b.id]) ?? all[0];
  // 394AFAAD (candid selfie) stays in the inventory but is not placed on the site.
  const rest = all.filter((p) => p !== lead && p.id !== "394AFAAD");

  // Same verified facts as the Locations page: no ratings, reviews, prices or coordinates.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: b.id === "kai-richy-floresta" ? `${b.brandName} ${b.nameTh}` : b.nameTh,
    telephone: b.phoneHref.replace("tel:", ""),
    address: { "@type": "PostalAddress", streetAddress: b.address, addressRegion: "ภูเก็ต", addressCountry: "TH" },
    openingHours: `Mo-Su ${hhmm(b.openMin)}-${hhmm(b.closeMin)}`,
    hasMap: b.mapsUrl,
    ...(siteUrl ? { url: `${siteUrl}/locations/${b.id}` } : {}),
  };

  return (
    <div className="air">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="เส้นทาง">
            <Link href="/locations"><T th="สาขาของเรา" en="Our Branches" /></Link> <span aria-hidden="true">/</span> {b.brandName}
          </nav>
          <p className="label gold"><T th={`สาขา ${b.number}`} en={`Branch ${b.number}`} /></p>
          <h1>{b.brandName}</h1>
          <p className="reading lead">{b.nameTh}</p>
        </div>
      </section>

      <section className="section section--white bdet">
        <div className="container loc-block">
          <div className="loc-block__info">
            <dl className="facts facts--large">
              {b.locationNote && (<><dt><T th="ตำแหน่ง" en="Location" /></dt><dd>{b.locationNote}</dd></>)}
              <dt><T th="ที่อยู่" en="Address" /></dt><dd>{b.address}</dd>
              <dt><T th="เวลาเปิดทำการ" en="Opening hours" /></dt><dd><T th={b.hours} en={b.hoursEn} /><OpenStatus openMin={b.openMin} closeMin={b.closeMin} /></dd>
              <dt><T th="โทรศัพท์" en="Telephone" /></dt><dd><a href={b.phoneHref}>{b.phoneDisplay}</a></dd>
              {b.services.xray && (<><dt><T th="ตรวจสอบด้วยเครื่อง X-Ray" en="X-Ray testing" /></dt><dd><Link className="link-gold" href="/services/x-ray"><T th="มีบริการ" en="Available" /></Link></dd></>)}
              {b.services.goldMelting && (<><dt><T th="บริการหลอมทอง" en="Gold melting" /></dt><dd><Link className="link-gold" href="/services/gold-melting"><T th="มีบริการ (เฉพาะสาขานี้)" en="Available (this branch only)" /></Link></dd></>)}
            </dl>
            <div className="inquiry">
              <a className="btn btn--primary" href={b.phoneHref}><T th="โทร" en="Call" /> {b.phoneDisplay}</a>
              <a className="btn btn--secondary" href={b.mapsUrl} target="_blank" rel="noopener noreferrer"><T th="เปิดใน Google Maps" en="Open in Google Maps" /></a>
              <LineLink className="btn btn--secondary"><T th="สอบถามทาง LINE" en="Enquire on LINE" /></LineLink>
              <a className="btn btn--secondary" href={contact.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
            <p className="bdet__links">
              <Link className="link-gold bcard__more" href="/locations#map"><T th="ดูแผนที่ทั้งสองสาขา" en="View map of both branches" /></Link>
              {other && (
                <Link className="link-gold bcard__more" href={`/locations/${other.id}`}><T th={`สาขา ${other.number} · ${other.brandName}`} en={`Branch ${other.number} · ${other.brandName}`} /></Link>
              )}
              <Link className="link-gold bcard__more" href="/locations"><T th="สาขาของเรา" en="Our Branches" /></Link>
            </p>
          </div>

          <div className="loc-photos">
            {lead && (
              <div className="loc-photos__lead frame-offset" style={{ marginBottom: 8 }}>
                <Photo photo={lead} ratio="4 / 3" focus="center 35%" priority sizes="(min-width:1024px) 55vw, 100vw" />
              </div>
            )}
            {rest.map((p) => (
              <Photo key={p.id} photo={p} ratio="4 / 3" focus="center 32%" sizes="(min-width:1024px) 27vw, 50vw" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
