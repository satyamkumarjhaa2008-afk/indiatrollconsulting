"use client";

import React, { useState } from "react";
import "./careers.css";
import { OnRoleJD, InternJD } from "@/components/data";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
type FilterType = "all" | "fulltime" | "internship";

const CareersPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const jobs =
    activeFilter === "fulltime"
      ? OnRoleJD
      : activeFilter === "internship"
        ? InternJD
        : [...OnRoleJD, ...InternJD];

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setExpandedIndex(null);
  };

  const handleToggle = (index: number) => {
    setExpandedIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <main className="careers-page">
        <SiteNavbar />
      {/* HERO */}
      <section className="careers-hero">
        <div className="careers-hero-content">
          <span className="hero-label">CAREERS</span>

          <h1>
            Build Something
            <br />
            <span>Meaningful.</span>
          </h1>

          <p>
            Join a team working at the intersection of research, data,
            strategy, technology, and real-world impact.
          </p>
        </div>
      </section>

      {/* CAREERS */}
      <section className="careers-container">

        {/* SECTION HEADING */}
        <div className="careers-heading">
          <span>OPPORTUNITIES</span>

          <h2>Find your next opportunity</h2>

          <p>
            Explore our current openings and discover a role where
            your skills can make a difference.
          </p>
        </div>

        {/* FILTER */}
        <div className="career-filters">

          <button
            type="button"
            className={activeFilter === "all" ? "active" : ""}
            onClick={() => handleFilterChange("all")}
          >
            All Opportunities
          </button>

          <button
            type="button"
            className={activeFilter === "fulltime" ? "active" : ""}
            onClick={() => handleFilterChange("fulltime")}
          >
            Full-Time Roles
          </button>

          <button
            type="button"
            className={activeFilter === "internship" ? "active" : ""}
            onClick={() => handleFilterChange("internship")}
          >
            Internships
          </button>

        </div>

        {/* COUNT */}
        <div className="job-count">
          Showing <strong>{jobs.length}</strong>{" "}
          {jobs.length === 1 ? "opportunity" : "opportunities"}
        </div>

        {/* JOB LIST */}
        <div className="job-list">

          {jobs.map((job, index) => {

            const isExpanded = expandedIndex === index;

            const experience =
              "Experience" in job
                ? job["Experience"]
                : ["Freshers are welcome to apply"];

            return (
              <article
                className={`job-card ${
                  isExpanded ? "expanded" : ""
                }`}
                key={`${job["Job Title"]}-${index}`}
              >

                {/* JOB HEADER */}
                <button
                  type="button"
                  className="job-card-header"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isExpanded}
                  aria-controls={`job-details-${index}`}
                >

                  <div className="job-title-wrapper">

                    <span className="job-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3>
                      {job["Job Title"]}
                    </h3>

                  </div>

                  {/* ICON */}
                  <span
                    className={`job-toggle ${
                      isExpanded ? "open" : ""
                    }`}
                    aria-hidden="true"
                  >
                    {isExpanded ? "×" : "+"}
                  </span>

                </button>

                {/* EXPANDING CONTENT */}
                {isExpanded && (
                  <div
                    id={`job-details-${index}`}
                    className="job-details"
                  >

                    {/* ROLE OVERVIEW */}
                    <div className="job-section">

                      <h4>
                        <span />
                        Role Overview
                      </h4>

                      <p>
                        {job["Role Overview"]}
                      </p>

                    </div>

                    {/* RESPONSIBILITIES */}
                    <div className="job-section">

                      <h4>
                        <span />
                        Key Responsibilities
                      </h4>

                      <ul>
                        {job["Key Responsibilities"].map(
                          (item, i) => (
                            <li key={i}>
                              {item}
                            </li>
                          )
                        )}
                      </ul>

                    </div>

                    {/* SKILLS */}
                    <div className="job-section">

                      <h4>
                        <span />
                        Required Skills
                      </h4>

                      <ul>
                        {job["Required Skills"].map(
                          (item, i) => (
                            <li key={i}>
                              {item}
                            </li>
                          )
                        )}
                      </ul>

                    </div>

                    {/* EDUCATION + EXPERIENCE */}
                    <div className="job-info-grid">

                      <div className="job-section">

                        <h4>
                          <span />
                          Education
                        </h4>

                        <ul>
                          {job["Education"].map(
                            (item, i) => (
                              <li key={i}>
                                {item}
                              </li>
                            )
                          )}
                        </ul>

                      </div>

                      <div className="job-section">

                        <h4>
                          <span />
                          Experience
                        </h4>

                        <ul>
                          {experience.map(
                            (item, i) => (
                              <li key={i}>
                                {item}
                              </li>
                            )
                          )}
                        </ul>

                      </div>

                    </div>

                    {/* WORK NATURE */}
                    <div className="job-section">

                      <h4>
                        <span />
                        Work Nature
                      </h4>

                      <ul>
                        {job["Work Nature"].map(
                          (item, i) => (
                            <li key={i}>
                              {item}
                            </li>
                          )
                        )}
                      </ul>

                    </div>

                    {/* FOOTER */}
                    <div className="job-details-footer">

                      <div className="job-location-detail">
                        <span>LOCATION</span>
                        <strong>{job.Location}</strong>
                      </div>

                      <button
                        type="button"
                        className="apply-button"
                      >
                        Apply Now
                        <span>↗</span>
                      </button>

                    </div>

                  </div>
                )}

              </article>
            );
          })}

        </div>

        {/* EMPTY STATE */}
        {jobs.length === 0 && (
          <div className="no-jobs">

            <h3>
              No opportunities available
            </h3>

            <p>
              There are currently no openings in this category.
              Please check back later.
            </p>

          </div>
        )}

      </section>
   <SiteFooter />
    </main>
 
  );
};

export default CareersPage;