export type CategoryId = "diamond" | "gold" | "silver" | "nak" | "watches" | "amulet-frames";

export interface Category {
  id: CategoryId;
  slug: string;
  nameTh: string;
  nameEn: string;
  /** All six categories were specified by the owner. */
  status: "confirmed" | "pending";
}

export const categories: Category[] = [
  { id: "diamond", slug: "diamond", nameTh: "เครื่องประดับเพชร", nameEn: "Diamond Jewelry", status: "confirmed" },
  { id: "gold", slug: "gold", nameTh: "ทองคำและเครื่องประดับทอง", nameEn: "Gold Jewelry", status: "confirmed" },
  { id: "silver", slug: "silver", nameTh: "เครื่องประดับเงิน", nameEn: "Silver Jewelry", status: "confirmed" },
  { id: "nak", slug: "nak", nameTh: "เครื่องประดับนาก", nameEn: "Nak Jewelry", status: "confirmed" },
  { id: "watches", slug: "watches", nameTh: "นาฬิกาหรู", nameEn: "Luxury Watches", status: "confirmed" },
  { id: "amulet-frames", slug: "amulet-frames", nameTh: "กรอบพระและกรอบอัญมณี", nameEn: "Amulet Frames", status: "confirmed" },
];
