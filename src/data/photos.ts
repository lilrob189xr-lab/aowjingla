import type { BranchId } from "./branches";

export interface Photo {
  id: string; // asset id (see assets.ts)
  src: string;
  alt: string;
  width: number;
  height: number;
  branch?: BranchId;
}

// Branch photos follow the owner's Branch 01 / Branch 02 files. Only owner-approved photos.
export const photos: Record<string, Photo> = {
  "CEBE7D37": { id: "CEBE7D37", src: "/images/branches/CEBE7D37.jpg", alt: "เคาน์เตอร์จัดแสดงเครื่องประดับ KAI RICHY ภายในศูนย์การค้า", width: 1320, height: 982, branch: "kai-richy-floresta" },
  "9314B702": { id: "9314B702", src: "/images/branches/9314B702.jpg", alt: "ภายในร้านสาขาเซ็นทรัล ภูเก็ต ฟลอเรสต้า", width: 1108, height: 1477, branch: "kai-richy-floresta" },
  "394AFAAD": { id: "394AFAAD", src: "/images/branches/394AFAAD.jpg", alt: "ภายในร้านสาขาเซ็นทรัล ภูเก็ต ฟลอเรสต้า", width: 1108, height: 1477, branch: "kai-richy-floresta" },
  "636A36E8": { id: "636A36E8", src: "/images/branches/636A36E8.jpg", alt: "หน้าร้านริชชี่โกลด์หลอมทอง สาขาตลาดท้ายรถนาคา", width: 924, height: 1466, branch: "richy-gold-naka" },
  "4329AD16": { id: "4329AD16", src: "/images/branches/4329AD16.jpg", alt: "ภายในร้านสาขาตลาดท้ายรถนาคา", width: 1477, height: 1108, branch: "richy-gold-naka" },
  "FEC832B8": { id: "FEC832B8", src: "/images/branches/FEC832B8.jpg", alt: "ภายในร้านสาขาตลาดท้ายรถนาคา", width: 1108, height: 1477, branch: "richy-gold-naka" },
  "D7C57040": { id: "D7C57040", src: "/images/branches/D7C57040.jpg", alt: "เคาน์เตอร์ภายในร้านสาขาตลาดท้ายรถนาคา", width: 1477, height: 1108, branch: "richy-gold-naka" },
  "84B55986": { id: "84B55986", src: "/images/branches/84B55986.jpg", alt: "บริการหลอมทองที่สาขาตลาดท้ายรถนาคา", width: 928, height: 1600, branch: "richy-gold-naka" },
  "4FAB235C": { id: "4FAB235C", src: "/images/branches/4FAB235C.jpg", alt: "ภาพจากสาขาตลาดท้ายรถนาคา", width: 1280, height: 1280, branch: "richy-gold-naka" },
  // Owner-approved genuine store photo (KR-STORE) for the About page; not a product image.
  // About page photographs supplied by the owner (originals in assets-original/06-ABOUT-US).
  // Identities per owner: Khun Kai (mother, founder) wears the GREEN dress; Khun Bee (daughter) wears the PINK dress.
  // A third woman (floral dress, right) is in the frame; the owner has not identified her, so no name is given for her.
  "ABOUT-FAMILY": { id: "IMG_3735", src: "/images/about/kai-and-bee.jpg", alt: "คุณไก่ (เสื้อสีเขียว) และคุณบี (เสื้อสีชมพู) ยืนเคียงกันหน้าเคาน์เตอร์ KAI RICHY ที่ศูนย์การค้า Central Phuket พร้อมผู้หญิงอีกหนึ่งท่านทางขวาของภาพ", width: 2048, height: 1226, branch: "kai-richy-floresta" },
  "ABOUT-BRAND": { id: "IMG_3734", src: "/images/about/brand-sign.jpg", alt: "ป้ายโลโก้ Kai Richy Diamond สีเขียวมรกตกรอบขาวที่หน้าร้าน มีดอกไม้อยู่เบื้องหน้า", width: 2048, height: 1365, branch: "kai-richy-floresta" },
  // X-Ray testing machine (owner photo IMG_3621, originals in assets-original/07-SERVICES-XRAY).
  "XRAY": { id: "IMG_3621", src: "/images/services/xray-machine.jpg", alt: "เครื่องตรวจสอบโลหะมีค่าด้วย X-Ray ของ KAI RICHY พร้อมคอมพิวเตอร์แสดงผล", width: 1108, height: 1477 },
  "KR-STORE": { id: "KR-STORE_01_main", src: "/images/catalog/KR-STORE/KR-STORE_01_main-gallery.jpg", alt: "ทีมงานหน้าร้าน KAI RICHY", width: 600, height: 800 },
};

export const photosOf = (branch: BranchId): Photo[] =>
  Object.values(photos).filter((p) => p.branch === branch);
