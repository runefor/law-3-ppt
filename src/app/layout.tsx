import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Law-3 AI 법률 플랫폼",
  description:
    "일반인에게는 상담의 문턱을 낮추고, 변호사에게는 고객과 개업 전략을 제공하는 AI 법률 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        {process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY && (
          <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
