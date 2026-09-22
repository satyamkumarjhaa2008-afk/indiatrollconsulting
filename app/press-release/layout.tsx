import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press Releases",
  description:
    "Read press releases and public updates from IndiaTroll Research & Consulting.",
  alternates: { canonical: "/press-release" },
  openGraph: {
    title: "Press Releases | IndiaTroll Research & Consulting",
    description:
      "Press releases and public updates from IndiaTroll Research & Consulting.",
    url: "/press-release",
  },
};

export default function PressReleaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
