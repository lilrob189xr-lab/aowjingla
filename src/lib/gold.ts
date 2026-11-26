
export interface GoldPriceData {
  goldBarBuy: number;
  goldBarSell: number;
  goldOrnamentBuy: number;
  goldOrnamentSell: number;
  change: number;
  updatedAt: string;
}

// Compatibility export for components importing GoldPrices
export type GoldPrices = GoldPriceData;

export async function getGold() {
  try {
    const res = await fetch(
      "https://api.chnwt.dev/thai-gold-api/latest",
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch gold price");
    }

    const json = await res.json();
    const price = json?.response?.price;

    return {
      ok: true,
      date: json?.response?.date || "",
      updateTime: json?.response?.update_time || "",
      goldBarBuy: Number(
        String(price?.gold_bar?.buy || "0").replace(/,/g, "")
      ),
      goldBarSell: Number(
        String(price?.gold_bar?.sell || "0").replace(/,/g, "")
      ),
      goldOrnamentBuy: Number(
        String(price?.gold?.buy || "0").replace(/,/g, "")
      ),
      goldOrnamentSell: Number(
        String(price?.gold?.sell || "0").replace(/,/g, "")
      ),
      sync: {
        fetchedAt: new Date().toISOString(),
        serverTime: new Date().toISOString(),
      },
    };
  } catch {
    return {
      ok: false,
      date: "",
      updateTime: "",
      goldBarBuy: 0,
      goldBarSell: 0,
      goldOrnamentBuy: 0,
      goldOrnamentSell: 0,
      sync: {
        fetchedAt: new Date().toISOString(),
        serverTime: new Date().toISOString(),
      },
    };
  }
}
