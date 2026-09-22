import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Articles",
  description:
    "Read articles and research perspectives from IndiaTroll Research & Consulting on public opinion, political research, ground intelligence, and emerging trends.",
  alternates: { canonical: "/online-articles" },
  openGraph: {
    title: "Online Articles | IndiaTroll Research & Consulting",
    description:
      "Articles and research perspectives from IndiaTroll Research & Consulting.",
    url: "/online-articles",
    images: ["/opengraph-image"],
  },
};

export default function OnlineArticlesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
