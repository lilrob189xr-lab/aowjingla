export type ServiceBranches = "unconfirmed" | "both" | "naka-only";

export interface Service {
  id: string;
  nameTh: string;
  nameEn: string;
  /** Branch availability is stated only where the owner confirmed it. */
  branches: ServiceBranches;
  /** Dedicated page, where one exists (Phase 6 recovery). */
  href?: string;
}

/**
 * Legacy service list (Phase 4-6). Kept intact: it still holds Silver, Nak, Amulet & Gem Frames and On-site Valuation,
 * which the owner has not authorised for deletion. The Services page now renders `serviceCategories` (below).
 */
export const services: Service[] = [
  { id: "diamond", nameTh: "รับซื้อและจำหน่ายเครื่องประดับเพชรแท้", nameEn: "Diamond Jewelry", branches: "unconfirmed" },
  { id: "gold", nameTh: "รับซื้อและจำหน่ายทองคำและเครื่องประดับทอง", nameEn: "Gold & Gold Jewelry", branches: "unconfirmed" },
  { id: "silver", nameTh: "รับซื้อและจำหน่ายเครื่องประดับเงิน", nameEn: "Silver Jewelry", branches: "unconfirmed" },
  { id: "nak", nameTh: "เครื่องประดับนาก", nameEn: "Nak Jewelry", branches: "unconfirmed" },
  { id: "frames", nameTh: "กรอบพระและกรอบอัญมณี", nameEn: "Amulet & Gem Frames", branches: "unconfirmed" },
  { id: "watches", nameTh: "นาฬิกาหรู เช่น Rolex, Patek Philippe และ Audemars Piguet", nameEn: "Luxury Watches", branches: "unconfirmed" },
  { id: "xray", nameTh: "ตรวจสอบโลหะมีค่าด้วยเครื่อง X-Ray แบบไม่ทำลายชิ้นงาน", nameEn: "X-Ray Testing", branches: "both", href: "/services/x-ray" },
  { id: "valuation", nameTh: "ประเมินมูลค่าสินค้าหน้างาน", nameEn: "On-site Valuation", branches: "unconfirmed" },
  { id: "melting", nameTh: "บริการหลอมทอง", nameEn: "Gold Melting", branches: "naka-only", href: "/services/gold-melting" },
];

export const branchTag = (s: Service): string | null =>
  s.branches === "both" ? "ทั้งสองสาขา" : s.branches === "naka-only" ? "เฉพาะสาขาตลาดท้ายรถนาคา (ริชชี่โกลด์หลอมทอง)" : null;

/* ------------------------------------------------------------------------------------------------
   Phase 7A: owner-approved Services content (four main categories), Thai + English.
   Thai is authoritative. English follows it item for item; brand names are unchanged.
   Terms marked REVIEW are technical Thai terms whose English gloss the owner should confirm.
   ------------------------------------------------------------------------------------------------ */
export interface Bi { th: string; en: string }
export interface ServiceGroup { title?: Bi; items: Bi[]; variant?: "list" | "brands" }
export interface ServiceCategory {
  id: string;
  no: "01" | "02" | "03" | "04";
  labelEn: string;          // English category name (Latin eyebrow, identical in both languages)
  title: Bi;                // Thai/English heading
  intro: Bi;
  groups: ServiceGroup[];
  callout?: { title: Bi; body: Bi };
}

