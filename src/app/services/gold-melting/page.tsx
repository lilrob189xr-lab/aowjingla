import type { Metadata } from "next";
import Link from "next/link";
import { branches } from "@/data/branches";
import { photos } from "@/data/photos";
import Photo from "@/components/ui/Photo";
import BranchServiceCard from "@/components/brand/BranchServiceCard";
import LineLink from "@/components/i18n/LineLink";
import { T } from "@/components/i18n/LangProvider";

export const metadata: Metadata = {
  title: "บริการหลอมทอง",
  description: "บริการหลอมทองมีเฉพาะสาขา RICHY GOLD (ริชชี่โกลด์หลอมทอง สาขาตลาดท้ายรถนาคา)",
};

export default function GoldMeltingPage() {
  const offering = branches.filter((b) => b.services.goldMelting);
  return (
    <div className="air">
      <section className="page-hero">
        <div className="container">
          <p className="label gold">Gold Melting</p>
          <h1><T th="บริการหลอมทอง" en="Gold melting service" /></h1>
          <p className="reading lead"><T th="บริการหลอมทองมีเฉพาะสาขา RICHY GOLD — Naka (ตลาดท้ายรถนาคา)" en="Gold melting is available only at the RICHY GOLD — Naka branch (Naka market)." /></p>
        </div>
      </section>

      <section className="section section--forest">
        <div className="container editorial xray">
          <div className="xray__media" style={{ maxWidth: 560 }}>
            <Photo photo={photos["84B55986"]} ratio="4 / 3" priority sizes="(min-width:1024px) 40vw, 90vw" />
          </div>
          <div>
            <p className="label">About the service</p>
            <h2 className="ab-h2"><T th="มีบริการเฉพาะสาขา RICHY GOLD — Naka" en="Available only at RICHY GOLD — Naka" /></h2>
            <span className="eyebrow-rule" />
            <div className="ab-prose">
              <p><T th="ร้านมีบริการหลอมทอง โดยให้บริการเฉพาะที่สาขา RICHY GOLD (ริชชี่โกลด์หลอมทอง สาขาตลาดท้ายรถนาคา) เท่านั้น" en="The shop offers gold melting, provided only at the RICHY GOLD branch (Naka market branch)." /></p>
              <p><T th="สอบถามรายละเอียดการใช้บริการได้ทาง LINE หรือโทรหาสาขา" en="Ask for details on LINE or call the branch." /></p>
            </div>
            <div className="inquiry" style={{ marginTop: "var(--sp-5)" }}>
              <LineLink className="btn btn--on-green"><T th="สอบถามทาง LINE" en="Enquire on LINE" /></LineLink>
              <Link className="btn btn--on-green" href="/services"><T th="บริการทั้งหมด" en="All services" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="melt-branch">
        <div className="container">
          <p className="label">Branch</p>
          <h2 id="melt-branch" className="ab-h2"><T th="สาขาที่ให้บริการหลอมทอง" en="Branch offering gold melting" /></h2>
          <span className="eyebrow-rule" />
          <div className="contact-grid contact-grid--single" style={{ marginTop: "var(--sp-5)" }}>
            {offering.map((b) => <BranchServiceCard key={b.id} branch={b} service="melting" />)}
            <div className="svc-branch__photo">
              <Photo photo={photos["636A36E8"]} ratio="4 / 3" sizes="(min-width:1024px) 40vw, 90vw" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
