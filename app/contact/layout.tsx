import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact IndiaTroll Research & Consulting for research, ground intelligence, strategic consulting, communication, market research, and project monitoring enquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | IndiaTroll Research & Consulting",
    description:
      "Get in touch with IndiaTroll Research & Consulting.",
    url: "/contact",
    images: ["/opengraph-image"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
