"use client";

import React, { useEffect } from "react";
import "./ProfileModal.css";

export interface ProfileData {
  id: string;
  name: string;
  shortName: string;
  role: string;
  category: string;
  image: string;

  email?: string;
  linkedin?: string;

  statement: string;

  highlights: string[];

  education?: string[];

  experience?: string[];

  expertise: string[];
}

interface ProfileModalProps {
  profile: ProfileData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({
  profile,
  isOpen,
  onClose,
}: ProfileModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !profile) {
    return null;
  }

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="profile-modal-backdrop"
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <div
        className="profile-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-name"
      >
        {/* =====================================================
            CLOSE BUTTON
            ===================================================== */}

        <button
          type="button"
          className="profile-modal-close"
          onClick={onClose}
          aria-label="Close profile"
        >
          <span />
          <span />
        </button>

        {/* =====================================================
            TOP ACCENT
            ===================================================== */}

        <div className="profile-modal-accent" />

        {/* =====================================================
            SCROLLABLE CONTENT
            ===================================================== */}

        <div className="profile-modal-scroll">
          {/* ===================================================
              IMAGE
              =================================================== */}

          <div className="profile-modal-image-column">
            <div className="profile-modal-image-wrap">
              <img
                src={profile.image}
                alt={profile.name}
                className="profile-modal-image"
              />

              <div className="profile-modal-image-gradient" />

              <div className="profile-modal-index">
                {profile.shortName}
              </div>

              <div className="profile-modal-image-label">
                <span>{profile.category}</span>
                <span>INDIATROLL</span>
              </div>
            </div>
          </div>

          {/* ===================================================
              INFORMATION
              =================================================== */}

          <div className="profile-modal-content">
            {/* HEADER */}

            <div className="profile-modal-header">
              <div className="profile-modal-category">
                <span className="profile-modal-category-line" />
                <span>{profile.category}</span>
              </div>

              <h2 id="profile-modal-name">
                {profile.name}
              </h2>

              <div className="profile-modal-role">
                {profile.role}
              </div>
            </div>

            {/* STATEMENT */}

            <section className="profile-modal-section profile-statement-section">
              <div className="profile-modal-section-label">
                <span>01</span>
                <span>STATEMENT</span>
              </div>

              <p className="profile-modal-statement">
                {profile.statement}
              </p>
            </section>

            {/* ACHIEVEMENTS */}

            {profile.highlights?.length > 0 && (
              <section className="profile-modal-section">
                <div className="profile-modal-section-label">
                  <span>02</span>
                  <span>KEY ACHIEVEMENTS</span>
                </div>

                <div className="profile-achievements">
                  {profile.highlights.map(
                    (highlight, index) => (
                      <div
                        className="profile-achievement"
                        key={`${profile.id}-achievement-${index}`}
                      >
                        <span className="profile-achievement-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="profile-achievement-text">
                          {highlight}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* EDUCATION */}

            {profile.education &&
              profile.education.length > 0 && (
                <section className="profile-modal-section">
                  <div className="profile-modal-section-label">
                    <span>03</span>
                    <span>EDUCATION</span>
                  </div>

                  <div className="profile-education">
                    {profile.education.map(
                      (education, index) => (
                        <div
                          className="profile-education-item"
                          key={`${profile.id}-education-${index}`}
                        >
                          <span className="profile-education-number">
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <span>{education}</span>
                        </div>
                      )
                    )}
                  </div>
                </section>
              )}

            {/* EXPERIENCE */}

            {profile.experience &&
              profile.experience.length > 0 && (
                <section className="profile-modal-section">
                  <div className="profile-modal-section-label">
                    <span>04</span>
                    <span>EXPERIENCE</span>
                  </div>

                  <div className="profile-experience">
                    {profile.experience.map(
                      (experience, index) => (
                        <div
                          className="profile-experience-item"
                          key={`${profile.id}-experience-${index}`}
                        >
                          <span className="profile-experience-marker">
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <span>{experience}</span>
                        </div>
                      )
                    )}
                  </div>
                </section>
              )}

            {/* EXPERTISE */}

            {profile.expertise &&
              profile.expertise.length > 0 && (
                <section className="profile-modal-section">
                  <div className="profile-modal-section-label">
                    <span>05</span>
                    <span>AREAS OF EXPERTISE</span>
                  </div>

                  <div className="profile-modal-expertise">
                    {profile.expertise.map((item) => (
                      <span
                        className="profile-expertise-tag"
                        key={`${profile.id}-${item}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              )}

            {/* CONTACT */}

            {(profile.email || profile.linkedin) && (
              <section className="profile-modal-contact">
                <div className="profile-modal-contact-label">
                  CONNECT
                </div>

                <div className="profile-modal-contact-links">
                  {profile.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      className="profile-contact-link"
                    >
                      <span className="profile-contact-icon">
                        ✉
                      </span>

                      <span>Email</span>

                      <span className="profile-contact-arrow">
                        ↗
                      </span>
                    </a>
                  )}

                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="profile-contact-link"
                    >
                      <span className="profile-linkedin-icon">
                        in
                      </span>

                      <span>LinkedIn</span>

                      <span className="profile-contact-arrow">
                        ↗
                      </span>
                    </a>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* =====================================================
            MODAL FOOTER
            ===================================================== */}

        <div className="profile-modal-footer">
          <span>INDIATROLL CONSULTANCY</span>
        </div>
      </div>
    </div>
  );
}