export const servicesIntro: Bi = {
  th: "KAI RICHY ให้บริการรับซื้อเครื่องประดับและสินค้ามีค่าหลากหลายประเภท พร้อมบริการดูแล ซ่อมแซม และปรับแต่งเครื่องประดับ โดยให้ความสำคัญกับรายละเอียดและคุณค่าของเครื่องประดับแต่ละชิ้น",
  en: "KAI RICHY buys a wide range of jewelry and valuables, and also offers care, repair and customization of jewelry, with close attention to the detail and value of each piece.",
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "diamond-fine-jewelry", no: "01", labelEn: "Diamond & Fine Jewelry",
    title: { th: "รับซื้อเครื่องประดับเพชรและอัญมณี", en: "Buying Diamonds & Fine Jewelry" },
    intro: {
      th: "รับซื้อเครื่องประดับเพชรแท้ ทองแท้ เพชรร่วง เพชรเก่า และอัญมณีมีค่าทุกประเภท รวมถึงงานเครื่องประดับโบราณ",
      en: "We buy genuine diamond jewelry, genuine gold, loose diamonds, old diamonds and valuable gemstones of every kind, including antique jewelry.",
    },
    groups: [{ items: [
      { th: "เครื่องประดับเพชรแท้และเพชรร่วง", en: "Genuine diamond jewelry and loose diamonds" },
      { th: "เพชรเก่าและเครื่องประดับเพชรโบราณ", en: "Old diamonds and antique diamond jewelry" },
      { th: "พลอย ทับทิม มรกต บุษราคัม และไพลิน", en: "Gemstones, rubies, emeralds, yellow sapphires (Bussaracam) and blue sapphires (Pailin)" },
      { th: "เครื่องประดับแบรนด์ชั้นนำ เช่น JUBILEE, DILAVIE, ANANTA, REGENT และ PRIMA DIAMOND", en: "Jewelry from leading brands such as JUBILEE, DILAVIE, ANANTA, REGENT and PRIMA DIAMOND" },
      { th: "เครื่องประดับที่มีใบรับรอง (Certificate) และไม่มีใบรับรอง", en: "Jewelry with a certificate and without a certificate" },
      { th: "เครื่องประดับจากทุกแบรนด์และทุกแหล่งที่มา ไม่จำกัดว่าซื้อจากร้านใด", en: "Jewelry from every brand and every source, regardless of which shop it was bought from" },
    ] }],
  },
  {
    id: "gold-precious-metals", no: "02", labelEn: "Gold & Precious Metals",
    title: { th: "รับซื้อทองคำและโลหะมีค่า", en: "Buying Gold & Precious Metals" },
    intro: {
      th: "ให้บริการรับซื้อทองคำแท้และโลหะมีค่าหลากหลายประเภท ทั้งทองรูปพรรณ ทองเก่า ทองโบราณ และทองชำรุด",
      en: "We buy genuine gold and many kinds of precious metals, including gold jewelry, old gold, antique gold and damaged gold.",
    },
    groups: [
      { title: { th: "ประเภททองคำ", en: "Types of gold" }, items: [
        { th: "ทองรูปพรรณ และทองคำแท้", en: "Gold jewelry and genuine gold" },
        { th: "GOLD MASTER, PRIMA GOLD", en: "GOLD MASTER, PRIMA GOLD" },
        { th: "ทองแห่ง ทองอิตาลี และทองเค", en: "Thong Haeng gold, Italian gold and karat gold" /* REVIEW: "ทองแห่ง" */ },
        { th: "เศษทอง ทองเก่า และทองโบราณ", en: "Scrap gold, old gold and antique gold" },
        { th: "เข็มขัดทองและทองชำรุด", en: "Gold belts and damaged gold" },
        { th: "ทองคำ 9K, 14K, 18K และ 24K", en: "9K, 14K, 18K and 24K gold" },
      ] },
      { title: { th: "โลหะมีค่าอื่น ๆ", en: "Other precious metals" }, items: [
        { th: "นาคและเข็มขัดนาค", en: "Nak and Nak belts" /* REVIEW: "นาค" */ },
        { th: "เงิน (925)", en: "Silver (925)" },
        { th: "แพลทินัม (PT)", en: "Platinum (PT)" },
        { th: "พาราเดียม (PD)", en: "Palladium (PD)" },
        { th: "โรเดียม (RH)", en: "Rhodium (RH)" },
      ] },
    ],
  },
  {
    id: "luxury-watches", no: "03", labelEn: "Luxury Watches",
    title: { th: "รับซื้อนาฬิกาหรูระดับ Hi-End", en: "Buying Hi-End Luxury Watches" },
    intro: {
      th: "รับซื้อนาฬิกาหรูมือสองจากแบรนด์ชั้นนำ โดยพิจารณานาฬิกาทั้งที่มีอุปกรณ์ครบชุดและไม่มีอุปกรณ์",
      en: "We buy pre-owned luxury watches from leading brands, and consider watches both with a complete set of accessories and without.",
    },
    groups: [{ title: { th: "แบรนด์ที่รับซื้อ ได้แก่", en: "Brands we buy" }, variant: "brands", items: [
      { th: "ROLEX", en: "ROLEX" },
      { th: "PATEK PHILIPPE", en: "PATEK PHILIPPE" },
      { th: "AUDEMARS PIGUET (AP)", en: "AUDEMARS PIGUET (AP)" },
      { th: "TAG HEUER", en: "TAG HEUER" },
    ] }],
    callout: {
      title: { th: "บริการประเมินเบื้องต้นจากภาพถ่าย", en: "Preliminary appraisal from photos" },
      body: {
        th: "ลูกค้าสามารถส่งรูปนาฬิกาเพื่อประเมินราคาเบื้องต้นได้ทันที โดยไม่จำเป็นต้องแกะเครื่องหรือนัดตรวจในสถานที่อื่น",
        en: "Customers can send photos of their watch for an immediate preliminary price estimate, without needing to open the watch or arrange an inspection elsewhere.",
      },
    },
  },
  {
    id: "jewelry-care", no: "04", labelEn: "Jewelry Care",
    title: { th: "บริการซ่อมแซมและดูแลเครื่องประดับ", en: "Jewelry Repair & Care" },
    intro: {
      th: "บริการซ่อมแซม ย้ำตัวเรือน และฝังเพชรหรือพลอยหลากหลายประเภท พร้อมบริการจัดหาเพชรใหม่ตามความต้องการของลูกค้า",
      en: "Repair, mounting reinforcement (Yam Tua Ruean) and setting of diamonds or gemstones in many styles, plus sourcing of new diamonds to the customer's needs." /* REVIEW: "ย้ำตัวเรือน" */,
    },
    groups: [
      { title: { th: "บริการฝังเพชรและพลอย", en: "Diamond & gemstone setting" }, items: [
        { th: "ฝังหนามเตย", en: "Hnam Toei (pandanus-thorn) setting" },
        { th: "ฝังล้อม", en: "Surround setting" },
        { th: "ฝังจิกไข่ปลา", en: "Fish-roe prong setting" },
        { th: "ฝังหุ้ม", en: "Encased setting" },
        { th: "ฝังไร้หนาม", en: "Prong-free setting" },
      ] },
      { title: { th: "บริการเพิ่มเติม", en: "Additional services" }, items: [
        { th: "ซ่อมแซมเครื่องประดับ", en: "Jewelry repair" },
        { th: "ย้ำและปรับแต่งตัวเรือน", en: "Reinforcing and adjusting mountings" },
        { th: "ฝังเพชรและพลอย", en: "Setting diamonds and gemstones" },
        { th: "จัดหาเพชรใหม่ตามความต้องการ", en: "Sourcing new diamonds to your needs" },
        { th: "ดูแลและปรับแต่งเครื่องประดับแบบครบวงจร", en: "Complete jewelry care and customization" },
      ] },
    ],
  },
];

