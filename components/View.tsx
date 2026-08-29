"use client";

import React, {
  Children,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface ViewerImage {
  src: string;
  alt?: string;
}

interface ImageViewerProps {
  children?: ReactNode;

  /*
   * Optional.
   *
   * If you provide images, those images will be used by
   * the viewer.
   *
   * If you don't provide images, the component automatically
   * detects <img> elements inside the children.
   */
  images?: ViewerImage[];

  /*
   * If true, clicking any image inside the component
   * opens the viewer.
   */
  enabled?: boolean;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  children,
  images,
  enabled = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  /*
   * ---------------------------------------------------------
   * GET IMAGES
   * ---------------------------------------------------------
   *
   * If images prop is supplied, use it.
   *
   * Otherwise find every <img> inside the wrapped content.
   */
  const detectedImages = useMemo<ViewerImage[]>(() => {
    if (images && images.length > 0) {
      return images;
    }

    return [];
  }, [images]);

  /*
   * ---------------------------------------------------------
   * OPEN VIEWER
   * ---------------------------------------------------------
   */
  const openViewer = useCallback(
    (index: number) => {
      if (!enabled) return;

      setCurrentIndex(index);
      setIsOpen(true);
      setIsPlaying(false);
      setShowThumbnails(false);

      document.body.classList.add("image-viewer-open");
    },
    [enabled]
  );

  /*
   * ---------------------------------------------------------
   * CLOSE VIEWER
   * ---------------------------------------------------------
   */
  const closeViewer = useCallback(() => {
    setIsOpen(false);
    setIsPlaying(false);
    setShowThumbnails(false);

    document.body.classList.remove("image-viewer-open");

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    setIsFullscreen(false);
  }, []);

  /*
   * ---------------------------------------------------------
   * NEXT IMAGE
   * ---------------------------------------------------------
   */
  const nextImage = useCallback(() => {
    if (detectedImages.length === 0) return;

    setCurrentIndex((previous) => {
      return (previous + 1) % detectedImages.length;
    });
  }, [detectedImages.length]);

  /*
   * ---------------------------------------------------------
   * PREVIOUS IMAGE
   * ---------------------------------------------------------
   */
  const previousImage = useCallback(() => {
    if (detectedImages.length === 0) return;

    setCurrentIndex((previous) => {
      return (
        (previous - 1 + detectedImages.length) %
        detectedImages.length
      );
    });
  }, [detectedImages.length]);

  /*
   * ---------------------------------------------------------
   * KEYBOARD CONTROLS
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyboard = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          closeViewer();
          break;

        case "ArrowRight":
          nextImage();
          break;

        case "ArrowLeft":
          previousImage();
          break;

        case " ":
          event.preventDefault();
          setIsPlaying((previous) => !previous);
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [
    isOpen,
    closeViewer,
    nextImage,
    previousImage,
  ]);

  /*
   * ---------------------------------------------------------
   * BODY SCROLL LOCK
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /*
   * ---------------------------------------------------------
   * AUTO SLIDESHOW
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (!isOpen || !isPlaying || detectedImages.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      nextImage();
    }, 3500);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    isOpen,
    isPlaying,
    detectedImages.length,
    nextImage,
  ]);

  /*
   * ---------------------------------------------------------
   * FULLSCREEN
   * ---------------------------------------------------------
   */
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * SHARE
   * ---------------------------------------------------------
   */
  const shareImage = async () => {
    const currentImage = detectedImages[currentIndex];

    if (!currentImage) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: currentImage.alt || "Image",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        window.alert("Link copied to clipboard");
      }
    } catch {
      // User cancelled share.
    }
  };

  /*
   * ---------------------------------------------------------
   * TOUCH / SWIPE
   * ---------------------------------------------------------
   */
  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const deltaX = endX - touchStartX.current;
    const deltaY = endY - touchStartY.current;

    const minimumSwipeDistance = 50;

    /*
     * Only react to horizontal swipes.
     */
    if (
      Math.abs(deltaX) > minimumSwipeDistance &&
      Math.abs(deltaX) > Math.abs(deltaY)
    ) {
      if (deltaX < 0) {
        nextImage();
      } else {
        previousImage();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  /*
   * ---------------------------------------------------------
   * CLICK DETECTION
   * ---------------------------------------------------------
   *
   * This makes the component reusable.
   *
   * Any <img> inside the wrapper becomes clickable.
   */
  useEffect(() => {
    const container = containerRef.current;

    if (!container || !enabled || images) return;

    const imageElements =
      container.querySelectorAll("img");

    const discovered: ViewerImage[] = [];

    imageElements.forEach((img) => {
      const src =
        img.currentSrc ||
        img.getAttribute("src") ||
        "";

      if (!src) return;

      discovered.push({
        src,
        alt: img.getAttribute("alt") || "",
      });
    });

    if (discovered.length > 0) {
      /*
       * We cannot mutate memoized props, so attach the
       * discovered images to the DOM using a property.
       */
      (
        container as HTMLDivElement & {
          __imageViewerImages?: ViewerImage[];
        }
      ).__imageViewerImages = discovered;

      imageElements.forEach((img, index) => {
        img.style.cursor = "zoom-in";
        img.setAttribute(
          "data-image-viewer-index",
          String(index)
        );
      });
    }
  }, [children, enabled, images]);

  /*
   * ---------------------------------------------------------
   * CLICK LISTENER
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const container = containerRef.current;

    if (!container || !enabled) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const image =
        target.closest("img");

      if (!image) return;

      const indexAttribute =
        image.getAttribute(
          "data-image-viewer-index"
        );

      if (indexAttribute === null) return;

      const index = Number(indexAttribute);

      if (images && images.length > 0) {
        openViewer(index);
        return;
      }

      const stored =
        (
          container as HTMLDivElement & {
            __imageViewerImages?: ViewerImage[];
          }
        ).__imageViewerImages;

      if (!stored || stored.length === 0) return;

      /*
       * Update the local viewer image list.
       */
      detectedImages.length = 0;

      stored.forEach((item) => {
        detectedImages.push(item);
      });

      openViewer(index);
    };

    container.addEventListener(
      "click",
      handleClick
    );

    return () => {
      container.removeEventListener(
        "click",
        handleClick
      );
    };
  }, [
    enabled,
    images,
    openViewer,
    detectedImages,
  ]);

  /*
   * ---------------------------------------------------------
   * RENDERED IMAGES
   * ---------------------------------------------------------
   *
   * When images prop is supplied this is straightforward.
   *
   * For automatic detection, the viewer uses the images
   * found in the DOM.
   */
  const viewerImages =
    images && images.length > 0
      ? images
      : (
          containerRef.current as
            | (HTMLDivElement & {
                __imageViewerImages?: ViewerImage[];
              })
            | null
        )?.__imageViewerImages || [];

  const currentImage =
    viewerImages[currentIndex];

  /*
   * ---------------------------------------------------------
   * RENDER
   * ---------------------------------------------------------
   */
  return (
    <>
      <div
        ref={containerRef}
        className="image-viewer-gallery"
      >
        {children}
      </div>

      {isOpen && currentImage && (
        <div
          className="image-viewer-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* ==================================================
              TOP BAR
              ================================================== */}
          <div className="image-viewer-topbar">

            {/* COUNTER */}
            <div className="image-viewer-counter">
              <span>
                {currentIndex + 1}
              </span>

              <span className="image-viewer-counter-separator">
                /
              </span>

              <span>
                {viewerImages.length}
              </span>
            </div>

            {/* TOP ACTIONS */}
            <div className="image-viewer-actions">

              {/* PLAY */}
              <button
                type="button"
                className="image-viewer-action"
                aria-label={
                  isPlaying
                    ? "Pause slideshow"
                    : "Play slideshow"
                }
                onClick={() =>
                  setIsPlaying(
                    (previous) => !previous
                  )
                }
              >
                {isPlaying ? (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect
                      x="6"
                      y="5"
                      width="4"
                      height="14"
                      rx="1"
                    />
                    <rect
                      x="14"
                      y="5"
                      width="4"
                      height="14"
                      rx="1"
                    />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M7 4.8v14.4L19 12 7 4.8z" />
                  </svg>
                )}
              </button>

              {/* FULLSCREEN */}
              <button
                type="button"
                className="image-viewer-action"
                aria-label="Fullscreen"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </button>

              {/* THUMBNAILS */}
              <button
                type="button"
                className={`image-viewer-action ${
                  showThumbnails
                    ? "is-active"
                    : ""
                }`}
                aria-label="Show thumbnails"
                onClick={() =>
                  setShowThumbnails(
                    (previous) => !previous
                  )
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect
                    x="4"
                    y="4"
                    width="6"
                    height="6"
                    rx="1"
                  />
                  <rect
                    x="14"
                    y="4"
                    width="6"
                    height="6"
                    rx="1"
                  />
                  <rect
                    x="4"
                    y="14"
                    width="6"
                    height="6"
                    rx="1"
                  />
                  <rect
                    x="14"
                    y="14"
                    width="6"
                    height="6"
                    rx="1"
                  />
                </svg>
              </button>

              {/* SHARE */}
              <button
                type="button"
                className="image-viewer-action"
                aria-label="Share"
                onClick={shareImage}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M14 5l5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M19 10H9c-3.5 0-5 2-5 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* CLOSE */}
              <button
                type="button"
                className="image-viewer-action image-viewer-close"
                aria-label="Close viewer"
                onClick={closeViewer}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M5 5l14 14M19 5L5 19"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

            </div>
          </div>

          {/* ==================================================
              PREVIOUS
              ================================================== */}
          {viewerImages.length > 1 && (
            <button
              type="button"
              className="image-viewer-nav image-viewer-prev"
              aria-label="Previous image"
              onClick={previousImage}
            >
              <svg
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path
                  d="M20 6L10 16l10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {/* ==================================================
              IMAGE
              ================================================== */}
          <div
            className="image-viewer-stage"
            onClick={(event) => {
              if (
                event.target === event.currentTarget
              ) {
                closeViewer();
              }
            }}
          >
            <img
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.alt || ""}
              className="image-viewer-main-image"
              draggable={false}
            />
          </div>

          {/* ==================================================
              NEXT
              ================================================== */}
          {viewerImages.length > 1 && (
            <button
              type="button"
              className="image-viewer-nav image-viewer-next"
              aria-label="Next image"
              onClick={nextImage}
            >
              <svg
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path
                  d="M12 6l10 10-10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {/* ==================================================
              THUMBNAIL PANEL
              ================================================== */}
          {showThumbnails && (
            <div className="image-viewer-thumbnails-panel">
              <div className="image-viewer-thumbnails">
                {viewerImages.map(
                  (image, index) => (
                    <button
                      type="button"
                      key={`${image.src}-${index}`}
                      className={`image-viewer-thumbnail ${
                        index === currentIndex
                          ? "is-selected"
                          : ""
                      }`}
                      onClick={() =>
                        setCurrentIndex(index)
                      }
                    >
                      <img
                        src={image.src}
                        alt={
                          image.alt ||
                          `Thumbnail ${index + 1}`
                        }
                      />
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageViewer;