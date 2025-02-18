import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen min-w-screen relative`}
      >
          <div className="flex flex-col max-w-[90rem] h-full px-2 mx-auto">
            <Header />
            <div className="h-full w-full">{children}</div>
          </div>
        <Toaster />
      </body>
    </html>
  );
}
