import type { Metadata } from "next";
import Link from "next/link";
import { serviceCategories, servicesIntro, additionalServices, type ServiceCategory } from "@/data/services";
import { photos } from "@/data/photos";
import Photo from "@/components/ui/Photo";
import ServicesContact from "@/components/brand/ServicesContact";
import GoldPrice from "@/components/brand/GoldPrice";
import { T } from "@/components/i18n/LangProvider";

export const metadata: Metadata = {
  title: "บริการของเรา",
  description: "บริการของ KAI RICHY: รับซื้อเครื่องประดับเพชรและอัญมณี ทองคำและโลหะมีค่า นาฬิกาหรู พร้อมบริการซ่อมแซมและดูแลเครื่องประดับ",
};

function Category({ c, dark }: { c: ServiceCategory; dark: boolean }) {
  return (
    <section id={c.id} className={`section svcx ${dark ? "section--white svcx--dark" : "section--ivory svcx--light"}`} aria-labelledby={`${c.id}-h`}>
      <div className="container svcx__grid">
        <header className="svcx__head">
          <span className="svcx__no en" aria-hidden="true">{c.no}</span>
          <p className="svcx__eyebrow en">{c.labelEn}</p>
          <h2 id={`${c.id}-h`} className="svcx__title"><T th={c.title.th} en={c.title.en} /></h2>
          <span className="eyebrow-rule" />
          <p className="svcx__intro"><T th={c.intro.th} en={c.intro.en} /></p>
        </header>
        <div className="svcx__body">
          {c.groups.map((g, gi) => (
            <div key={gi} className="svcx__group">
              {g.title && <h3 className="svcx__gtitle"><T th={g.title.th} en={g.title.en} /></h3>}
              <ul className={g.variant === "brands" ? "svcx__brands" : "svcx__list"}>
                {g.items.map((it, ii) => (
                  <li key={ii}>{g.variant === "brands" ? <span className="en">{it.th}</span> : <T th={it.th} en={it.en} />}</li>
                ))}
              </ul>
            </div>
          ))}
          {c.callout && (
            <aside className="svcx__callout">
              <h3 className="svcx__gtitle"><T th={c.callout.title.th} en={c.callout.title.en} /></h3>
              <p><T th={c.callout.body.th} en={c.callout.body.en} /></p>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="air">
      <section className="page-hero">
        <div className="container">
          <p className="label gold">Our Services</p>
          <h1><T th="บริการของเรา" en="Our Services" /></h1>
          <p className="reading lead"><T th={servicesIntro.th} en={servicesIntro.en} /></p>
        </div>
      </section>

      {serviceCategories.map((c, i) => <Category key={c.id} c={c} dark={i % 2 === 1} />)}

      <GoldPrice variant="services" />

      <section className="section section--forest svcx-extra" aria-labelledby="extra-h">
        <div className="container">
          <p className="label">Additional Services</p>
          <h2 id="extra-h" className="ab-h2"><T th="บริการเพิ่มเติม" en="Additional services" /></h2>
          <span className="eyebrow-rule" />
          <div className="svcx-extra__grid">
            {additionalServices.map((s) => (
              <article key={s.id} id={s.id} className="svcx-extra__item">
                {s.id === "xray" && (
                  <div className="svcx-extra__media">
                    <Photo photo={photos["XRAY"]} ratio="4 / 3" sizes="(min-width:1024px) 24vw, 90vw" focus="center 60%" />
                  </div>
                )}
                {s.id === "melting" && (
                  <div className="svcx-extra__media">
                    <Photo photo={photos["84B55986"]} ratio="4 / 3" sizes="(min-width:1024px) 24vw, 90vw" focus="center 40%" />
                  </div>
                )}
                <p className="svcx-extra__eyebrow en">{s.labelEn}</p>
                <h3><T th={s.title.th} en={s.title.en} /></h3>
                <p><T th={s.body.th} en={s.body.en} /></p>
                <p className="svcx-extra__tag"><T th={s.branch.th} en={s.branch.en} /></p>
                <Link className="link-gold" href={s.href}><T th="ดูรายละเอียดและสาขาที่ให้บริการ" en="Details and branches" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServicesContact />
    </div>
  );
}
