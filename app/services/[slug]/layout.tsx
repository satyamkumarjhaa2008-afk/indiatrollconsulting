import type { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo-json-ld";

const SITE_URL = "https://www.indiatrollconsulting.com";

const serviceMetadata: Record<string, { title: string; description: string }> = {
  "survey-insights": {
    title: "Survey & Insights",
    description:
      "Survey and insights services covering opinion polls, exit polls, voter and consumer behaviour studies, questionnaire design, field data collection, validation, and analysis.",
  },
  "ground-intelligence": {
    title: "Ground Intelligence",
    description:
      "Ground intelligence services that combine field inputs, local concerns, public sentiment, community feedback, and structured analysis to support informed decisions.",
  },
  "political-strategy-consulting": {
    title: "Political Strategy Consulting",
    description:
      "Political strategy consulting informed by constituency research, public sentiment, ground intelligence, issue tracking, and structured strategic analysis.",
  },
  "communication-image-management": {
    title: "Communication & Image Management",
    description:
      "Communication and image management services focused on public communication, perception, messaging, stakeholder engagement, and strategic positioning.",
  },
  "market-research-business-insights": {
    title: "Market Research & Business Insights",
    description:
      "Market research and business insights covering consumer behaviour, market segmentation, competitive assessment, product and service evaluation, and business performance analysis.",
  },
  "governance-project-monitoring": {
    title: "Governance & Project Monitoring",
    description:
      "Governance and project monitoring services covering implementation tracking, performance measurement, risk assessment, reporting, stakeholder engagement, and accountability.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceMetadata[slug];

  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.title} | IndiaTroll Research & Consulting`,
      description: service.description,
      url: `${SITE_URL}/services/${slug}`,
    },
  };
}

export default async function ServiceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceMetadata[slug];

  if (!service) return children;

  const url = `${SITE_URL}/services/${slug}`;

  return (
    <>
      <ServiceJsonLd name={service.title} description={service.description} url={url} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: service.title, url },
        ]}
      />
      {children}
    </>
  );
}
