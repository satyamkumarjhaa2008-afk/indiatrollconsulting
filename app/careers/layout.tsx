import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore career opportunities at IndiaTroll Research & Consulting and join teams working across research, intelligence, strategy, analytics, communication, and execution.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers | IndiaTroll Research & Consulting",
    description:
      "Explore career opportunities at IndiaTroll Research & Consulting.",
    url: "/careers",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
