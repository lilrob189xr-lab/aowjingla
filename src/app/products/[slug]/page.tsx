import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InquiryActions from "@/components/catalog/InquiryActions";
import ProductGallery from "@/components/catalog/ProductGallery";
import ProductNav from "@/components/catalog/ProductNav";
import { catalogConfig, categoryOf, getProductBySlug, getVisibleProducts, titleOf } from "@/lib/catalog";
import { productTypes } from "@/data/productTypes";

export const dynamicParams = false;
export const generateStaticParams = () => getVisibleProducts().map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProductBySlug((await params).slug);
  if (!p) return {};
  return {
    title: titleOf(p),
    ...(p.status === "draft" ? { robots: { index: false, follow: false } } : {}),
    ...(p.confirmed.description && p.description ? { description: p.description } : {}),
  };
}

export default async function ProductPage({ params }: Props) {
  const p = getProductBySlug((await params).slug);
  if (!p) notFound();
  const cat = categoryOf(p);
  const isDraft = p.status === "draft";
  const all = getVisibleProducts();
  const at = all.findIndex((x) => x.id === p.id);
  const target = (x?: typeof p) => (x ? { slug: x.slug, title: titleOf(x) } : undefined);

  return (
    <section className="section section--white" style={{ paddingTop: "var(--sp-7)" }}>
      <div className="container">
        <nav className="crumbs" aria-label="เส้นทาง">
          <Link href="/products">สินค้าและเครื่องประดับ</Link>
          {cat && <> <span aria-hidden="true">/</span> <Link href={`/products?category=${cat.slug}`}>{cat.nameTh}</Link></>}
        </nav>

        <div className="pdetail">
          <div className="pdetail__gallery">
            <ProductGallery images={p.images} />
          </div>

          <div className="pdetail__info">
            {cat && <p className="label gold">{cat.nameTh} · <span className="en">{cat.nameEn}</span></p>}
            <h1>{titleOf(p)}</h1>
            {p.confirmed.name && p.nameEn && <p className="label en">{p.nameEn}</p>}

            {p.confirmed.description && p.description && <p>{p.description}</p>}

            {(p.confirmed.productCode && p.productCode) || (p.confirmed.price && p.price !== null) || (p.confirmed.attributes && p.attributes.length > 0) ? (
              <dl className="specs">
                {p.confirmed.productCode && p.productCode && (<Fragment><dt>รหัสสินค้า</dt><dd>{p.productCode}</dd></Fragment>)}
                {p.confirmed.price && p.price !== null && (<Fragment><dt>ราคา</dt><dd>{p.price.toLocaleString("th-TH")} บาท</dd></Fragment>)}
                {p.confirmed.attributes && p.attributes.map((a) => (<Fragment key={a.label}><dt>{a.label}</dt><dd>{a.value}</dd></Fragment>))}
              </dl>
            ) : null}

            {!isDraft && (
              <>
                <hr className="rule-gold" />
                <p>สนใจสินค้าชิ้นนี้ สอบถามรายละเอียดได้ที่สาขา</p>
                <InquiryActions />
              </>
            )}

            {isDraft && catalogConfig.previewDrafts && (
              <aside className="draft-note">
                <strong>ข้อมูลภายใน (ไม่เผยแพร่)</strong>
                <p>สถานะ: ฉบับร่าง รอเจ้าของร้านยืนยันชื่อ หมวดหมู่ และรายละเอียด</p>
                <p>ไฟล์ภาพต้นทาง: {p.internal.sourceAssetIds.join(", ")}</p>
                {p.internal.suggestedCategory && <p>หมวดที่เสนอ (ยังไม่ยืนยัน): {p.internal.suggestedCategory}</p>}
                {p.internal.suggestedTypes && (
                  <p>ประเภทที่เสนอ (ยังไม่ยืนยัน): {p.internal.suggestedTypes.map((t) => productTypes.find((x) => x.id === t)?.nameTh).join(", ")}</p>
                )}
                {p.internal.photoShowsMultipleItems && <p>ภาพนี้มีหลายชิ้น อาจต้องแยกเป็นหลายรายการ</p>}
                {p.internal.note && <p>หมายเหตุ: {p.internal.note}</p>}
              </aside>
            )}
          </div>
        </div>
        <ProductNav prev={target(all[at - 1])} next={target(all[at + 1])} backHref={cat ? `/products?category=${cat.slug}` : "/products"} />
      </div>
    </section>
  );
}
