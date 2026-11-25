import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, IBM_Plex_Sans_Thai, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileDock from "@/components/layout/MobileDock";
import FloatingContact from "@/components/layout/FloatingContact";
import { LangProvider } from "@/components/i18n/LangProvider";
import { siteUrl } from "@/lib/site";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-cormorant", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plexThai = IBM_Plex_Sans_Thai({ subsets: ["thai", "latin"], weight: ["300", "400", "500", "600"], variable: "--font-plex-thai", display: "swap" });
const notoThai = Noto_Sans_Thai({ subsets: ["thai"], variable: "--font-noto-thai", display: "swap" });

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: "KAI RICHY | ทองคำ เพชร และเครื่องประดับ ภูเก็ต", template: "%s | KAI RICHY" },
  description:
    "KAI RICHY เครื่องประดับ ทองคำ เพชร และบริการเกี่ยวกับโลหะมีค่า ภูเก็ต สาขาเซ็นทรัล ภูเก็ต ฟลอเรสต้า และริชชี่โกลด์หลอมทอง สาขาตลาดท้ายรถนาคา",
  openGraph: { type: "website", locale: "th_TH", siteName: "KAI RICHY" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0B241D", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${cormorant.variable} ${inter.variable} ${plexThai.variable} ${notoThai.variable}`}>
      <body>
        <LangProvider>
          <a href="#main" className="skip-link">ข้ามไปยังเนื้อหา</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileDock />
          <FloatingContact />
        </LangProvider>
      </body>
    </html>
  );
}
