import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore",
  description: "Interactive visual experiments and site exploration.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
