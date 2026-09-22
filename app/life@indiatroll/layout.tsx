import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Life at IndiaTroll",
  description:
    "Discover life at IndiaTroll Research & Consulting, our workplace culture, people, and the environment behind our research and strategy work.",
  alternates: { canonical: "/life@indiatroll" },
  openGraph: {
    title: "Life at IndiaTroll | IndiaTroll Research & Consulting",
    description:
      "Discover the people and workplace culture at IndiaTroll.",
    url: "/life@indiatroll",
  },
};

export default function LifeAtIndiaTrollLayout({ children }: { children: React.ReactNode }) {
  return children;
}
