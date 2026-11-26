// PRELIMINARY jewelry types, derived from reviewing the owner's photographs.
// They are NOT confirmed brand content. They stay hidden on the public site
// (see catalogConfig.showProductTypeFilter) until the owner confirms them.
export type ProductTypeId = "ring" | "necklace" | "earrings" | "bracelet" | "pendant" | "set" | "watch" | "belt" | "other";

export interface ProductType {
  id: ProductTypeId;
  nameTh: string;
  nameEn: string;
  status: "preliminary" | "confirmed";
}

export const productTypes: ProductType[] = [
  { id: "ring", nameTh: "แหวน", nameEn: "Rings", status: "preliminary" },
  { id: "necklace", nameTh: "สร้อยคอ", nameEn: "Necklaces", status: "preliminary" },
  { id: "earrings", nameTh: "ต่างหู", nameEn: "Earrings", status: "preliminary" },
  { id: "bracelet", nameTh: "กำไลและสร้อยข้อมือ", nameEn: "Bracelets", status: "preliminary" },
  { id: "pendant", nameTh: "จี้", nameEn: "Pendants", status: "preliminary" },
  { id: "set", nameTh: "เครื่องประดับชุด", nameEn: "Sets", status: "preliminary" },
  { id: "watch", nameTh: "นาฬิกา", nameEn: "Watches", status: "preliminary" },
  { id: "belt", nameTh: "เข็มขัดและสร้อยเอว", nameEn: "Belts", status: "preliminary" },
  { id: "other", nameTh: "อื่น ๆ", nameEn: "Other", status: "preliminary" },
];
