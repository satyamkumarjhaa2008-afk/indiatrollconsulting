
"use client";

import React from "react";
import { motion } from "motion/react";
import "./contact.css";

import ContactForm from "@/components/contactform";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

const Page = () => {
  return (
    <motion.div
      className="contact-page"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      {/* ================= NAVBAR ================= */}
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -40,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }}
      >
        <SiteNavbar />
      </motion.div>

      {/* ================= CONTACT FORM ================= */}
      <motion.section
        variants={{
          hidden: {
            opacity: 0,
            x: -100,
            filter: "blur(8px)",
          },
          visible: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: {
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }}
      >
        <ContactForm />
      </motion.section>

      {/* ================= MAP ================= */}
      <motion.section
        className="contact-map-section"
        initial={{
          opacity: 0,
          y: 100,
          scale: 0.96,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          initial={{
            clipPath: "inset(0 100% 0 0)",
          }}
          whileInView={{
            clipPath: "inset(0 0% 0 0)",
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1.5,
            ease: [0.77, 0, 0.175, 1],
          }}
        >
          <iframe
            className="contact-map"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=Samastipur,Bihar,India`}
            width="100%"
            height="600"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Samastipur, Bihar"
          />
        </motion.div>
      </motion.section>

      {/* ================= FOOTER ================= */}
      <motion.div
        initial={{
          opacity: 0,
          y: 80,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <SiteFooter />
      </motion.div>
    </motion.div>
  );
};

export default Page;

