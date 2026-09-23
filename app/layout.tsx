import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";

import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { LoaderProvider } from "@/components/LoaderProvider";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo-json-ld";

const SITE_URL = "https://www.indiatrollconsulting.com";
const SITE_NAME = "IndiaTroll Research & Consulting";
const SITE_DESCRIPTION =
  "IndiaTroll Research & Consulting provides political research, ground intelligence, survey insights, strategic consulting, communication, market research, and project monitoring services across India.";

const montserrat = localFont({
  src: "./fonts/Montserrat-VariableFont_wght.woff2",
  variable: "--font-montserrat",
  weight: "100 900",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Political Research, Ground Intelligence & Strategy | IndiaTroll",
    template: "%s | IndiaTroll Research & Consulting",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  keywords: [
    "political research India",
    "political consulting India",
    "ground intelligence India",
    "survey research India",
    "voter sentiment research",
    "market research India",
    "strategic communication",
    "governance project monitoring",
  ],
  icons: {
    icon: "/india-troll-logo-vector.svg",
    apple: "/india-troll-logo-vector.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Political Research, Ground Intelligence & Strategy | IndiaTroll",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "IndiaTroll Research & Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Political Research, Ground Intelligence & Strategy | IndiaTroll",
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} bg-background`}>
      <body className="antialiased font-sans">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LoaderProvider>{children}</LoaderProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
