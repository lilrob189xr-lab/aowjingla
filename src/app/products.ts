import type { CategoryId } from "./categories";
import type { ProductTypeId } from "./productTypes";
import manifest from "./catalog-manifest.json";
import cutsManifest from "./cuts-manifest.json";

export type ProductStatus = "draft" | "published";
/** "owner-confirmed": name, details and photo pairing confirmed. "photo-needs-owner-confirmation": name/details confirmed, but which photo belongs to the item is not. */
export type Verification = "owner-confirmed" | "photo-needs-owner-confirmation";

export interface ProductImage {
  assetId: string; // id in assets.ts
  src: string; // public path
  alt: string;
  width: number;
  height: number;
  /** Refined variants made by scripts/prepare-product-images.py */
  card?: { src: string; width: number; height: number };
  thumb?: { src: string; width: number; height: number };
  /** CSS object-position used when the card crops the photo (default "center"). */
  focus?: string;
}

/** Which public fields the owner has verified. A value may only be shown when its flag is true. */
export interface Confirmation {
  name: boolean; category: boolean; productType: boolean; description: boolean;
  productCode: boolean; price: boolean; attributes: boolean;
}

/** Internal working notes. Never rendered on the public site. */
export interface InternalNotes {
  sourceAssetIds: string[];
  /** Preliminary classification from reviewing the photo; NOT confirmed. */
  suggestedCategory?: CategoryId;
  suggestedTypes?: ProductTypeId[];
  photoShowsMultipleItems?: boolean;
  note?: string;
  /** Owner's group id and type from KAI_RICHY_DB_v4 (the owner's organization). */
  ownerGroup?: string;
  ownerType?: string;
  /** Label from the owner's database. NOT verified for publication; never rendered. */
  ownerLabelUnverified?: string;
}

export interface Product {
  id: string;
  slug: string;
  status: ProductStatus;
  internal: InternalNotes;
  // Public fields: null until confirmed by the owner.
  name: string | null;
  category: CategoryId | null;
  productType: ProductTypeId | null;
  description: string | null;
  images: ProductImage[];
  productCode: string | null;
  price: number | null;
  attributes: { label: string; value: string }[];
  confirmed: Confirmation;
  // Owner-supplied specifics (Nov 21 2026). null/undefined = not confirmed; never guess.
  nameEn?: string | null;
  material?: string | null;
  diamondWeight?: string | null;
  goldWeight?: string | null;
  ringSize?: string | null;
  verification?: Verification;
}

const NONE: Confirmation = { name: false, category: false, productType: false, description: false, productCode: false, price: false, attributes: false };

