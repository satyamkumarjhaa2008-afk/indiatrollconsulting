import Link from 'next/link'
import '../legal-pages.css'

export const metadata = {
  title: 'Terms & Conditions | IndiaTroll Research & Consulting',
  description:
    'Terms and Conditions of IndiaTroll Research & Consulting.',
}

export default function TermsAndConditionsPage() {
  return (
    <main className="legal-page">

      <section className="legal-hero">
        <div className="legal-container">

          <span className="legal-eyebrow">
            INDIATROLL RESEARCH & CONSULTING
          </span>

          <h1>Terms &amp; Conditions</h1>

          <div className="legal-line" />

          <p>
            These Terms &amp; Conditions govern your access to
            and use of the IndiaTroll Research &amp; Consulting website.
          </p>

          <span className="legal-date">
            Effective Date: September 2, 2026
          </span>

        </div>
      </section>


      <section className="legal-content">
        <div className="legal-container">

          <div className="legal-card">

            <h2>1. Acceptance of Terms</h2>

            <p>
              By accessing or using this website, you acknowledge
              that you have read, understood and agreed to these
              Terms &amp; Conditions. If you do not agree with
              these terms, please discontinue use of the website.
            </p>


            <h2>2. About Our Services</h2>

            <p>
              IndiaTroll Research &amp; Consulting provides research,
              analytics, survey, ground intelligence, market
              research, strategic consulting, communication and
              project monitoring related services.
            </p>

            <p>
              Information presented on this website is intended
              primarily for general informational and business
              purposes and does not by itself constitute a binding
              service agreement unless expressly agreed separately
              in writing.
            </p>


            <h2>3. Website Content</h2>

            <p>
              We make reasonable efforts to keep the information
              presented on this website accurate and current.
              However, we do not warrant that every piece of
              information will always be complete, accurate,
              current or error-free.
            </p>


            <h2>4. Research and Analytical Information</h2>

            <p>
              Research findings, surveys, analytical observations,
              statistics, reports, opinions and other information
              published or referenced through this website may be
              based on particular methodologies, datasets,
              assumptions, samples or information available at the
              relevant time.
            </p>

            <p>
              Such information should be interpreted within its
              relevant research context and should not automatically
              be treated as a guarantee of future outcomes.
            </p>


            <h2>5. Intellectual Property</h2>

            <p>
              Unless otherwise stated, the content of this website,
              including text, graphics, logos, designs, photographs,
              software, layouts and other materials, is owned by
              or licensed to IndiaTroll Research &amp; Consulting.
            </p>

            <p>
              You may not reproduce, republish, distribute,
              modify, commercially exploit or create derivative
              works from website content without prior written
              permission, except where permitted by applicable law.
            </p>


            <h2>6. Acceptable Use</h2>

            <p>
              You agree not to use this website in a manner that:
            </p>

            <ul>
              <li>Violates applicable laws or regulations.</li>
              <li>Attempts to gain unauthorised access to systems.</li>
              <li>Interferes with the operation or security of the website.</li>
              <li>Introduces malicious software or harmful code.</li>
              <li>Misuses information obtained through the website.</li>
            </ul>


            <h2>7. Third-Party Links</h2>

            <p>
              This website may contain links to websites and
              services operated by third parties. Such links are
              provided for convenience or informational purposes.
              IndiaTroll Research &amp; Consulting does not control and
              is not responsible for third-party websites,
              content, availability or privacy practices.
            </p>


            <h2>8. Limitation of Liability</h2>

            <p>
              To the maximum extent permitted by applicable law,
              IndiaTroll Research &amp; Consulting shall not be liable
              for indirect, incidental, consequential or special
              losses arising from the use of, or inability to use,
              this website or information available through it.
            </p>


            <h2>9. No Guarantee of Availability</h2>

            <p>
              We may modify, suspend, restrict or discontinue any
              part of the website without prior notice. We do not
              guarantee that the website will always be available,
              uninterrupted or free from errors.
            </p>


            <h2>10. Privacy</h2>

            <p>
              Your use of this website is also subject to our
              Privacy Policy, which explains how information may be
              collected, used and protected.
            </p>

            <p>
              <Link href="/privacy-policy">
                Read our Privacy Policy →
              </Link>
            </p>


            <h2>11. Changes to These Terms</h2>

            <p>
              We reserve the right to update or modify these
              Terms &amp; Conditions from time to time. Updated
              terms will be published on this page together with
              the applicable effective date.
            </p>


            <h2>12. Governing Law</h2>

            <p>
              These Terms &amp; Conditions shall be interpreted
              and governed in accordance with the applicable laws
              of India, subject to the jurisdiction applicable to
              the company and the relevant matter.
            </p>


            <h2>13. Contact Us</h2>

            <p>
              For questions regarding these Terms &amp; Conditions,
              please contact us.
            </p>

            <div className="legal-contact">

              <strong>
                IndiaTroll Research &amp; Consulting;
              </strong>

              <span>
                Office No. 22, 4th Floor, Solitaire Business Hub,
                Balewadi High Street, Baner, Pune – 411045
              </span>

              <a href="mailto:info@indiatrollconsulting.com">
                info@indiatrollconsulting.com
              </a>

              <a href="tel:+918805757772">
                8805757772
              </a>

              <a href="https://www.indiatrollconsulting.com">
                www.indiatrollconsulting.com
              </a>

            </div>


            <div className="legal-back">
              <Link href="/">
                ← Back to Home
              </Link>
            </div>

          </div>

        </div>
      </section>

    </main>
  )
}