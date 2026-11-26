import type { Metadata } from "next";
import Link from "next/link";
import { branches } from "@/data/branches";
import { photos } from "@/data/photos";
import Photo from "@/components/ui/Photo";
import BranchServiceCard from "@/components/brand/BranchServiceCard";
import LineLink from "@/components/i18n/LineLink";
import { T } from "@/components/i18n/LangProvider";

export const metadata: Metadata = {
  title: "ตรวจสอบโลหะมีค่าด้วยเครื่อง X-Ray",
  description: "บริการตรวจสอบโลหะมีค่าด้วยเครื่อง X-Ray แบบไม่ทำลายชิ้นงาน ให้บริการที่สาขาเซ็นทรัล ภูเก็ต ฟลอเรสต้า และสาขาตลาดท้ายรถนาคา",
};

export default function XRayPage() {
  const offering = branches.filter((b) => b.services.xray);
  return (
    <div className="air">
      <section className="page-hero">
        <div className="container">
          <p className="label gold">X-Ray Testing</p>
          <h1><T th="ตรวจสอบโลหะมีค่าด้วยเครื่อง X-Ray" en="Precious metal testing with an X-Ray machine" /></h1>
          <p className="reading lead"><T th="บริการตรวจสอบโลหะมีค่าด้วยเครื่อง X-Ray แบบไม่ทำลายชิ้นงาน เพื่อเพิ่มความมั่นใจให้กับลูกค้า" en="Non-destructive precious metal testing with an X-Ray machine, for added customer confidence." /></p>
        </div>
      </section>

      <section className="section section--forest">
        <div className="container editorial xray">
          <div className="xray__media">
            <Photo photo={photos["XRAY"]} ratio="3 / 4" priority sizes="(min-width:1024px) 34vw, 90vw" focus="center 60%" />
          </div>
          <div>
            <p className="label">About the service</p>
            <h2 className="ab-h2"><T th="มีบริการทั้งสองสาขา" en="Available at both branches" /></h2>
            <span className="eyebrow-rule" />
            <div className="ab-prose">
              <p><T th="KAI RICHY มีบริการตรวจสอบโลหะมีค่าด้วยเครื่อง X-Ray ลูกค้าสามารถใช้บริการได้ที่สาขาเซ็นทรัล ภูเก็ต ฟลอเรสต้า (KAI RICHY) และสาขาตลาดท้ายรถนาคา (RICHY GOLD)" en="KAI RICHY offers precious metal testing with an X-Ray machine. Customers can use the service at the Central Phuket Floresta branch (KAI RICHY) and the Naka market branch (RICHY GOLD)." /></p>
              <p><T th="สอบถามรายละเอียดการใช้บริการได้ทาง LINE หรือโทรหาสาขา" en="Ask for details on LINE or call the branch." /></p>
            </div>
            <div className="inquiry" style={{ marginTop: "var(--sp-5)" }}>
              <LineLink className="btn btn--on-green"><T th="สอบถามทาง LINE" en="Enquire on LINE" /></LineLink>
              <Link className="btn btn--on-green" href="/services"><T th="บริการทั้งหมด" en="All services" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="xray-branches">
        <div className="container">
          <p className="label">Branches</p>
          <h2 id="xray-branches" className="ab-h2"><T th="สาขาที่ให้บริการ X-Ray" en="Branches offering X-Ray testing" /></h2>
          <span className="eyebrow-rule" />
          <div className="contact-grid" style={{ marginTop: "var(--sp-5)" }}>
            {offering.map((b) => <BranchServiceCard key={b.id} branch={b} service="xray" />)}
          </div>
        </div>
      </section>
    </div>
  );
}
