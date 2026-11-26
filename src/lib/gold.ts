/**
 * Gold price reference (Phase 7A.1).
 * Source: thai-gold-api (MIT).
 * Server-only. No price is stored, defaulted or calculated here.
 */

export const GOLD_SOURCE_URL =
  process.env.GOLD_API_URL ??
  "https://api.chnwt.dev/thai-gold-api/latest";

const TIMEOUT_MS = 6000;
const MAX_BYTES = 20000;

export interface PricePair {
  buy: string | null;
  sell: string | null;
}

export interface GoldPrices {
  updateDate: string;
  updateTime: string;
  bar: PricePair;
  ornament: PricePair;
}

export type GoldResult =
  | { ok: true; data: GoldPrices; fetchedAt: string }
  | {
      ok: false;
      error: "unavailable" | "timeout" | "malformed";
    };

const NUM =
  /^\d{1,3}(,\d{3})+(\.\d{1,2})?$|^\d+(\.\d{1,2})?$/;

export function cleanPrice(v: unknown): string | null {
  let s: string;

  if (typeof v === "number" && Number.isFinite(v)) {
    s = v.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else if (typeof v === "string") {
    s = v.trim();
  } else {
    return null;
  }

  if (!NUM.test(s)) return null;

  const n = Number(s.replace(/,/g, ""));

  return n >= 1000 && n <= 1_000_000 ? s : null;
}

const cleanText = (v: unknown): string | null =>
  typeof v === "string" &&
  v.trim().length > 0 &&
  v.trim().length <= 80
    ? v.trim()
    : null;

export function parseGold(json: unknown): GoldPrices | null {
  const r = (json as any)?.response;

  if (
    (json as any)?.status !== "success" ||
    !r ||
    typeof r !== "object"
  ) {
    return null;
  }

  const updateDate = cleanText(r.update_date);
  const updateTime = cleanText(r.update_time);

  const bar = {
    buy: cleanPrice(r.price?.gold_bar?.buy),
    sell: cleanPrice(r.price?.gold_bar?.sell),
  };

  const ornament = {
    buy: cleanPrice(r.price?.gold?.buy),
    sell: cleanPrice(r.price?.gold?.sell),
  };

  if (!updateDate || !updateTime || !bar.buy || !bar.sell) {
    return null;
  }

  return {
    updateDate,
    updateTime,
    bar,
    ornament,
  };
}

export async function fetchGold(
  fetchImpl: typeof fetch = fetch
): Promise<GoldResult> {
  const ctl = new AbortController();

  const timer = setTimeout(
    () => ctl.abort(),
    TIMEOUT_MS
  );

  try {
    const res = await fetchImpl(GOLD_SOURCE_URL, {
      signal: ctl.signal,
      headers: {
        accept: "application/json",
      },
      next: {
        revalidate: 60,
      },
    } as RequestInit);

    if (!res.ok) {
      return {
        ok: false,
        error: "unavailable",
      };
    }

    const text = await res.text();

    if (text.length > MAX_BYTES) {
      return {
        ok: false,
        error: "malformed",
      };
    }

    let json: unknown;

    try {
      json = JSON.parse(text);
    } catch {
      return {
        ok: false,
        error: "malformed",
      };
    }

    const data = parseGold(json);

    return data
      ? {
          ok: true,
          data,
          fetchedAt: new Date().toISOString(),
        }
      : {
          ok: false,
          error: "malformed",
        };
  } catch (e) {
    return {
      ok: false,
      error:
        (e as Error)?.name === "AbortError"
          ? "timeout"
          : "unavailable",
    };
  } finally {
    clearTimeout(timer);
  }
}

export const getGold = fetchGold;

