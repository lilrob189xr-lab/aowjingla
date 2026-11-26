import type { Metadata } from "next";
import Image from "next/image";
import { branches } from "@/data/branches";
import { contact } from "@/data/contact";
import SectionHead from "@/components/ui/SectionHead";
import OpenStatus from "@/components/i18n/OpenStatus";
import LineLink from "@/components/i18n/LineLink";
import { T } from "@/components/i18n/LangProvider";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ช่องทางติดต่อ KAI RICHY ทั้งสองสาขา: LINE โทรศัพท์ Facebook และ Google Maps",
};

export default function ContactPage() {
  return (
    <div className="air">
      <section className="page-hero">
        <div className="container">
          <p className="label gold">Contact</p>
          <h1>ติดต่อเรา</h1>
          <p className="reading lead">ติดต่อได้ทาง LINE โทรศัพท์ หรือแวะที่สาขา</p>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="contact-grid">
            {branches.map((b) => (
              <article key={b.id} className="mini mini--large contact-card">
                <p className="label gold">สาขา {b.number}</p>
                <h3>{b.brandName}</h3>
                <p>{b.nameTh}</p>
                <dl className="facts">
                  <dt>ที่อยู่</dt><dd>{b.address}</dd>
                  <dt>เวลาเปิดทำการ</dt><dd>{b.hours}</dd>
                  <dt>สถานะ</dt><dd><OpenStatus openMin={b.openMin} closeMin={b.closeMin} /></dd>
                  <dt>โทรศัพท์</dt><dd><a href={b.phoneHref}>{b.phoneDisplay}</a></dd>
                </dl>
                <div className="inquiry">
                  <a className="btn btn--primary" href={b.phoneHref}>โทร {b.phoneDisplay}</a>
                  <a className="btn btn--secondary" href={b.mapsUrl} target="_blank" rel="noopener noreferrer">เปิดแผนที่</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--green">
        <div className="container line-panel">
          <div>
            <SectionHead label="LINE" title="ติดต่อทาง LINE" onGreen>
              <p>สแกน QR Code หรือกดปุ่มเพื่อเพิ่มเพื่อนและสอบถามสินค้า</p>
            </SectionHead>
            <div className="stack-btns">
              <LineLink className="btn btn--on-green"><T th="เปิด LINE" en="Open LINE" /></LineLink>
              <a className="btn btn--on-green" href={contact.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>
          {/* Original QR image: not cropped, recolored or overlaid. */}
          <div className="qr">
            <Image src={contact.line.qrImage} alt="QR Code LINE ของ KAI RICHY" width={contact.line.qrWidth} height={contact.line.qrHeight} sizes="320px" />
          </div>
        </div>
      </section>
    </div>
  );
}
