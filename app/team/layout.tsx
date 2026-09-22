import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the team behind IndiaTroll Research & Consulting and learn about the people supporting research, intelligence, strategy, and execution.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Our Team | IndiaTroll Research & Consulting",
    description:
      "Meet the team behind IndiaTroll Research & Consulting.",
    url: "/team",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
