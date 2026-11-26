import type { Metadata } from "next";
import { T } from "@/components/i18n/LangProvider";
import CategoryCard from "@/components/catalog/CategoryCard";
import { categories, categoryOf, getVisibleProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "หมวดหมู่สินค้า",
  description: "หมวดหมู่สินค้าของ KAI RICHY: เครื่องประดับเพชร ทองคำ เงิน นาก นาฬิกาหรู และกรอบพระ",
};

export default function CategoriesPage() {
  const visible = getVisibleProducts();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="label gold">Categories</p>
          <h1><T th="หมวดหมู่สินค้า" en="Categories" /></h1>
        </div>
      </section>
      <section className="section section--white" style={{ paddingTop: "var(--sp-7)" }}>
        <div className="container">
          <div className="cgrid cgrid--mixed">
            {categories.map((c) => {
              const inCat = visible.filter((p) => categoryOf(p)?.id === c.id);
              return <CategoryCard key={c.id} category={c} count={inCat.length} cover={inCat[0]?.images[0] ?? null} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
