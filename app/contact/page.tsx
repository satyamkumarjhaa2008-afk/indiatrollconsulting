import React from "react";
import "./contact.css";
import ContactForm from "@/components/contactform";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

const Page = () => {
  return (
    <div className="contact-page">
      <SiteNavbar />

      <ContactForm />

      <section className="contact-map-section">
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
></iframe>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Page;