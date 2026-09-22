import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about IndiaTroll Research & Consulting, a research and strategy organisation focused on public opinion, ground realities, political research, and data-led insights across India.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | IndiaTroll Research & Consulting",
    description:
      "Learn about IndiaTroll's research, strategy, ground intelligence, and data-led approach.",
    url: "/about",
    images: ["/opengraph-image"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