/**
* Single source of truth for the catalog.
* To add a product: append a record. To publish: fill the public fields, set the matching
* `confirmed` flags to true (only with owner confirmation), set status "published",
* then run `npm run validate:catalog`.
* Records below are DRAFT intake records built from the owner's photos: no names, codes,
* materials, gemstones or prices. They are invisible unless NEXT_PUBLIC_CATALOG_PREVIEW=1.
*/
export const products: Product[] = [
  {
    id: "draft-001", slug: "draft-001", status: "draft",
    internal: { sourceAssetIds: ["220502E3"], suggestedCategory: "gold", suggestedTypes: ["necklace"], photoShowsMultipleItems: false, note: "Gold-colored butterfly-motif piece(s) on a scale tray; reads as a necklace. Photo also shows a Kai Richy business card with QR in the frame." },
    name: null, category: null, productType: null, description: null,
    images: [{ assetId: "220502E3", src: "/images/products/220502E3.jpg", alt: "ภาพถ่ายสินค้าจริงของ KAI RICHY", width: 1050, height: 1400 }],
    productCode: null, price: null, attributes: [],
    confirmed: { ...NONE, category: false },
  },
  {
    id: "draft-002", slug: "draft-002", status: "draft",
    internal: { sourceAssetIds: ["666BCD77"], suggestedCategory: "gold", suggestedTypes: ["earrings", "necklace"], photoShowsMultipleItems: true, note: "Butterfly-motif pieces plus chains on a woven surface; looks like earrings and chains/bracelet in one photo." },
    name: null, category: null, productType: null, description: null,
    images: [{ assetId: "666BCD77", src: "/images/products/666BCD77.jpg", alt: "ภาพถ่ายสินค้าจริงของ KAI RICHY", width: 1050, height: 1400 }],
    productCode: null, price: null, attributes: [],
    confirmed: { ...NONE, category: false },
  },
  {
    id: "draft-003", slug: "draft-003", status: "draft",
    internal: { sourceAssetIds: ["69C57EC0"], suggestedCategory: "gold", suggestedTypes: ["bracelet", "ring"], photoShowsMultipleItems: true, note: "Several bangles/bracelets and a ring on a scale tray; business card with QR visible." },
    name: null, category: null, productType: null, description: null,
    images: [{ assetId: "69C57EC0", src: "/images/products/69C57EC0.jpg", alt: "ภาพถ่ายสินค้าจริงของ KAI RICHY", width: 1050, height: 1400 }],
    productCode: null, price: null, attributes: [],
    confirmed: { ...NONE, category: false },
  },
  {
    id: "draft-004", slug: "draft-004", status: "draft",
    internal: { sourceAssetIds: ["6D29EBF5"], suggestedCategory: "gold", suggestedTypes: ["set"], photoShowsMultipleItems: true, note: "Boxed jewelry sets in gift boxes (necklace/earring type pieces)." },
    name: null, category: null, productType: null, description: null,
    images: [{ assetId: "6D29EBF5", src: "/images/products/6D29EBF5.jpg", alt: "ภาพถ่ายสินค้าจริงของ KAI RICHY", width: 1400, height: 1050 }],
    productCode: null, price: null, attributes: [],
    confirmed: { ...NONE, category: false },
  },
  {
    id: "draft-005", slug: "draft-005", status: "draft",
    internal: { sourceAssetIds: ["7C9C139A"], suggestedCategory: "gold", suggestedTypes: ["pendant", "ring"], photoShowsMultipleItems: true, note: "Mixed pendants, frames and rings on a tray." },
    name: null, category: null, productType: null, description: null,
    images: [{ assetId: "7C9C139A", src: "/images/products/7C9C139A.jpg", alt: "ภาพถ่ายสินค้าจริงของ KAI RICHY", width: 1050, height: 1400 }],
    productCode: null, price: null, attributes: [],
    confirmed: { ...NONE, category: false },
  },
  {
    id: "draft-006", slug: "draft-006", status: "draft",
    internal: { sourceAssetIds: ["FF58DC44"], suggestedCategory: "gold", suggestedTypes: ["necklace", "pendant", "other"], photoShowsMultipleItems: true, note: "Chains, pendants and a small bar-shaped piece on a tray; business card with QR visible." },
    name: null, category: null, productType: null, description: null,
    images: [{ assetId: "FF58DC44", src: "/images/products/FF58DC44.jpg", alt: "ภาพถ่ายสินค้าจริงของ KAI RICHY", width: 1050, height: 1400 }],
    productCode: null, price: null, attributes: [],
    confirmed: { ...NONE, category: false },
  },
];

// ---- Products from the owner's organized collection (KAI_RICHY_DB_v4) ----
// One DRAFT record per integrated group. Names, codes, materials, gemstones and prices stay empty until the
// owner confirms them. Groups the owner must decide on are "held" in the manifest and are not listed here.
interface ManifestImage { stem: string; variants: { gallery: { src: string; width: number; height: number }; card: { src: string; width: number; height: number }; thumb: { src: string; width: number; height: number } } }
interface ManifestGroup { id: string; ownerType: string; ownerLabel: string; status: string; images: ManifestImage[] }
const TYPE_BY_OWNER: Record<string, ProductTypeId> = {
  Watch: "watch", Ring: "ring", Belt: "belt", Pendant: "pendant", Necklace: "necklace", Earrings: "earrings",
  "Jewelry Set": "set", "Gold Set": "set", Silverware: "other", "Mixed Gold": "other",
};
const fromOwner = (manifest.groups as unknown as ManifestGroup[])
  .filter((g) => g.status === "integrated")
  .map((g): Product => ({
    id: g.id.toLowerCase(), slug: g.id.toLowerCase(), status: "draft",
    internal: {
      sourceAssetIds: g.images.map((i) => i.stem),
      ownerGroup: g.id, ownerType: g.ownerType, ownerLabelUnverified: g.ownerLabel,
      suggestedTypes: TYPE_BY_OWNER[g.ownerType] ? [TYPE_BY_OWNER[g.ownerType]] : undefined,
      photoShowsMultipleItems: g.id === "KR-013",
      note: "Owner-organized group. Name, category, code and details await owner confirmation.",
    },
    name: null, category: null, productType: null, description: null,
    images: g.images.map((i) => ({
      assetId: i.stem, src: i.variants.gallery.src, width: i.variants.gallery.width, height: i.variants.gallery.height,
      alt: "ภาพถ่ายสินค้าจริงของ KAI RICHY", card: i.variants.card, thumb: i.variants.thumb,
    })),
    productCode: null, price: null, attributes: [], confirmed: { ...NONE },
  }));
