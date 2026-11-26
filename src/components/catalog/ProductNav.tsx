import Link from "next/link";

export interface NavTarget { slug: string; title: string }

/** Back to the catalog (same category when known) and previous / next product. */
export default function ProductNav({ prev, next, backHref }: { prev?: NavTarget; next?: NavTarget; backHref: string }) {
  return (
    <nav className="pnav" aria-label="เลื่อนดูสินค้า">
      {prev ? <Link href={`/products/${prev.slug}`} className="pnav__item"><span className="label">ก่อนหน้า</span><span>{prev.title}</span></Link> : <span />}
      <Link href={backHref} className="btn btn--secondary">กลับไปหน้าสินค้า</Link>
      {next ? <Link href={`/products/${next.slug}`} className="pnav__item pnav__item--next"><span className="label">ถัดไป</span><span>{next.title}</span></Link> : <span />}
    </nav>
  );
}
