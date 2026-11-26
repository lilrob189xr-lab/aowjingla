import type { Metadata } from "next";
import Link from "next/link";
import { photos } from "@/data/photos";
import Photo from "@/components/ui/Photo";
import { T } from "@/components/i18n/LangProvider";

export const metadata: Metadata = {
  title: "รู้จักเรา",
  description:
    "เรื่องราวของ KAI RICHY กว่า 10 ปีแห่งความไว้วางใจ จากธุรกิจครอบครัวของคุณไก่และคุณแม่ที่ภูเก็ต สู่การเติบโตและการสานต่อโดยคุณบี",
};

/*
 * Copy: owner-approved Thai text (About Us brief). Do not add dates, awards or other claims.
 * Photos: IMG_3735 (family, main), IMG_3734 (brand sign). IMG_3732 was not supplied, IMG_3733 is excluded.
 * Khun Kai = mother and founder (GREEN dress). Khun Bee = daughter (PINK dress). Never reverse.
 */
const journey = [
  { when: "ประมาณ 5 ปี", place: "ที่บ้าน ย่านดาวรุ่ง", text: "รับซื้อทองคำและทรัพย์สินมีค่าจากที่บ้าน ควบคู่กับธุรกิจร้านกล้วยไม้ของครอบครัว" },
  { when: "ประมาณ 3 ปี", place: "ไทวัสดุ (เดิมบ้านแอนด์บียอน)", text: "ขยายสู่หน้าร้านอย่างเป็นทางการ" },
  { when: "กำลังก้าวเข้าสู่ปีที่ 3", place: "Central Phuket", text: "ย้ายและขยายธุรกิจมายังศูนย์การค้า" },
  { when: "ขยายสาขาเพิ่มเติม", place: "ตลาดท้ายรถนาคา", text: "เพื่อให้เข้าถึงและดูแลลูกค้าได้มากยิ่งขึ้น" },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="section section--white ab-hero">
        <div className="container ab-hero__grid">
          <div className="ab-hero__text">
            <p className="label">About Us</p>
            <h1 className="ab-title">KAI RICHY</h1>
            <p className="ab-lede">กว่า 10 ปีแห่งความไว้วางใจ จากธุรกิจครอบครัวสู่การเติบโตในวันนี้</p>
            <p className="reading">เรื่องราวของ KAI RICHY เริ่มต้นขึ้นเมื่อกว่า 10 ปีก่อน จากธุรกิจครอบครัวของคุณไก่และคุณแม่ ในย่านดาวรุ่ง จังหวัดภูเก็ต</p>
          </div>
          <div className="ab-hero__media">
            <Photo photo={photos["ABOUT-BRAND"]} ratio="4 / 3" priority sizes="(min-width:1024px) 46vw, 100vw" focus="center 45%" />
          </div>
        </div>
      </section>

      {/* 2. Our Beginning */}
      <section className="section section--ivory">
        <div className="container ab-split">
          <div>
            <p className="label">Our Beginning</p>
            <h2 className="ab-h2">จุดเริ่มต้นของครอบครัว</h2>
            <span className="eyebrow-rule" />
          </div>
          <div className="ab-prose">
            <p>ในช่วงแรก ครอบครัวดำเนินธุรกิจร้านกล้วยไม้ควบคู่ไปกับการรับซื้อทองคำและทรัพย์สินมีค่าจากที่บ้าน จุดเริ่มต้นเล็ก ๆ ที่ค่อย ๆ เติบโตจากประสบการณ์ ความตั้งใจ และความไว้วางใจของลูกค้าที่บอกต่อกันมา</p>
          </div>
        </div>
      </section>

      {/* 3. Our Journey */}
      <section className="section section--white" id="journey">
        <div className="container">
          <div className="ab-split">
            <div>
              <p className="label">Our Journey</p>
              <h2 className="ab-h2">จากจุดเริ่มต้น สู่การเติบโต</h2>
              <span className="eyebrow-rule" />
            </div>
            <div className="ab-prose">
              <p>หลังจากดำเนินธุรกิจที่บ้านมาประมาณ 5 ปี ความต้องการของลูกค้าที่เพิ่มขึ้นทำให้ธุรกิจเริ่มขยายตัวสู่หน้าร้านอย่างเป็นทางการที่ไทวัสดุ (เดิมบ้านแอนด์บียอน) ซึ่งเป็นอีกก้าวสำคัญที่ดำเนินต่อเนื่องประมาณ 3 ปี</p>
              <p>จากนั้นจึงย้ายและขยายธุรกิจมายังศูนย์การค้า Central Phuket ซึ่งกำลังก้าวเข้าสู่ปีที่ 3 พร้อมกับการขยายสาขาเพิ่มเติมที่ตลาดท้ายรถนาคา เพื่อให้สามารถเข้าถึงและดูแลลูกค้าได้มากยิ่งขึ้น</p>
            </div>
          </div>
          <ol className="ab-tl" aria-label="เส้นทางการเติบโตของ KAI RICHY">
            {journey.map((j) => (
              <li key={j.place} className="ab-tl__item">
                <span className="ab-tl__when">{j.when}</span>
                <h3 className="ab-tl__place">{j.place}</h3>
                <p>{j.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. From Mother to Daughter */}
      <section className="section section--forest ab-family">
        <div className="container">
          <p className="label">From Mother to Daughter</p>
          <h2 className="ab-h2">ธุรกิจที่ส่งต่อจากรุ่นแม่สู่รุ่นลูก</h2>
          <span className="eyebrow-rule" />
          <Photo
            photo={photos["ABOUT-FAMILY"]}
            ratio="2048 / 1226"
            priority
            sizes="(min-width:1280px) 1180px, 96vw"
            className="ab-family__photo"
            caption="คุณไก่และคุณบี — สองรุ่นของครอบครัวที่ร่วมกันสานต่อความไว้วางใจและเติบโตเป็น KAI RICHY ในวันนี้"
          />
          <div className="ab-split ab-family__body">
            <dl className="ab-people">
              <div>
                <dt>คุณไก่</dt>
                <dd>ผู้ริเริ่มและวางรากฐานธุรกิจ</dd>
              </div>
              <div>
                <dt>คุณบี</dt>
                <dd>ลูกสาว สานต่อและต่อยอดธุรกิจให้เติบโตขึ้น</dd>
              </div>
            </dl>
            <div className="ab-prose">
              <p>KAI RICHY เป็นธุรกิจที่เติบโตจากประสบการณ์ของคนในครอบครัว โดยคุณไก่เป็นผู้ริเริ่มและวางรากฐาน ก่อนที่คุณบี ลูกสาว จะเข้ามาสานต่อและต่อยอดธุรกิจให้เติบโตขึ้น</p>
              <p>จากการรับซื้อที่บ้านในวันแรก สู่การมีหน้าร้านและขยายสาขาในวันนี้ เรายังคงยึดถือความใส่ใจ ความโปร่งใส และความจริงใจต่อลูกค้าเป็นสิ่งสำคัญ</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Commitment */}
      <section className="section section--ivory">
        <div className="container ab-split">
          <div>
            <p className="label">Our Commitment</p>
            <h2 className="ab-h2">ความไว้วางใจที่เราตั้งใจรักษา</h2>
            <span className="eyebrow-rule" />
          </div>
          <div className="ab-prose">
            <p>เราให้ความสำคัญกับกระบวนการตรวจสอบและประเมินทรัพย์สินอย่างรอบคอบ พร้อมบริการตรวจสอบโลหะมีค่าด้วยเครื่อง X-Ray เพื่อเพิ่มความมั่นใจให้กับลูกค้า</p>
            <p>เพราะสำหรับเรา KAI RICHY ไม่ได้เป็นเพียงธุรกิจรับซื้อทองคำ แต่เป็นเรื่องราวของครอบครัว ประสบการณ์ และความไว้วางใจที่ส่งต่อกันมาอย่างต่อเนื่อง</p>
            <p><Link className="link-gold" href="/services#xray">ดูบริการตรวจสอบด้วยเครื่อง X-Ray</Link></p>
          </div>
        </div>
      </section>

      {/* 6. Closing statement */}
      <section className="section section--white ab-close">
        <div className="container ab-close__inner">
          <p className="label">KAI RICHY</p>
          <p className="ab-close__line">ความไว้วางใจที่เติบโตจากรุ่นสู่รุ่น</p>
          <div className="inquiry inquiry--center">
            <Link className="btn btn--primary" href="/locations"><T th="สาขาของเรา" en="Our Branches" /></Link>
            <Link className="btn btn--secondary" href="/contact"><T th="ติดต่อเรา" en="Contact" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
