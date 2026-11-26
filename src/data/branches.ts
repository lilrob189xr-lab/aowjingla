export type BranchId = "kai-richy-floresta" | "richy-gold-naka";

export interface Branch {
  id: BranchId;
  number: "01" | "02";
  brandName: string;
  nameTh: string;
  nameEn?: string;
  locationNote?: string;
  address: string;
  phoneDisplay: string;
  phoneHref: string;
  hours: string;
  /** English hours line and numeric hours (minutes after midnight, Phuket time) for the open/closed status. Must match `hours`. */
  hoursEn: string;
  openMin: number;
  closeMin: number;
  mapsUrl: string;
  services: { xray: boolean; goldMelting: boolean };
}

export const branches: Branch[] = [
  {
    id: "kai-richy-floresta",
    number: "01",
    brandName: "KAI RICHY",
    nameTh: "สาขาเซ็นทรัล ภูเก็ต ฟลอเรสต้า",
    locationNote: "ชั้น 3 ศูนย์การค้า Central Phuket Floresta ตรงข้าม Boots",
    address:
      "199 หมู่ 4 ถนนวิชิตสงคราม ตำบลวิชิต อำเภอเมืองภูเก็ต จังหวัดภูเก็ต ประเทศไทย",
    phoneDisplay: "093-415-9898",
    phoneHref: "tel:+66934159898",
    hours: "ทุกวัน 10:00–20:00 น.",
    hoursEn: "Open daily 10:00–20:00",
    openMin: 600,
    closeMin: 1200,
    mapsUrl: "https://maps.app.goo.gl/MbSLxKoVR9PvHVa8A?g_st=ic",
    services: { xray: true, goldMelting: false },
  },
  {
    id: "richy-gold-naka",
    number: "02",
    brandName: "RICHY GOLD",
    nameTh: "ริชชี่โกลด์หลอมทอง สาขาตลาดท้ายรถนาคา",
    nameEn: "RICHY GOLD",
    address:
      "97/148 ถนนวิรัชหงษ์หยก หมู่ 3 ตำบลวิชิต อำเภอเมืองภูเก็ต จังหวัดภูเก็ต 83120 ประเทศไทย",
    phoneDisplay: "082-974-4242",
    phoneHref: "tel:+66829744242",
    hours: "ทุกวัน 09:00–19:30 น.",
    hoursEn: "Open daily 09:00–19:30",
    openMin: 540,
    closeMin: 1170,
    mapsUrl: "https://maps.app.goo.gl/1AwRDjw8C23uceus6?g_st=ic",
    services: { xray: true, goldMelting: true },
  },
];

export const getBranch = (id: BranchId): Branch =>
  branches.find((b) => b.id === id)!;
