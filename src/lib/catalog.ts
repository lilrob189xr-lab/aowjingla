import { products, type Product, type ProductImage } from "@/data/products";
import { categories, type Category } from "@/data/categories";
import { productTypes } from "@/data/productTypes";

export const catalogConfig = {
  /** Draft intake records are visible only when NEXT_PUBLIC_CATALOG_PREVIEW=1 (internal review). */
  previewDrafts: process.env.NEXT_PUBLIC_CATALOG_PREVIEW === "1",
  /** Jewelry types are preliminary. Flip to true only after the owner confirms them. */
  showProductTypeFilter: false,
} as const;

const isPublishable = (p: Product) =>
  p.status === "published" && !!p.name && p.confirmed.name && !!p.category && p.confirmed.category && p.images.length > 0;

export const getVisibleProducts = (): Product[] =>
  products.filter((p) => isPublishable(p) || (catalogConfig.previewDrafts && p.status === "draft"));

export const getProductBySlug = (slug: string) => getVisibleProducts().find((p) => p.slug === slug);

export const categoryOf = (p: Product): Category | undefined =>
  p.confirmed.category && p.category ? categories.find((c) => c.id === p.category) : undefined;

export const titleOf = (p: Product) => (p.confirmed.name && p.name ? p.name : `รายการรอตรวจสอบ ${p.id.replace("draft-", "#").toUpperCase()}`);

/** Serializable shape handed to client components. Only confirmed values are included. */
export interface CardModel {
  id: string;
  slug: string;
  title: string;
  isDraft: boolean;
  categorySlug: string | null;
  categoryTh: string | null;
  categoryEn: string | null;
  categoryOrder: number;
  typeId: string | null;
  image: ProductImage | null;
  searchText: string;
}

export const toCardModel = (p: Product): CardModel => {
  const cat = categoryOf(p);
  const title = titleOf(p);
  return {
    id: p.id,
    slug: p.slug,
    title,
    isDraft: p.status === "draft",
    categorySlug: cat?.slug ?? null,
    categoryTh: cat?.nameTh ?? null,
    categoryEn: cat?.nameEn ?? null,
    categoryOrder: cat ? categories.indexOf(cat) : 99,
    typeId: p.confirmed.productType ? p.productType : null,
    image: p.images[0] ?? null,
    searchText: [title, p.confirmed.name ? p.nameEn : "", cat?.nameTh, cat?.nameEn, p.confirmed.productCode ? p.productCode : ""].join(" ").toLowerCase(),
  };
};

export const confirmedTypes = () => productTypes.filter((t) => t.status === "confirmed");
export { categories };
