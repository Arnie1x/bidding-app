import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bidding App",
    template: "%s | Bidding App",
  },
  description: "Bidding App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen max-w-[90rem] mx-auto`}
      >
        <Header />
        {children}
      </body>
      </SessionProvider>
    </html>
  );
}
