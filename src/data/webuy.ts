import { getBranch } from "./branches";
import { contact } from "./contact";

// WE BUY page content. Only confirmed facts are stated; anything that depends on the item or the branch
// directs the customer to the branch's official channels.
export interface BuyCategory { id: string; nameTh: string; nameEn: string; }

// The seven officially confirmed purchasing categories (owner, Nov 2026).
export const buyCategories: BuyCategory[] = [
  { id: "gold", nameTh: "ทองคำ", nameEn: "Gold" },
  { id: "diamond", nameTh: "เครื่องประดับเพชร", nameEn: "Diamond Jewelry" },
  { id: "luxury-branded", nameTh: "เครื่องประดับแบรนด์หรู", nameEn: "Luxury Branded Jewelry" },
  { id: "rings-necklaces-bracelets", nameTh: "แหวน สร้อยคอ และกำไล", nameEn: "Rings, Necklaces & Bracelets" },
  { id: "gemstones", nameTh: "อัญมณีและพลอย", nameEn: "Gemstones & Precious Stones" },
  { id: "amulets", nameTh: "พระเครื่องและกรอบพระ", nameEn: "Buddhist Amulets & Amulet Frames" },
  { id: "other", nameTh: "สินค้าอื่น ๆ", nameEn: "Other Items" },
];

export interface Step { no: string; title: string; text: string; }

// General inquiry process. States no prices, methods, timing or conditions.
export const buySteps: Step[] = [
  { no: "01", title: "ติดต่อสอบถาม", text: "ติดต่อเราทาง LINE หรือโทรศัพท์ และแจ้งประเภทสินค้าที่สนใจขาย" },
  { no: "02", title: "เลือกสาขาที่สะดวก", text: "ดูที่อยู่ เวลาเปิดทำการ และแผนที่ของแต่ละสาขาได้ที่หน้าสาขาของเรา" },
  { no: "03", title: "ประเมินมูลค่าหน้างาน", text: "ร้านมีบริการประเมินมูลค่าสินค้าหน้างาน สอบถามรายละเอียดเพิ่มเติมได้ที่สาขา" },
];

export interface FaqItem { q: string; a: string[]; }
export interface FaqGroup { title: string; items: FaqItem[]; }

const fl = getBranch("kai-richy-floresta");
const nk = getBranch("richy-gold-naka");

export const faqGroups: FaqGroup[] = [
  {
    title: "สินค้าที่รับซื้อ",
    items: [
      {
        q: "ร้านรับซื้อสินค้าประเภทใดบ้าง",
        a: ["KAI RICHY รับซื้อทองคำ เครื่องประดับเพชร เครื่องประดับแบรนด์หรู แหวน สร้อยคอ และกำไล อัญมณีและพลอย พระเครื่องและกรอบพระ รวมถึงสินค้าอื่น ๆ"],
      },
      {
        q: "สินค้าของฉันไม่ตรงกับหมวดที่ระบุไว้ สอบถามได้หรือไม่",
        a: ["สอบถามได้ ร้านรับซื้อสินค้าอื่น ๆ ด้วย หากไม่แน่ใจว่าสินค้าของคุณอยู่ในรายการที่รับซื้อหรือไม่ กรุณาแจ้งรายละเอียดผ่าน LINE หรือโทรสอบถามสาขาได้โดยตรง"],
      },
    ],
  },
  {
    title: "การประเมินและราคา",
    items: [
      {
        q: "ร้านมีบริการประเมินมูลค่าสินค้าหรือไม่",
        a: ["มี ร้านมีบริการประเมินมูลค่าสินค้าหน้างาน สอบถามรายละเอียดสำหรับสินค้าของคุณได้ที่สาขา"],
      },
      {
        q: "มีบริการตรวจสอบโลหะมีค่าหรือไม่",
        a: ["มี ทั้งสองสาขามีบริการตรวจสอบโลหะมีค่าด้วยเครื่อง X-Ray แบบไม่ทำลายชิ้นงาน"],
      },
      {
        q: "ราคารับซื้อเป็นอย่างไร",
        a: ["เว็บไซต์นี้ไม่ได้แสดงราคารับซื้อ เนื่องจากสินค้าแต่ละชิ้นมีรายละเอียดแตกต่างกัน กรุณาติดต่อสาขาเพื่อสอบถามสินค้าที่คุณสนใจขาย"],
      },
      {
        q: "ต้องเตรียมเอกสาร วิธีรับชำระเงิน และระยะเวลาดำเนินการอย่างไร",
        a: ["เพื่อให้ได้ข้อมูลที่ถูกต้องตรงกับสินค้าของคุณ กรุณาสอบถามเรื่องเอกสาร วิธีรับชำระเงิน และระยะเวลาดำเนินการกับสาขาที่คุณสะดวกใช้บริการ ผ่าน LINE หรือโทรศัพท์"],
      },
    ],
  },
  {
    title: "สาขาและการติดต่อ",
    items: [
      {
        q: "ติดต่อสอบถามก่อนเดินทางมาที่ร้านได้อย่างไร",
        a: [
          "ติดต่อได้ทาง LINE ของร้าน หรือโทรหาสาขาโดยตรง",
          `สาขาเซ็นทรัล ภูเก็ต ฟลอเรสต้า (${fl.brandName}): ${fl.phoneDisplay}`,
          `สาขาตลาดท้ายรถนาคา (ริชชี่โกลด์หลอมทอง): ${nk.phoneDisplay}`,
        ],
      },
      {
        q: "สาขาตั้งอยู่ที่ไหน และเปิดทำการเวลาใด",
        a: [
          `สาขาเซ็นทรัล ภูเก็ต ฟลอเรสต้า (${fl.brandName}): ${fl.locationNote} เปิด${fl.hours}`,
          `สาขาตลาดท้ายรถนาคา (ริชชี่โกลด์หลอมทอง): ${nk.address} เปิด${nk.hours}`,
          "ดูแผนที่ของแต่ละสาขาได้ที่หน้าสาขาของเรา",
        ],
      },
      {
        q: "ควรนำสินค้าไปที่สาขาใด",
        a: ["เพื่อความสะดวกและความแน่ใจ กรุณาติดต่อสาขาที่ต้องการใช้บริการก่อนเดินทาง พร้อมแจ้งประเภทสินค้าที่ต้องการขาย"],
      },
    ],
  },
  {
    title: "บริการอื่น ๆ และเว็บไซต์",
    items: [
      {
        q: "มีบริการหลอมทองหรือไม่",
        a: [`มี บริการหลอมทองเปิดให้บริการเฉพาะที่สาขาตลาดท้ายรถนาคา (ริชชี่โกลด์หลอมทอง) โทร ${nk.phoneDisplay}`],
      },
      {
        q: "สั่งซื้อหรือชำระเงินผ่านเว็บไซต์ได้หรือไม่",
        a: ["ไม่ได้ เว็บไซต์นี้ใช้สำหรับชมสินค้าและข้อมูลของร้านเท่านั้น ไม่มีระบบสั่งซื้อหรือชำระเงินออนไลน์ หากสนใจสินค้าหรือบริการ กรุณาสอบถามทาง LINE หรือโทรหาสาขา"],
      },
    ],
  },
];

export const lineUrl = contact.line.url;
