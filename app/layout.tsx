import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans_KR } from "next/font/google";

import { Header } from "@/components/layout/header";
import { SearchProvider } from "@/components/search/search-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getSearchIndex } from "@/lib/mdx";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI 프롬프팅 가이드",
  description: "비개발자를 위한 정적 프롬프팅 문서 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchIndex = getSearchIndex();

  return (
    <html
      lang="ko"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${notoSansKr.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SearchProvider searchIndex={searchIndex}>
            <div className="min-h-screen bg-background">
              <Header />
              <div className="pt-[var(--header-height)]">{children}</div>
            </div>
            <Toaster richColors position="top-right" />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
