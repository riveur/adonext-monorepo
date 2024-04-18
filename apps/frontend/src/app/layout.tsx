import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/common/providers";
import { cn } from "@/lib/utils";

const fontSans = FontSans({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Adonext",
  description: "Next.js + AdonisJs Starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans", fontSans.variable)}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
