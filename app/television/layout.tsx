import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Television",
  description:
    "Explore television and video content featuring IndiaTroll Research & Consulting's research, insights, and perspectives.",
  alternates: { canonical: "/television" },
  openGraph: {
    title: "Television | IndiaTroll Research & Consulting",
    description:
      "Television and video content from IndiaTroll Research & Consulting.",
    url: "/television",
  },
};

export default function TelevisionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
