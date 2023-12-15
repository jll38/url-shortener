import "./../globals.css";
import { Inter, Poppins } from "next/font/google";
import CookiesModal from "@/components/CookiesModal";

import DashNav from "@/components/dashboard/DashNav";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard - TinyClicks",
  description: "Manage your links with ease.",
  keywords:
    "URL shortener,Link management,Short link,Custom URL,Digital marketing tool,TinyClicks,Link tracking,Free URL shortener,Shareable links,Online marketing",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <script
        async
        src="https://kit.fontawesome.com/a7908c27f8.js"
        crossorigin="anonymous"
        strategy="lazyOnload"
      ></script>

      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
        crossorigin="anonymous"
        strategy="beforeInteractive"
      ></script>

      <body className={poppins.className}>
        <div className="flex">
          <DashNav />
          {children}
        </div>
      </body>
    </html>
  );
}
