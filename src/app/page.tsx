import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { brand } from "@/data/brand";
import { branches } from "@/data/branches";
import { categories } from "@/data/categories";
import { buyCategories } from "@/data/webuy";
import { photos } from "@/data/photos";
import { getVisibleProducts, toCardModel } from "@/lib/catalog";
import SectionHead from "@/components/ui/SectionHead";
import Photo from "@/components/ui/Photo";
import CategoryTile from "@/components/brand/CategoryTile";
import BranchCard from "@/components/brand/BranchCard";
import FactsBar from "@/components/brand/FactsBar";
import GoldPrice from "@/components/brand/GoldPrice";
import { T } from "@/components/i18n/LangProvider";
import ProductCard from "@/components/catalog/ProductCard";

export const metadata: Metadata = {
  title: { absolute: "KAI RICHY | ทองคำ เพชร และเครื่องประดับ ภูเก็ต" },
  description: "KAI RICHY เครื่องประดับ ทองคำ เพชร และบริการเกี่ยวกับโลหะมีค่า สองสาขาในจังหวัดภูเก็ต: เซ็นทรัล ภูเก็ต ฟลอเรสต้า และตลาดท้ายรถนาคา",
};

export default function HomePage() {
  // Showcase uses published (owner-confirmed) products only; the section is hidden when there are none.
  const featuredIds = ["kr-001", "kr-004", "kr-011", "kr-003"]; // best photographs first
  const visible = getVisibleProducts().map(toCardModel).filter((p) => !p.isDraft);
  const showcase = [...featuredIds.map((id) => visible.find((p) => p.id === id)), ...visible].filter((p, i, a): p is NonNullable<typeof p> => !!p && a.indexOf(p) === i).slice(0, 4);
  const logo = brand.logoArtwork;

  return (
    <div className="air">
      {/* 1. Hero: quiet statement, then one large genuine photograph */}
      <section className="air-hero">
        <div className="container air-hero__head">
          <div className="hero__mark">
            <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} priority sizes="104px" />
          </div>
          <p className="label en">{brand.tagline}</p>
          <h1><T th="ทองคำ เพชร และเครื่องประดับ ภูเก็ต" en="Gold, Diamonds & Fine Jewelry in Phuket" /></h1>
          <p className="reading lead"><T th="KAI RICHY เครื่องประดับ ทองคำ เพชร และบริการเกี่ยวกับโลหะมีค่า สองสาขาในจังหวัดภูเก็ต" en="Jewelry, gold, diamonds and precious-metal services across two branches in Phuket." /></p>
          <div className="inquiry">
            <Link className="btn btn--primary" href="/products"><T th="ชมสินค้า" en="View Collection" /></Link>
            <Link className="btn btn--secondary" href="/locations"><T th="สาขาของเรา" en="Our Branches" /></Link>
          </div>
        </div>
        <div className="bleed">
          <Photo photo={photos["CEBE7D37"]} ratio="4 / 3" priority sizes="100vw" focus="center 55%" tag="สาขาเซ็นทรัล ภูเก็ต ฟลอเรสต้า" />
        </div>
      </section>

      <FactsBar />

      {/* 2. Brand introduction */}
      <section className="section section--ivory">
        <div className="container editorial">
          <div className="frame-offset" style={{ maxWidth: 520 }}>
            <Photo photo={photos["9314B702"]} ratio="4 / 5" sizes="(min-width:1024px) 40vw, 100vw" focus="center 30%" />
          </div>
          <div className="editorial__text">
            <p className="label">About KAI RICHY</p>
            <h2 className="display">The Art of <em>Timeless</em> Value</h2>
            <span className="eyebrow-rule" />
            <p>KAI RICHY คือธุรกิจเครื่องประดับ ทองคำ เพชร และบริการเกี่ยวกับโลหะมีค่าในจังหวัดภูเก็ต เรามีสองสาขา ให้คุณเลือกชมสินค้า ปรึกษาบริการ และสอบถามรายละเอียดได้ที่หน้าร้าน</p>
            <Link className="btn btn--secondary" href="/about">รู้จักเรา</Link>
          </div>
        </div>
      </section>

      {/* 3. Categories */}
      <section className="section section--white">
        <div className="container">
          <SectionHead label="Categories" title="หมวดหมู่สินค้า" />
          <div className="tiles">
            {categories.map((c, i) => <CategoryTile key={c.id} category={c} index={i} />)}
          </div>
          <p style={{ marginTop: "var(--sp-5)" }}><Link className="link-gold" href="/categories">ดูหมวดหมู่ทั้งหมด</Link></p>
        </div>
      </section>

      {/* 4. Product showcase (only real, confirmed products) */}
      {showcase.length > 0 && (
        <section className="section section--ivory">
          <div className="container">
            <SectionHead label="Selected" title="สินค้าแนะนำ" />
            <div className="pgrid">{showcase.map((p) => <ProductCard key={p.id} item={p} />)}</div>
            <p style={{ marginTop: "var(--sp-6)" }}><Link className="btn btn--secondary" href="/products">ดูสินค้าทั้งหมด</Link></p>
          </div>
        </section>
      )}

      {/* 5. WE BUY */}
      <section className="section section--white air-keep">
        <div className="container editorial editorial--wide-first">
          <div className="editorial__text">
            <p className="label">We Buy</p>
            <h2 className="display">WE BUY <em>รับซื้อ</em></h2>
            <span className="eyebrow-rule" />
            <p>รับซื้อทองคำ เพชร และเครื่องประดับ สอบถามรายการสินค้าที่สนใจขายได้ทาง LINE หรือโทรหาสาขา</p>
            <Link className="btn btn--secondary" href="/we-buy">ดูรายละเอียด WE BUY</Link>
          </div>
          <ul className="dlist">
            {buyCategories.map((c, i) => (
              <li key={c.id}>
                <span className="dlist__no en">{String(i + 1).padStart(2, "0")}</span>
                <span className="dlist__th">{c.nameTh}<span className="dlist__en en">{c.nameEn}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gold price reference (Phase 7A.1) */}
      <GoldPrice variant="home" />

      {/* 7. From our branches */}
      <section className="section section--white">
        <div className="container">
          <SectionHead label="Our Stores" title="ภาพจากสาขาของเรา" />
          <div className="mosaic">
            <div className="mosaic__a"><Photo photo={photos["4329AD16"]} ratio="4 / 3" sizes="(min-width:1024px) 60vw, 100vw" tag="สาขาตลาดท้ายรถนาคา" /></div>
            <div className="mosaic__b"><Photo photo={photos["636A36E8"]} ratio="4 / 5" sizes="(min-width:1024px) 30vw, 50vw" focus="center 30%" tag="หน้าร้านริชชี่โกลด์หลอมทอง" /></div>
            <div className="mosaic__c"><Photo photo={photos["D7C57040"]} ratio="4 / 5" sizes="(min-width:1024px) 30vw, 50vw" tag="เคาน์เตอร์สาขาตลาดท้ายรถนาคา" /></div>
          </div>
        </div>
      </section>

      {/* 8. Branches */}
      <section className="section section--ivory">
        <div className="container">
          <SectionHead label="Branches" title="สาขาของเรา" />
          <div className="bgrid">
            {branches.map((b) => <BranchCard key={b.id} branch={b} />)}
          </div>
        </div>
      </section>

    </div>
  );
}
