"use client";

import { FormEvent, useState } from "react";
import {
  UserRound,
  Mail,
  Type,
  ChevronUp,
  MessageCircle,
} from "lucide-react";
import "./contactform.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status !== "idle") {
      setStatus("idle");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key:
            "2f92a0dd-8714-4a7a-8637-1ba1587b83e9",

          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          message: formData.message,

          subject: `New Contact Message from ${formData.name}`,

          from_name: "India Troll | Research & Analytics",

          // Honeypot spam protection
          botcheck: "",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");

        setFormData({
          name: "",
          email: "",
          mobile: "",
          message: "",
        });
      } else {
        console.error("Web3Forms Error:", result);

        setStatus("error");
      }
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="contact-form-section" id="contact">

      {/* ============================================================
          SECTION HEADING
          ============================================================ */}

      <div className="contact-form-heading">

        <p className="contact-form-eyebrow">
          Have a requirement related to surveys, research, or consulting?
        </p>

        <h2 className="contact-form-title">
          Our team will connect with you.
        </h2>

        <div className="contact-form-heading-line" />

      </div>


      {/* ============================================================
          CONTACT FORM
          ============================================================ */}

      <div className="contact-form-card">

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          {/* ========================================================
              LEFT COLUMN
              ======================================================== */}

          <div className="contact-form-left">

            {/* NAME */}

            <div className="contact-form-field">

              <label
                htmlFor="contact-name"
                className="contact-form-label"
              >
                <UserRound className="contact-form-icon" />

                <span>Your Name</span>
              </label>

              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name here"
                className="contact-form-input"
                autoComplete="name"
                required
              />

            </div>


            {/* EMAIL */}

            <div className="contact-form-field">

              <label
                htmlFor="contact-email"
                className="contact-form-label"
              >
                <Mail className="contact-form-icon" />

                <span>Email Address</span>
              </label>

              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="contact-form-input"
                autoComplete="email"
                required
              />

            </div>


            {/* MOBILE NUMBER */}

            <div className="contact-form-field">

              <label
                htmlFor="contact-mobile"
                className="contact-form-label"
              >
                <UserRound className="contact-form-icon" />

                <span>Mobile Number</span>
              </label>

              <input
                id="contact-mobile"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="contact-form-input"
                autoComplete="tel"
                required
              />

            </div>

          </div>


          {/* ========================================================
              RIGHT COLUMN
              ======================================================== */}

          <div className="contact-form-right">

            {/* MESSAGE */}

            <div className="contact-form-field contact-form-message-field">

              <label
                htmlFor="contact-message"
                className="contact-form-label"
              >
                <Type className="contact-form-icon" />

                <span>Message</span>
              </label>

              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message goes here"
                className="contact-form-textarea"
                required
              />

            </div>


            {/* ======================================================
                WEB3FORMS SUBMIT BUTTON
                ====================================================== */}

            <button
              type="submit"
              className="contact-form-submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Sending..."
                : "Send Your Message"}
            </button>


            {/* ======================================================
                SUCCESS / ERROR MESSAGE
                ====================================================== */}

            {status === "success" && (
              <p
                className="contact-form-success"
                role="status"
              >
                Your message has been sent successfully.
              </p>
            )}

            {status === "error" && (
              <p
                className="contact-form-error"
                role="alert"
              >
                Something went wrong. Please try again.
              </p>
            )}

          </div>

        </form>

      </div>


      {/* ============================================================
          WHATSAPP FLOATING BUTTON
          ============================================================ */}

      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-whatsapp"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="contact-whatsapp-icon" />
      </a>


      {/* ============================================================
          SCROLL TO TOP BUTTON
          ============================================================ */}

      <button
        type="button"
        onClick={handleScrollTop}
        className="contact-scroll-top"
        aria-label="Scroll to top"
      >
        <ChevronUp className="contact-scroll-top-icon" />
      </button>

    </section>
  );
}