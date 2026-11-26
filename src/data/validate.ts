import { categories } from "./categories";
import { productTypes } from "./productTypes";
import { products } from "./products";
import { assets, renderable } from "./assets";

/** Returns a list of problems. Empty list = catalog is consistent. */
export function validateCatalog(): string[] {
  const errs: string[] = [];
  const catIds = new Set<string>(categories.map((c) => c.id));
  const typeIds = new Set<string>(productTypes.map((t) => t.id));
  const assetMap = new Map(assets.map((a) => [a.id, a]));
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const p of products) {
    const tag = `[${p.id}]`;
    if (ids.has(p.id)) errs.push(`${tag} duplicate id`);
    if (slugs.has(p.slug)) errs.push(`${tag} duplicate slug`);
    ids.add(p.id); slugs.add(p.slug);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) errs.push(`${tag} slug must be lowercase letters, digits and hyphens`);

    // A value may exist only if the owner confirmed it.
    if (p.name !== null && !p.confirmed.name) errs.push(`${tag} name present but not confirmed`);
    if (p.category !== null && !p.confirmed.category) errs.push(`${tag} category present but not confirmed`);
    if (p.productType !== null && !p.confirmed.productType) errs.push(`${tag} productType present but not confirmed`);
    if (p.description !== null && !p.confirmed.description) errs.push(`${tag} description present but not confirmed`);
    if (p.productCode !== null && !p.confirmed.productCode) errs.push(`${tag} productCode present but not confirmed`);
    if (p.price !== null && !p.confirmed.price) errs.push(`${tag} price present but not confirmed`);
    if (p.attributes.length > 0 && !p.confirmed.attributes) errs.push(`${tag} attributes present but not confirmed`);

    for (const k of ["material", "diamondWeight", "goldWeight", "ringSize"] as const)
      if (p[k] && !p.confirmed.attributes) errs.push(`${tag} ${k} present but attributes not confirmed`);
    if (p.nameEn && !p.confirmed.name) errs.push(`${tag} nameEn present but name not confirmed`);
    if (p.verification === "photo-needs-owner-confirmation" && p.productCode !== null) errs.push(`${tag} photo pairing unconfirmed: productCode must stay null`);

    if (p.category !== null && !catIds.has(p.category)) errs.push(`${tag} unknown category ${p.category}`);
    if (p.productType !== null && !typeIds.has(p.productType)) errs.push(`${tag} unknown productType ${p.productType}`);

    if (p.status === "published") {
      if (!p.name || !p.confirmed.name) errs.push(`${tag} published without a confirmed name`);
      if (!p.category || !p.confirmed.category) errs.push(`${tag} published without a confirmed category`);
      if (p.images.length === 0) errs.push(`${tag} published without an image`);
    }
    for (const im of p.images) {
      const a = assetMap.get(im.assetId);
      if (!a) errs.push(`${tag} image ${im.assetId} not in assets.ts`);
      else if (!renderable(a)) errs.push(`${tag} image ${im.assetId} is excluded/unused/needs a decision`);
    }
  }
  return errs;
}
