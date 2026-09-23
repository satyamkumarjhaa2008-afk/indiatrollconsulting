"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/loader";

interface LoaderContextValue {
  isLoading: boolean;
  assetsReady: boolean;
  finishLoader: () => void;
}

const LoaderContext = createContext<LoaderContextValue | null>(null);

const CRITICAL_IMAGES = [
  "/assets/hero/s1.jpeg",
  "/assets/hero/s2.jpeg",
  "/assets/hero/s3.jpeg",
  "/assets/hero/s4.jpeg",
  "/assets/hero/s5.jpeg",
];

const waitForImage = (src: string) =>
  new Promise<void>((resolve) => {
    const image = new Image();

    const done = () => {
      image.onload = null;
      image.onerror = null;
      resolve();
    };

    image.onload = done;
    image.onerror = done;
    image.src = src;

    if (image.complete) done();
  });

const waitForCriticalAssets = async () => {
  await Promise.all(CRITICAL_IMAGES.map(waitForImage));

  if (document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Font readiness is a progressive enhancement, never a hard blocker.
    }
  }

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
};

export const LoaderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [assetsReady, setAssetsReady] = useState(false);

  const finishLoader = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setAssetsReady(false);

    const prepare = async () => {
      try {
        await waitForCriticalAssets();
      } finally {
        if (!cancelled) {
          setAssetsReady(true);
        }
      }
    };

    void prepare();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <LoaderContext.Provider value={{ isLoading, assetsReady, finishLoader }}>
      {children}
      {isLoading && <Loader key={pathname} />}
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
