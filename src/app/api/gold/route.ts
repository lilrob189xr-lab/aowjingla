import { NextResponse } from "next/server";
import { getGold } from "@/lib/gold";

// Server-side proxy: the browser never calls the third-party API directly and no key is needed.
// The response is self-contained: announcement time + sync.fetchedAt (when the data was really fetched) + sync.serverTime
// (when this response was built). The server keeps no "last verified" price between requests.
//
// Caching, three layers, each honest about age:
//  1. upstream fetch: cache "no-store" (provider), so the data's age is known;
//  2. per-instance micro-cache in lib/gold.ts: <= 60 s of data age, keeps the ORIGINAL fetchedAt;
//  3. CDN: s-maxage=60 + stale-while-revalidate=120 (was 300). A CDN may replay a response for up to ~3 min; the browser adds the
//     HTTP `Age` header to serverTime, so the "last synced" age it shows includes that time (see GoldPrice.tsx).
export const dynamic = "force-dynamic";

export async function GET() {
  const r = await getGold();
  if (!r.ok) return NextResponse.json(r, { status: 503, headers: { "Cache-Control": "no-store" } });
  return NextResponse.json(r, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } });
}
