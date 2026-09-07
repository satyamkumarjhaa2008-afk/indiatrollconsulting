"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/loader";

interface LoaderContextValue {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoaderContext = createContext<LoaderContextValue | null>(null);

export const LoaderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [loadedPath, setLoadedPath] = useState<string | null>(null);

  /*
   * Every time the route changes, start the loader again.
   */
  useEffect(() => {
    setIsLoading(true);
  }, [pathname]);

  /*
   * The loader has finished.
   * Mark the current route as ready so its page can mount.
   */
  useEffect(() => {
    if (!isLoading) {
      setLoadedPath(pathname);
    }
  }, [isLoading, pathname]);

  /*
   * The page is allowed to mount ONLY after
   * the loader has completely finished.
   */
  const pageReady = loadedPath === pathname && !isLoading;

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {isLoading && <Loader key={pathname} />}

      {pageReady && children}
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