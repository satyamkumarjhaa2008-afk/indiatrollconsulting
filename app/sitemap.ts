import type { MetadataRoute } from "next";

const SITE_URL = "https://www.indiatrollconsulting.com";

const publicRoutes = [
  "/",
  "/about",
  "/team",
  "/careers",
  "/contact",
  "/life@indiatroll",
  "/online-articles",
  "/television",
  "/press-release",
  "/services/survey-insights",
  "/services/ground-intelligence",
  "/services/political-strategy-consulting",
  "/services/communication-image-management",
  "/services/market-research-business-insights",
  "/services/governance-project-monitoring",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
  }));
}
