"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./contact.css";
import ContactForm from "@/components/contactform";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";


gsap.registerPlugin(ScrollTrigger);

const Page = () => {


const pageRef = useRef<HTMLDivElement>(null);
const formRef = useRef<HTMLElement>(null);
const mapSectionRef = useRef<HTMLElement>(null);
const mapWrapperRef = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {
// Do absolutely nothing while the global loader is active.



const ctx = gsap.context(() => {
  const form = formRef.current;
  const mapSection = mapSectionRef.current;
  const mapWrapper = mapWrapperRef.current;

  /*
   * ============================================================
   * CONTACT FORM
   * ============================================================
   *
   * fromTo() prevents the browser from first displaying the
   * element in its final state and then snapping it backwards.
   */

  if (form) {
    gsap.fromTo(
      form,
      {
        y: 70,
        opacity: 0,
        filter: "blur(10px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.15,
        ease: "power3.out",
        clearProps: "filter",
      }
    );
  }

  /*
   * ============================================================
   * MAP SECTION REVEAL
   * ============================================================
   */

  if (mapSection) {
    gsap.fromTo(
      mapSection,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapSection,
          start: "top 85%",
          once: true,
        },
      }
    );
  }

  /*
   * ============================================================
   * MAP CLIP-PATH REVEAL
   * ============================================================
   */

  if (mapWrapper && mapSection) {
    gsap.fromTo(
      mapWrapper,
      {
        clipPath: "inset(0 100% 0 0)",
        scale: 1.03,
      },
      {
        clipPath: "inset(0 0% 0 0)",
        scale: 1,
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: mapSection,
          start: "top 85%",
          once: true,
        },
      }
    );
  }

  /*
   * ============================================================
   * MAP PARALLAX
   * ============================================================
   */

  if (mapWrapper && mapSection) {
    gsap.to(mapWrapper, {
      yPercent: -4,
      ease: "none",
      scrollTrigger: {
        trigger: mapSection,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }

  /*
   * ============================================================
   * SCROLLTRIGGER REFRESH
   * ============================================================
   *
   * The iframe can change its dimensions after the page mounts.
   * Refreshing on the next frame makes ScrollTrigger calculate
   * positions correctly.
   */

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  const handleLoad = () => {
    ScrollTrigger.refresh();
  };

  window.addEventListener("load", handleLoad);

  /*
   * ============================================================
   * CLEANUP
   * ============================================================
   */

  return () => {
    window.removeEventListener("load", handleLoad);
  };
}, pageRef);

return () => {
  ctx.revert();
};


}, []);

/*

* ================================================================
* IMPORTANT
* ================================================================
*
* While the loader is active, don't render the page content.
*
* This prevents:
*
* 1. Navbar appearing before the loader finishes
* 2. Content flashing in its normal state
* 3. GSAP subsequently hiding the content
* 4. The resulting "snap → disappear → animate" effect
*
* Once isLoading becomes false, the page mounts and GSAP's
* fromTo() animations start cleanly.
  */



/*

* ================================================================
* JSX
* ================================================================
  */

return ( <div ref={pageRef} className="contact-page">


  {/* ============================================================
      NAVBAR
      Animation handled internally by SiteNavbar.
      ============================================================ */}

  <SiteNavbar />

  {/* ============================================================
      CONTACT FORM
      ============================================================ */}

  <section
    ref={formRef}
    className="contact-form-wrapper"
  >
    <ContactForm />
  </section>

  {/* ============================================================
      MAP
      ============================================================ */}

  <section
    ref={mapSectionRef}
    className="contact-map-section"
  >
    <div
      ref={mapWrapperRef}
      className="contact-map-wrapper"
    >
      <iframe
        className="contact-map"
        src="https://www.google.com/maps?q=Samastipur%2C%20Bihar%2C%20India&output=embed"
        width="100%"
        height="600"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Samastipur, Bihar, India"
      />
    </div>
  </section>

  {/* ============================================================
      FOOTER
      Animation handled internally by SiteFooter.
      ============================================================ */}

  <SiteFooter />

</div>


);
};

export default Page;
