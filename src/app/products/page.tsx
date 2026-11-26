import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogBrowser from "@/components/catalog/CatalogBrowser";
import { catalogConfig, categories, confirmedTypes, getVisibleProducts, toCardModel } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "สินค้าและเครื่องประดับ",
  description: "ชมสินค้าและเครื่องประดับของ KAI RICHY สอบถามรายละเอียดได้ทาง LINE หรือโทรหาสาขา",
  ...(catalogConfig.previewDrafts ? { robots: { index: false, follow: false } } : {}),
};

export default function ProductsPage() {
  const items = getVisibleProducts().map(toCardModel);
  const types = catalogConfig.showProductTypeFilter
    ? confirmedTypes().map((t) => ({ id: t.id, nameTh: t.nameTh }))
    : null;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="label gold">Catalog</p>
          <h1>สินค้าและเครื่องประดับ</h1>
          <p className="reading lead">ชมสินค้าและเครื่องประดับของ KAI RICHY สอบถามรายละเอียดได้ทาง LINE หรือโทรหาสาขา</p>
          {catalogConfig.previewDrafts && (
            <p className="preview-banner">โหมดตรวจสอบภายใน: แสดงรายการฉบับร่างที่ยังไม่ได้รับการยืนยัน ห้ามเผยแพร่</p>
          )}
        </div>
      </section>
      <section className="section section--white" style={{ paddingTop: "var(--sp-7)" }}>
        <div className="container">
          <Suspense fallback={null}>
            <CatalogBrowser
              items={items}
              categories={categories.map((c) => ({ slug: c.slug, nameTh: c.nameTh, nameEn: c.nameEn }))}
              types={types}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
}
