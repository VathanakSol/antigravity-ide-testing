import type { Metadata } from "next";
import { Space_Grotesk, Kantumruy_Pro } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@/components/layout/Footer";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const kantumruy = Kantumruy_Pro({
  variable: "--font-kantumruy",
  subsets: ["khmer"],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Developer 2050 - Future Platform For Developers",
    template: "%s | Developer 2050",
  },
  description: "Discover the future of development with Developer 2050. Learn cutting-edge technologies, access AI-powered learning paths, explore interactive tutorials, and stay ahead with the latest tech trends. Your comprehensive platform for modern software development.",
  keywords: [
    "developer platform",
    "programming tutorials",
    "coding education",
    "AI learning path",
    "software development",
    "web development",
    "technology trends",
    "coding resources",
    "developer tools",
    "tech learning",
    "programming courses",
    "code tutorials",
    "developer community",
    "tech education",
    "future technologies",
  ],
  authors: [{ name: "Developer 2050 Team" }],
  creator: "Developer 2050",
  publisher: "Developer 2050",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://v2050.vercel.app",
    siteName: "Developer 2050",
    title: "Developer 2050 - Future Platform For Developers",
    description: "Discover the future of development with Developer 2050. Learn cutting-edge technologies, access AI-powered learning paths, and stay ahead with the latest tech trends.",
    images: [
      {
        url: "https://utfs.io/a/30qinxb2cu/v2QQauFkR64MB9QkP7rteWGKzfUpAxN1wk9nsdSXIZalEy0L",
        width: 1200,
        height: 630,
        alt: "Developer 2050 - Future Platform For Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer 2050 - Future Platform For Developers",
    description: "Discover the future of development with Developer 2050. Learn cutting-edge technologies, access AI-powered learning paths, and stay ahead with the latest tech trends.",
    images: ["https://utfs.io/a/30qinxb2cu/v2QQauFkR64MB9QkP7rteWGKzfUpAxN1wk9nsdSXIZalEy0L"],
    creator: "@developer2050",
  },
  icons: {
    icon: [
      { url: "https://v2050.vercel.app/favicon.ico" },
      { url: "https://v2050.vercel.app/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "https://v2050.vercel.app/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "https://v2050.vercel.app/apple-icon.png" },
      { url: "https://v2050.vercel.app/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "https://v2050.vercel.app/site.webmanifest",
  metadataBase: new URL("https://v2050.vercel.app"),
  alternates: {
    canonical: "/",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${spaceGrotesk.className} ${kantumruy.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