export const servicesContact = {
  label: "Contact Us",
  title: { th: "ติดต่อสอบถามและใช้บริการ", en: "Enquiries & Services" } as Bi,
  body: {
    th: "หากต้องการสอบถามเกี่ยวกับการรับซื้อเครื่องประดับ ทองคำ นาฬิกาหรู หรือบริการดูแลเครื่องประดับ สามารถติดต่อ KAI RICHY ผ่านช่องทางของร้าน หรือสอบถามรายละเอียดกับสาขาที่สะดวกได้",
    en: "To ask about selling jewelry, gold or luxury watches, or about our jewelry care services, contact KAI RICHY through the shop's channels, or ask the most convenient branch for details.",
  } as Bi,
};

/** Secondary "Additional services" (owner-confirmed earlier; branch facts come from branches.ts). */
export const additionalServices = [
  {
    id: "xray", href: "/services/x-ray", labelEn: "X-Ray Testing",
    title: { th: "ตรวจสอบโลหะมีค่าด้วยเครื่อง X-Ray", en: "Precious metal testing with an X-Ray machine" } as Bi,
    body: {
      th: "บริการตรวจสอบโลหะมีค่าด้วยเครื่อง X-Ray แบบไม่ทำลายชิ้นงาน เพื่อเพิ่มความมั่นใจให้กับลูกค้า",
      en: "Non-destructive precious metal testing with an X-Ray machine, for added customer confidence.",
    } as Bi,
    branch: { th: "ให้บริการทั้งสองสาขา", en: "Available at both branches" } as Bi,
  },
  {
    id: "melting", href: "/services/gold-melting", labelEn: "Gold Melting",
    title: { th: "บริการหลอมทอง", en: "Gold melting service" } as Bi,
    body: {
      th: "ร้านมีบริการหลอมทอง โดยให้บริการเฉพาะที่สาขา RICHY GOLD (ริชชี่โกลด์หลอมทอง สาขาตลาดท้ายรถนาคา) เท่านั้น",
      en: "Gold melting is offered only at the RICHY GOLD branch (Naka market branch).",
    } as Bi,
    branch: { th: "เฉพาะสาขาตลาดท้ายรถนาคา (ริชชี่โกลด์หลอมทอง)", en: "Naka branch only (RICHY GOLD)" } as Bi,
  },
] as const;