products.push(...fromOwner);

// ---- Publication (owner confirmed all listed items, Nov 20 2026) ----
// Names are short descriptive Thai names drafted from the owner's database types and the photos. They contain NO brand
// names, codes, materials, weights or prices; add those fields (and the matching `confirmed` flags) only when the owner supplies them.
// Not published, by earlier owner decision: KR-006, KR-007 (gold frames), KR-015 (amulet pendant), KR-016 (duplicate).
const PUBLISH: Record<string, { name: string; category: CategoryId }> = {
  "draft-001": { name: "สร้อยคอทองลายผีเสื้อ", category: "gold" },
  "draft-002": { name: "ต่างหูและสร้อยทองลายผีเสื้อ", category: "gold" },
  "draft-003": { name: "กำไลทองและแหวนทอง", category: "gold" },
  "draft-004": { name: "ชุดเครื่องประดับทองในกล่องของขวัญ", category: "gold" },
  "draft-005": { name: "จี้และแหวนทองหลายแบบ", category: "gold" },
  "draft-006": { name: "สร้อยคอและจี้ทองหลายแบบ", category: "gold" },
  "kr-001": { name: "นาฬิกาหรู หน้าปัดสีเขียว", category: "watches" },
  "kr-002": { name: "แหวนเงิน", category: "silver" },
  "kr-003": { name: "เข็มขัดทองลายฉลุ", category: "gold" },
  "kr-004": { name: "แหวนเพชรทรงหัวใจ", category: "diamond" },
  "kr-005": { name: "แหวนเพชรแถวกว้าง", category: "diamond" },
  "kr-008": { name: "แหวนทองฝังเพชร", category: "diamond" },
  "kr-009": { name: "แหวนทองฝังเพชรทรงสี่เหลี่ยม", category: "diamond" },
  "kr-010": { name: "สร้อยคอทองฝังเพชร หัวงู", category: "diamond" },
  "kr-011": { name: "ต่างหูทองรูปหัวเสือ", category: "gold" },
  "kr-012": { name: "ชุดช้อนส้อมเงิน", category: "silver" },
  "kr-013": { name: "เครื่องประดับเพชรหลายชิ้น", category: "diamond" },
  "kr-014": { name: "ทองรูปพรรณหลายชิ้น", category: "gold" },
  "kr-017": { name: "แหวนเพชร", category: "diamond" },
};
for (const p of products) {
  const d = PUBLISH[p.id];
  if (!d) continue;
  p.name = d.name;
  p.category = d.category;
  p.status = "published";
  p.confirmed = { ...p.confirmed, name: true, category: true };
}

