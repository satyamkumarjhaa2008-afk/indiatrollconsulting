"use client";

import { FormEvent, useState } from "react";
import { UserRound, Mail, Type } from "lucide-react";
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

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          mobile: formData.mobile.trim(),
          message: formData.message.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          message: "",
        });
      } else {
        console.error("Contact API error:", result);
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section" id="contact">
      <div className="contact-form-heading">
        <p className="contact-form-eyebrow">
          Have a requirement related to surveys, research, or consulting?
        </p>

        <h2 className="contact-form-title">
          Our team will connect with you.
        </h2>

        <div className="contact-form-heading-line" />
      </div>

      <div className="contact-form-card">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-left">
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
                maxLength={100}
                required
              />
            </div>

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
                maxLength={254}
                required
              />
            </div>

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
                maxLength={30}
                required
              />
            </div>
          </div>

          <div className="contact-form-right">
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
                maxLength={5000}
                required
              />
            </div>

            <button
              type="submit"
              className="contact-form-submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Your Message"}
            </button>

            {status === "success" && (
              <p className="contact-form-success" role="status">
                Your message has been sent successfully.
              </p>
            )}

            {status === "error" && (
              <p className="contact-form-error" role="alert">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
