export interface NavItem {
  label: string;
  labelEn: string;
  href: string;
  children?: { label: string; labelEn: string; href: string }[];
}

// Every link points to a page that exists. X-Ray and gold-melting details live on the Services page
// (dedicated pages and customer reviews belong to a later phase and are not linked until they exist).
export const mainNav: NavItem[] = [
  { label: "หน้าแรก", labelEn: "Home", href: "/" },
  { label: "สินค้าและเครื่องประดับ", labelEn: "Collection", href: "/products" },
  {
    label: "สินค้าและบริการ", labelEn: "Services",
    href: "/services",
    children: [
      { label: "บริการทั้งหมด", labelEn: "All services", href: "/services" },
      { label: "ตรวจสอบด้วยเครื่อง X-Ray", labelEn: "X-Ray testing", href: "/services#xray" },
      { label: "บริการหลอมทอง", labelEn: "Gold melting", href: "/services#melting" },
    ],
  },
  { label: "WE BUY รับซื้อ", labelEn: "We Buy", href: "/we-buy" },
  { label: "รู้จักเรา", labelEn: "About", href: "/about" },
  { label: "สาขาของเรา", labelEn: "Branches", href: "/locations" },
  { label: "ติดต่อเรา", labelEn: "Contact", href: "/contact" },
];
