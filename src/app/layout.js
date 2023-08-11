import "./globals.css";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "TinyClicks - Simplify & Share Your Links",
  description:
    "Experience the power of simplicity with TinyClicks! Shorten, customize, and track your URLs for free. Enhance your digital marketing & improve link sharing with our user-friendly platform.",
  keywords:
    "URL shortener,Link management,Short link,Custom URL,Digital marketing tool,TinyClicks,Link tracking,Free URL shortener,Shareable links,Online marketing",
};

export default function RootLayout({ children }) {
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

      <body className={poppins.className}>{children}</body>
    </html>
  );
}