// ---- Owner-confirmed product details (Nov 21 2026) ----
// Source: owner's "Product Image Matching & Catalog Update" list. Only values the owner stated are set; everything else stays null.
// productCode stays null for all of these: the owner has not issued product codes. `kr-0xx` ids are internal photo-group ids, not Product Codes.
// Photo pairing: matched by inspecting the owner's photos. kr-017 (Jubilee gold ring) is matched by appearance only, so it is flagged.
interface OwnerDetail {
  name: string; nameEn: string; description: string;
  material?: string; goldWeight?: string; diamondWeight?: string; ringSize?: string;
  extra?: { label: string; value: string }[];
  verification: Verification;
}
const OWNER_DETAILS: Record<string, OwnerDetail> = {
  "kr-005": { name: "แหวนเพชรดีไซน์แถวกว้าง Rosendorff Piaget", nameEn: "Rosendorff Piaget Diamond Band Ring",
    description: "แหวนเพชรทรงกว้าง มีตราประทับ 750 อยู่ด้านในตัวเรือน", verification: "owner-confirmed" },
  "kr-004": { name: "แหวนเพชร Jubilee ทรงหัวใจ", nameEn: "Jubilee Heart-Shaped Diamond Ring",
    description: "แหวนเพชร Jubilee ทรงหัวใจ", verification: "owner-confirmed" },
  "kr-017": { name: "แหวนทองประดับเพชรเม็ดใหญ่ Jubilee", nameEn: "Jubilee Gold Diamond Ring",
    description: "แหวน Jubilee อีกหนึ่งวง ลักษณะเป็นแหวนทองประดับเพชรเม็ดใหญ่", verification: "photo-needs-owner-confirmation" },
  "kr-009": { name: "แหวนทองคำ 18K ประดับเพชร 40 ตัง", nameEn: "18K Gold Diamond Ring",
    description: "แหวนทองฝังเพชรทรงสี่เหลี่ยม", material: "ทองคำ 18K", goldWeight: "6.5 กรัม", diamondWeight: "40 ตัง", ringSize: "60", verification: "owner-confirmed" },
  "kr-002": { name: "แหวน Cartier LOVE", nameEn: "Cartier LOVE Ring",
    description: "แหวน Cartier LOVE โดดเด่นด้วยดีไซน์อันเป็นเอกลักษณ์และลวดลายสกรูที่สะท้อนตัวตนของคอลเลกชัน LOVE ถ่ายทอดความเรียบหรูเหนือกาลเวลาและความสง่างามที่ไม่ขึ้นอยู่กับกระแสแฟชั่น เหมาะสำหรับผู้ที่ชื่นชอบเครื่องประดับดีไซน์คลาสสิกและมีเอกลักษณ์เฉพาะตัว",
    ringSize: "58", verification: "owner-confirmed" },
  "kr-008": { name: "แหวนทองคำ 18K ประดับเพชรสามเม็ด", nameEn: "18K Gold Three-Stone Diamond Ring",
    description: "แหวนทองฝังเพชรสามเม็ด", material: "ทองคำ 18K", goldWeight: "6.6 กรัม", diamondWeight: "15 ตัง (น้ำหนักรวม)", ringSize: "60", verification: "owner-confirmed" },
  "kr-001": { name: "นาฬิกา Rolex Oyster Perpetual 41", nameEn: "Rolex Oyster Perpetual 41",
    description: "นาฬิกาแบรนด์ Rolex รุ่น Oyster Perpetual", extra: [{ label: "ขนาดตัวเรือน", value: "41 มม." }], verification: "owner-confirmed" },
};
for (const p of products) {
  const d = OWNER_DETAILS[p.id];
  if (!d) continue;
  p.name = d.name; p.nameEn = d.nameEn; p.description = d.description;
  p.material = d.material ?? null; p.goldWeight = d.goldWeight ?? null; p.diamondWeight = d.diamondWeight ?? null; p.ringSize = d.ringSize ?? null;
  p.verification = d.verification;
  p.attributes = [
    ...(d.material ? [{ label: "วัสดุ", value: d.material }] : []),
    ...(d.goldWeight ? [{ label: "น้ำหนักทอง", value: d.goldWeight }] : []),
    ...(d.diamondWeight ? [{ label: "น้ำหนักเพชร", value: d.diamondWeight }] : []),
    ...(d.ringSize ? [{ label: "ไซซ์", value: d.ringSize }] : []),
    ...(d.extra ?? []),
  ];
  p.images = p.images.map((im) => ({ ...im, alt: `${d.name} ภาพถ่ายสินค้าจริงของ KAI RICHY` }));
  p.confirmed = { ...p.confirmed, name: true, description: true, attributes: p.attributes.length > 0 };
}

// ---- Cuts_Luxury_English_Folders (Nov 28 2026) ----
// Real product photos only (no screenshots). Group "kr-001-extra" holds extra photos of the green-dial Rolex and is merged into the existing
// kr-001 gallery (confirmed same watch); every other group becomes a DRAFT record: hidden, no name/code/price/details until the owner confirms.
// Ids use the "cuts-" prefix because the Products-series KR numbers in the Cuts folders are a different series from the catalog ids kr-0xx.
interface CutsVariant { src: string; width: number; height: number }
interface CutsImage { stem: string; variants: { gallery: CutsVariant; card: CutsVariant; thumb: CutsVariant } }
interface CutsGroup { id: string; folder: string; label: string; images: CutsImage[]; mergeInto?: string }
const cutsImage = (i: CutsImage, alt: string): ProductImage => ({
  assetId: i.stem, src: i.variants.gallery.src, width: i.variants.gallery.width, height: i.variants.gallery.height,
  alt, card: i.variants.card, thumb: i.variants.thumb,
});

