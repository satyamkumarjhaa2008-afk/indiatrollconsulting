"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/loader";

/*
 * These resources are warmed into the browser cache while the loader
 * is visible. They are intentionally NOT rendered into the UI.
 *
 * This is different from mounting the page behind the loader:
 * the page's GSAP animations do not start until the loader finishes.
 */
const ROUTE_PRELOADS: Record<string, string[]> = {
  "/": [
    "/india-troll-logo-vector.svg",

    // Hero carousel
    "/assets/hero/s1.jpeg",
    "/assets/hero/s2.jpeg",
    "/assets/hero/s3.jpeg",
    "/assets/hero/s4.jpeg",
    "/assets/hero/s5.jpeg",

    // About / visual sections
    "/assets/india-map-analytics.png",
    "/assets/win-thrones-chess.png",

    // Why Choose Us icons
    "/assets/icons/icons2/1.svg",
    "/assets/icons/icons2/2.svg",
    "/assets/icons/icons2/3.svg",
    "/assets/icons/icons2/4.svg",
    "/assets/icons/icons2/w1.svg",

    // Impact icons
    "/assets/icons/icons1/a.svg",
    "/assets/icons/icons1/b.svg",
    "/assets/icons/icons1/c.svg",
    "/assets/icons/icons1/d.svg",

    // Services carousel
    "/assets/our-services/survey-insights.png",
    "/assets/our-services/ground-intelligence.png",
    "/assets/our-services/political-strategy-consulting.png",
    "/assets/our-services/communication-image-management.png",
    "/assets/our-services/market-research-business-insights.png",
    "/assets/our-services/governance-project-monitoring.png",
  ],
};

interface LoaderContextValue {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoaderContext = createContext<LoaderContextValue | null>(null);

/*
 * Warm an asset without putting it in the DOM.
 *
 * <img> / Image() is used for raster images and SVGs because the browser
 * can decode/cache them exactly as image resources, while nothing is
 * visually rendered to the user.
 */
const preloadResource = (src: string) =>
  new Promise<void>((resolve) => {
    const image = new window.Image();

    const done = () => {
      image.onload = null;
      image.onerror = null;
      resolve();
    };

    image.onload = done;
    image.onerror = done;
    image.src = src;

    // Handles memory/disk-cache hits where the event may already be complete.
    if (image.complete) {
      done();
    }
  });

const preloadRouteResources = (pathname: string) => {
  const resources = ROUTE_PRELOADS[pathname] ?? ROUTE_PRELOADS["/"];

  /*
   * Start immediately, but deliberately do NOT await this.
   *
   * The loader timeline remains completely independent.
   * If the loader finishes first, the page can appear immediately and any
   * remaining resources simply continue downloading from the browser.
   */
  resources.forEach((src) => {
    void preloadResource(src);
  });
};

export const LoaderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [loadedPath, setLoadedPath] = useState<string | null>(null);

  /*
   * Start browser-level resource loading as soon as the provider mounts.
   * Nothing is rendered and no page animation is started by this step.
   */
  useEffect(() => {
    preloadRouteResources(pathname);
  }, [pathname]);

  /*
   * The loader remains the authority for when the page becomes visible.
   * We intentionally do NOT wait for all resources here.
   *
   * This means:
   *   loader finishes -> page mounts -> GSAP starts visibly
   *
   * If an image is still downloading, the browser continues loading it
   * normally in parallel.
   */
  useEffect(() => {
    if (!isLoading) {
      setLoadedPath(pathname);
    }
  }, [isLoading, pathname]);

  const pageReady = loadedPath === pathname && !isLoading;

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {pageReady && children}

      {isLoading && (
        <Loader key={pathname} />
      )}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoader must be used inside LoaderProvider");
  }

  return context;
};
