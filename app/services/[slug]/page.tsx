import React from "react";
import "./services.css";
import SiteNavbar from "../../../components/site-navbar";
import { notFound } from "next/navigation";
import SiteFooter from "../../../components/site-footer";
const serviceData = [
  {
    name: "Survey & Insights",
    image: "/assets/our-services/survey-insights.png",
    href: "/services/survey-insights",
    "How We Work":
      "We begin by defining the research objectives and designing structured questionnaires with inputs from psychologists and subject experts. Our trained field teams collect responses through face-to-face interactions and our survey application. Depending on the study, we use appropriate sampling methods, followed by rigorous validation, data processing, analysis, and interpretation.",
    "Key Work Areas": [
      "Exit polls and opinion polls",
      "Political and non-political surveys",
      "Voter and consumer behaviour studies",
      "Questionnaire design and survey planning",
      "Field data collection and monitoring",
      "Data validation and quality checks",
    ],
    Outcome:
      "Clear, reliable inputs for decision-making backed by verified ground data.",
  },

  {
    name: "Ground Intelligence",
    image: "/assets/our-services/ground-intelligence.png",
    href: "/services/ground-intelligence",
    intro:
      "Ground intelligence involves gathering real-time information from the field to understand the dynamics of political and social landscapes.",
    "How We Work":
      "Our field teams maintain regular contact with local stakeholders, voters, party workers, and community networks to capture developments as they happen. Information is systematically recorded, cross-checked, and analyzed to identify changes in sentiment, emerging issues, local concerns, and competitor activity, helping clients respond before situations become critical.",
    "Key Work Areas": [
      "Perception mapping on leaders and issues",
      "Issue tracking and early warning signals",
      "Competitor analysis and positioning",
      "Feedback from voters and party workers",
      "Impact assessment of campaigns and decisions",
      "Performance tracking of representatives",
    ],
    Outcome:
      "Early visibility of issues and clear direction for timely action.",
  },

  {
    name: "Political Strategy & Consulting",
    image: "/assets/our-services/political-strategy-consulting.png",
    href: "/services/political-strategy-consulting",
    intro:
      "Political strategy and consulting services help parties and candidates navigate the complex landscape of modern politics.",
    "How We Work":
      "We first understand the political environment, client objectives, voter priorities, organizational strengths, and competitive landscape. Our strategy teams combine field intelligence, research, and data analysis to develop practical campaign plans. We then support execution, track performance, review emerging challenges, and refine the strategy based on real-time feedback.",
    "Key Work Areas": [
      "Strategic planning and execution",
      "Campaign management and optimization",
      "Stakeholder engagement and communication",
      "Policy development and advocacy",
      "Leadership and team building",
    ],
    Outcome:
      "Enhanced strategic positioning and improved electoral performance.",
  },

  {
    name: "Communication & Image Management",
    image: "/assets/our-services/communication-image-management.png",
    href: "/services/communication-image-management",
    intro:
      "Communication and image management services help parties and candidates build and maintain a strong public presence.",
    "How We Work":
      "We begin by understanding the client's public image, communication objectives, audiences, and existing perception. Our teams develop consistent messaging across media, digital platforms, and public communication. We monitor reactions and media narratives, identify potential reputation risks, and adapt communication plans to maintain credibility and strengthen public engagement.",
    "Key Work Areas": [
      "Media relations and press management",
      "Social media strategy and execution",
      "Visual identity and branding",
      "Crisis communication and reputation management",
      "Internal communication and stakeholder engagement",
    ],
    Outcome:
      "Enhanced public perception and improved media coverage.",
  },

  {
    name: "Market Research & Business Insights",
    image: "/assets/our-services/market-research-business-insights.png",
    href: "/services/market-research-business-insights",
    intro:
      "Market research and business insights services provide data-driven intelligence to inform strategic decision-making.",
    "How We Work":
      "We start by defining the business question and identifying the information required to address it. Our researchers combine primary surveys, consumer interactions, secondary research, and market data to understand customer behaviour and competition. The findings are validated, analyzed, and translated into practical insights that support business and growth decisions.",
    "Key Work Areas": [
      "Consumer behavior analysis",
      "Market segmentation and targeting",
      "Competitive landscape assessment",
      "Product and service evaluation",
      "Financial and operational performance analysis",
    ],
    Outcome:
      "Informed strategic decisions and improved business performance.",
  },

  {
    name: "Governance & Project Monitoring (PMC)",
    image: "/assets/our-services/governance-project-monitoring.png",
    href: "/services/governance-project-monitoring",
    intro:
      "Governance and project monitoring services ensure effective oversight and performance evaluation of initiatives.",
    "How We Work":
      "We establish clear monitoring frameworks around project objectives, timelines, budgets, responsibilities, and measurable outcomes. Our teams regularly review progress through field visits, reports, stakeholder feedback, and performance data. Gaps and risks are identified early, with findings shared through structured reports and actionable recommendations to improve implementation and accountability.",
    "Key Work Areas": [
      "Project planning and execution",
      "Performance measurement and reporting",
      "Risk assessment and mitigation",
      "Compliance and regulatory adherence",
      "Stakeholder communication and engagement",
    ],
    Outcome:
      "Improved project outcomes and enhanced organizational governance.",
  },
];

export default async function Services({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = serviceData.find((item) => {
    const serviceSlug = item.href.split("/").filter(Boolean).pop();

    return serviceSlug === slug;
  });

  if (!service) {
    notFound();
  }

  return (
    <>
      <SiteNavbar />

      <main className="service-page">
        <section className="service-hero">
          <div className="service-hero-content">
            <h1>{service.name}</h1>

            {service.intro && <p>{service.intro}</p>}
          </div>

          <div className="service-hero-image">
            <img src={service.image} alt={service.name} />
          </div>
        </section>

        <section className="service-content">
          <div className="service-work">
            <h2>How We Work</h2>

            <p>{service["How We Work"]}</p>
          </div>

          <div className="service-key-areas">
            <h2>Key Work Areas</h2>

            <ul>
              {service["Key Work Areas"].map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>

          <div className="service-outcome">
            <h2>Outcome</h2>

            <p>{service.Outcome}</p>
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  );
} 


