import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import type { Metadata, Viewport } from "next";

import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { LoaderProvider } from "@/components/LoaderProvider";

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
  title: "IndiaTroll | Political Intelligence & Strategy",

  description:
    "Political intelligence, strategy, and communication for a changing India.",

  icons: {
    icon: "/india-troll-logo-vector.svg",
    apple: "/india-troll-logo-vector.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",

  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "white",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "black",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} bg-background`}
    >
      <body className="antialiased font-sans">
        <LoaderProvider>
          {children}
        </LoaderProvider>

        {process.env.NODE_ENV === "production" && (
          <Analytics />
        )}
      </body>
    </html>
  );
}