const CUTS_PUBLISH: Record<string, { name: string; nameEn: string; category: CategoryId }> = {
  "cuts-002": { name: "แหวนเพชรเม็ดใหญ่ Jubilee", nameEn: "Jubilee Oversized Diamond Ring", category: "diamond" },
  "cuts-003": { name: "เครื่องประดับเพชร Cartier", nameEn: "Cartier Diamond Jewelry", category: "diamond" },
  "cuts-005": { name: "ต่างหูเพชร Bvlgari", nameEn: "Bvlgari Diamond Earrings", category: "diamond" },
  "cuts-006": { name: "แหวน Bvlgari B.zero1 เซรามิกดำพิงก์โกลด์", nameEn: "Bvlgari B.zero1 Black Ceramic & Pink Gold Ring", category: "diamond" },
  "cuts-007": { name: "สร้อยคอพร้อมจี้เพชร Jubilee", nameEn: "Jubilee Diamond Pendant Necklace", category: "diamond" },
  "cuts-008": { name: "นาฬิกา Chanel J12 เซรามิกขาวขอบเพชร", nameEn: "Chanel J12 White Ceramic Diamond Bezel Watch", category: "watches" },
  "cuts-009": { name: "ชุดสร้อยคอและต่างหู Van Cleef 18K", nameEn: "Van Cleef 18K Necklace & Earrings Set", category: "diamond" },
  "cuts-010": { name: "กำไลข้อมือ Tiffany T โรสโกลด์", nameEn: "Tiffany T Rose Gold Bangle", category: "gold" },
  "cuts-011": { name: "ต่างหูทอง 18K ฝังเพชร Chanel", nameEn: "Chanel 18K Gold Diamond Earrings", category: "diamond" },
  "cuts-012": { name: "แหวนเพชรดีไซน์หรู", nameEn: "Statement Diamond Ring", category: "diamond" },
  "cuts-013": { name: "แหวนเพชร Bvlgari", nameEn: "Bvlgari Diamond Ring", category: "diamond" },
  "cuts-014": { name: "แหวนทองฝังเพชร", nameEn: "Gold Diamond Ring", category: "diamond" },
  "cuts-015": { name: "แหวนเพชร", nameEn: "Diamond Ring", category: "diamond" },
  "cuts-017": { name: "แหวนเพชรเม็ดเดี่ยว", nameEn: "Solitaire Diamond Ring", category: "diamond" },
  "cuts-020": { name: "สร้อยคอพร้อมจี้เพชรรูปงู", nameEn: "Diamond Snake Pendant Necklace", category: "diamond" },
  "cuts-022": { name: "แหวนเพชร Cartier", nameEn: "Cartier Diamond Ring", category: "diamond" },
  "cuts-028": { name: "แหวนคู่ทอง 18K ฝังเพชร", nameEn: "18K Gold Diamond Couple Rings", category: "diamond" },
  "cuts-031": { name: "สร้อยคอทองคำแท้ 14K", nameEn: "14K Solid Gold Necklace", category: "gold" },
  "cuts-036": { name: "สร้อยคอเงินดีไซน์หนา", nameEn: "Bold Silver Necklace", category: "silver" },
  "cuts-040": { name: "แหวนเพชรหน้ากว้าง", nameEn: "Statement Diamond Ring", category: "diamond" },
  "cuts-042": { name: "ชุดสร้อยคอและสร้อยข้อมือเพชร", nameEn: "Diamond Necklace & Bracelet Set", category: "diamond" },
  "cuts-044": { name: "แหวนคู่ Cartier", nameEn: "Cartier Couple Rings", category: "diamond" },
  "cuts-046": { name: "สร้อยคอทองคำ", nameEn: "Gold Necklace", category: "gold" },
};

for (const g of cutsManifest.groups as unknown as CutsGroup[]) {
  if (g.mergeInto) {
    const target = products.find((p) => p.id === g.mergeInto);
    if (target) target.images.push(...g.images.map((i) => cutsImage(i, target.name ? `${target.name} ภาพถ่ายสินค้าจริงของ KAI RICHY` : "ภาพถ่ายสินค้าจริงของ KAI RICHY")));
    continue;
  }
  const pub = CUTS_PUBLISH[g.id];
  const itemName = pub ? pub.name : g.label;
  products.push({
    id: g.id, slug: g.id, status: "published",
    internal: {
      sourceAssetIds: g.images.map((i) => i.stem), ownerGroup: g.folder, ownerLabelUnverified: g.label,
      note: "Published directly per owner approval.",
    },
    name: itemName,
    nameEn: pub ? pub.nameEn : g.label,
    category: pub ? pub.category : "diamond",
    productType: null,
    description: null,
    images: g.images.map((i) => cutsImage(i, `${itemName} ภาพถ่ายสินค้าจริงของ KAI RICHY`)),
    productCode: null,
    price: null,
    attributes: [],
    verification: "owner-confirmed",
    confirmed: { ...NONE, name: true, category: true },
  });
}
