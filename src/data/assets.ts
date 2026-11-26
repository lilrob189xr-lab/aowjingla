import type { BranchId } from "./branches";
import manifest from "./catalog-manifest.json";

export type AssetCategory =
  | "logo" | "line-qr" | "branch" | "product-gold" | "product-db"
  | "service-gold-melting" | "needs-decision" | "unused" | "excluded"
  | "about-photo" | "service-xray" | "unpublished";

export interface Asset {
  id: string; // first 8 characters of the original file name
  originalPath: string; // relative to /assets-original (originals are never modified)
  category: AssetCategory;
  branch: BranchId | null;
  note?: string;
}

// Branch assignment follows the owner's Branch 01 / Branch 02 zip files (verified by file hash).
// Assets with category "excluded" or "unused" must never be rendered.
// Optimized public copies are produced in Phase 4; only logo and LINE QR are public now.
export const assets: Asset[] = [
  { id: "F63C9844", originalPath: "01-BRAND/LOGO/F63C9844-0E9E-4BD4-83E8-6321CEC4B288.jpeg", category: "logo", branch: null },
  { id: "1AE9C1EE", originalPath: "02-CONTACT/LINE-QR/1AE9C1EE-CC2F-4E1D-BE7D-795684976DD6.jpeg", category: "line-qr", branch: null, note: "confirmed official LINE QR" },
  { id: "394AFAAD", originalPath: "03-BRANCH-AND-STORE-PHOTOS/BRANCH-IDENTITY-TO-CONFIRM/394AFAAD-FEA8-471F-92A2-5DD21265DD17.jpeg", category: "branch", branch: "kai-richy-floresta", note: "owner photo" },
  { id: "9314B702", originalPath: "03-BRANCH-AND-STORE-PHOTOS/BRANCH-IDENTITY-TO-CONFIRM/9314B702-19F1-4B6B-816F-763AADE722B7.jpeg", category: "branch", branch: "kai-richy-floresta", note: "owner photo" },
  { id: "CEBE7D37", originalPath: "03-BRANCH-AND-STORE-PHOTOS/BRANCH-IDENTITY-TO-CONFIRM/CEBE7D37-B0A8-4B44-BBC2-AEFC01DE3574.jpeg", category: "branch", branch: "kai-richy-floresta" },
  { id: "4329AD16", originalPath: "03-BRANCH-AND-STORE-PHOTOS/BRANCH-IDENTITY-TO-CONFIRM/4329AD16-BE22-4FB3-BF20-EFCC8FCE120A.jpeg", category: "branch", branch: "richy-gold-naka" },
  { id: "4FAB235C", originalPath: "03-BRANCH-AND-STORE-PHOTOS/BRANCH-IDENTITY-TO-CONFIRM/4FAB235C-5359-4DFF-80FE-971995064D37.jpeg", category: "branch", branch: "richy-gold-naka", note: "owner photo" },
  { id: "636A36E8", originalPath: "03-BRANCH-AND-STORE-PHOTOS/BRANCH-IDENTITY-TO-CONFIRM/636A36E8-B741-4BCA-86B9-D1AE067B7589.jpeg", category: "branch", branch: "richy-gold-naka" },
  { id: "84B55986", originalPath: "03-BRANCH-AND-STORE-PHOTOS/BRANCH-IDENTITY-TO-CONFIRM/84B55986-ACB5-491D-BB9D-CB937A0EEBC9.jpeg", category: "branch", branch: "richy-gold-naka" },
  { id: "D7C57040", originalPath: "03-BRANCH-AND-STORE-PHOTOS/BRANCH-IDENTITY-TO-CONFIRM/D7C57040-FFDA-49C6-85DC-F2CBB71CA2B5.jpeg", category: "branch", branch: "richy-gold-naka" },
  { id: "FEC832B8", originalPath: "03-BRANCH-AND-STORE-PHOTOS/BRANCH-IDENTITY-TO-CONFIRM/FEC832B8-C1E6-45D7-9BF0-2456E80CC202.jpeg", category: "branch", branch: "richy-gold-naka" },
  { id: "8EC7B00D", originalPath: "03-BRANCH-AND-STORE-PHOTOS/BRANCH-IDENTITY-TO-CONFIRM/8EC7B00D-BEEA-406C-AFC7-22069C115B4A.jpeg", category: "unused", branch: null, note: "branch not assigned by owner; exact duplicate of E2056BC2" },
  { id: "E2056BC2", originalPath: "06-DUPLICATES/EXACT-DUPLICATE/E2056BC2-AFB2-4468-BBB3-A877545ADACD.jpeg", category: "unused", branch: null, note: "exact duplicate of 8EC7B00D" },
  { id: "861445C7", originalPath: "03-BRANCH-AND-STORE-PHOTOS/BRANCH-IDENTITY-TO-CONFIRM/861445C7-956E-4F0C-A38F-112CE9A211ED.jpeg", category: "excluded", branch: null, note: "monk photo: must never appear on the site" },
  { id: "220502E3", originalPath: "04-PRODUCTS/GOLD-JEWELRY/220502E3-5F89-4A5A-A721-C923FB402A4A.jpeg", category: "product-gold", branch: null },
  { id: "666BCD77", originalPath: "04-PRODUCTS/GOLD-JEWELRY/666BCD77-9BE3-438D-A305-E3F38B47803C.jpeg", category: "product-gold", branch: null },
  { id: "69C57EC0", originalPath: "04-PRODUCTS/GOLD-JEWELRY/69C57EC0-57BA-4CE5-BCAC-6B45FBA931A4.jpeg", category: "product-gold", branch: null },
  { id: "6D29EBF5", originalPath: "04-PRODUCTS/GOLD-JEWELRY/6D29EBF5-36FE-4B62-B238-4D092F0F2224.jpeg", category: "product-gold", branch: null },
  { id: "7C9C139A", originalPath: "04-PRODUCTS/GOLD-JEWELRY/7C9C139A-22DF-4739-BCA0-A1BAA81065F6.jpeg", category: "product-gold", branch: null },
  { id: "FF58DC44", originalPath: "04-PRODUCTS/GOLD-JEWELRY/FF58DC44-7FCD-4131-8600-8B253854E6F9.jpeg", category: "product-gold", branch: null },
  { id: "E19D1E68", originalPath: "04-PRODUCTS/PENDANTS-AMULET-RELATED-IDENTITY-TO-CONFIRM/E19D1E68-4B3C-43D9-8C2D-CC19EEB0BB27.jpeg", category: "excluded", branch: null, note: "owner request: removed from catalog" },
  { id: "EC6DCE4B", originalPath: "04-PRODUCTS/PENDANTS-AMULET-RELATED-IDENTITY-TO-CONFIRM/EC6DCE4B-E3F0-479F-85D3-8C402ED0B6BA.jpeg", category: "excluded", branch: null, note: "owner request: removed from catalog" },
  { id: "F322B99F", originalPath: "04-PRODUCTS/PENDANTS-AMULET-RELATED-IDENTITY-TO-CONFIRM/F322B99F-DB45-44BB-A94E-5382B8A85909.jpeg", category: "excluded", branch: null, note: "owner request: removed from catalog" },
  { id: "F2781520", originalPath: "04-PRODUCTS/PENDANTS-AMULET-RELATED-IDENTITY-TO-CONFIRM/F2781520-1CFB-47D4-90E2-55AB205118F2.jpeg", category: "excluded", branch: null, note: "owner request: removed from catalog" },
  { id: "29784430", originalPath: "04-PRODUCTS/PENDANTS-AMULET-RELATED-IDENTITY-TO-CONFIRM/29784430-6AF7-46F5-A27F-6F7D268DE177.jpeg", category: "unused", branch: null, note: "crucifix: owner said keep out of public catalog" },
  { id: "F8D3A6EE", originalPath: "04-PRODUCTS/PENDANTS-AMULET-RELATED-IDENTITY-TO-CONFIRM/F8D3A6EE-00E9-4B2D-93AC-414C9452579A.jpeg", category: "unused", branch: null, note: "crucifix: owner said keep out of public catalog" },
  { id: "CAFECB5E", originalPath: "04-PRODUCTS/WATCHES-OR-JEWELRY-SETS-IDENTITY-TO-CONFIRM/CAFECB5E-4CC1-4585-BFB3-072D3811CEF6.jpeg", category: "needs-decision", branch: null, note: "mixed items incl. watches; owner decision needed before use" },
  { id: "78CD1ABB", originalPath: "05-SERVICES/GOLD-MELTING-OR-METALWORK/78CD1ABB-869E-4392-A043-09C2BB12F2BE.jpeg", category: "service-gold-melting", branch: "richy-gold-naka", note: "gold melting is Naka only" },
  { id: "9B5DB63F", originalPath: "05-SERVICES/TESTING-EQUIPMENT-IDENTITY-TO-CONFIRM/9B5DB63F-7CD2-468A-A4EE-2FF167C121FC.jpeg", category: "unused", branch: null, note: "owner: not X-Ray equipment, do not use as equipment photo" },
  // About Us photographs (owner supplied Nov 20 2026)
  { id: "IMG_3735", originalPath: "06-ABOUT-US/IMG_3735.JPG", category: "about-photo", branch: "kai-richy-floresta", note: "main owner photo: Khun Kai (green) and Khun Bee (pink); a third, unidentified woman is also in the frame" },
  { id: "IMG_3734", originalPath: "06-ABOUT-US/IMG_3734.JPG", category: "about-photo", branch: "kai-richy-floresta", note: "KAI RICHY DIAMOND sign, brand/store photo" },
  { id: "IMG_3733", originalPath: "99-EXCLUDED-DO-NOT-PUBLISH/IMG_3733.JPG", category: "excluded", branch: null, note: "owner instruction: do not use on the public website (blessing ceremony)" },
  { id: "IMG_3621", originalPath: "07-SERVICES-XRAY/IMG_3621.jpeg", category: "service-xray", branch: null, note: "X-Ray testing machine, used on Services" },
];

export const renderable = (a: Asset): boolean =>
  a.category !== "excluded" && a.category !== "unused" && a.category !== "needs-decision" && a.category !== "unpublished";

// Owner-organized collection (KAI_RICHY_DB_v4). Every group has an owner decision (Nov 18 2026):
// integrated = draft product, about = About-page photo, unpublished = identified but never shown (frames/amulets), duplicate = not used twice.
interface KrImage { stem: string; file: string }
interface KrGroup { id: string; folder: string; status: string; holdReason: string | null; images: KrImage[] }
const STATUS_CATEGORY: Record<string, AssetCategory> = { integrated: "product-db", about: "about-photo", unpublished: "unpublished", duplicate: "unused" };
for (const g of manifest.groups as unknown as KrGroup[]) {
  for (const i of g.images) {
    assets.push({
      id: i.stem,
      originalPath: `KAI_RICHY_DB_v4/By_Product/${g.folder}/${i.file}`,
      category: STATUS_CATEGORY[g.status] ?? "needs-decision",
      branch: null,
      ...(g.holdReason ? { note: g.holdReason } : {}),
    });
  }
}
