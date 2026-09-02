import Link from 'next/link'
import '../legal-pages.css'

export const metadata = {
  title: 'Privacy Policy | Rudra Research & Analytics',
  description:
    'Privacy Policy of Rudra Research & Analytics.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">

      <section className="legal-hero">
        <div className="legal-container">

          <span className="legal-eyebrow">
            RUDRA RESEARCH & ANALYTICS
          </span>

          <h1>Privacy Policy</h1>

          <div className="legal-line" />

          <p>
            Your privacy matters to us. This Privacy Policy
            explains how we collect, use, protect and handle
            information when you use our website and services.
          </p>

          <span className="legal-date">
            Effective Date: September 2, 2026
          </span>

        </div>
      </section>


      <section className="legal-content">
        <div className="legal-container">

          <div className="legal-card">

            <h2>1. Information Collection and Use</h2>

            <p>
              While using our website, we may ask you to provide
              certain personally identifiable information that
              can be used to contact or identify you.
            </p>

            <p>
              Personally identifiable information may include,
              but is not limited to, your name, email address,
              postal address, telephone number and information
              voluntarily submitted through forms or other
              communication channels.
            </p>

            <p>
              We may also automatically collect certain
              information when you visit our website. This may
              include your Internet Protocol (IP) address,
              browser type, browser version, pages visited,
              date and time of your visit, time spent on pages
              and other website usage statistics.
            </p>


            <h2>2. Research and Analytics Information</h2>

            <p>
              As a research and analytics organisation, we may
              collect information in connection with surveys,
              research studies, market research, opinion studies,
              ground intelligence activities and analytical
              assignments.
            </p>

            <p>
              Where research data is collected from participants,
              we seek to use such information for the purpose for
              which it was collected and in accordance with the
              applicable instructions, agreements and requirements
              governing the relevant research activity.
            </p>


            <h2>3. Log Data</h2>

            <p>
              Like many website operators, we collect information
              that your browser sends whenever you visit our
              website. This information may be used for website
              administration, security, analytics, troubleshooting
              and improving the user experience.
            </p>


            <h2>4. Cookies</h2>

            <p>
              Cookies are small files containing data that may
              include an anonymous unique identifier. Like many
              websites, we may use cookies and similar technologies
              to collect information and improve website
              functionality.
            </p>

            <p>
              You can instruct your browser to refuse all cookies
              or to indicate when a cookie is being sent. However,
              if you do not accept cookies, certain portions of
              the website may not function as intended.
            </p>


            <h2>5. How We Use Information</h2>

            <p>
              Information collected through our website may be
              used to:
            </p>

            <ul>
              <li>Respond to enquiries and requests.</li>
              <li>Provide and improve our services.</li>
              <li>Conduct research and analytical activities.</li>
              <li>Maintain website functionality and security.</li>
              <li>Understand website usage and improve user experience.</li>
              <li>Communicate with clients, applicants and website users.</li>
            </ul>


            <h2>6. Information Security</h2>

            <p>
              The security of your information is important to us.
              We seek to use commercially reasonable measures to
              protect information against unauthorised access,
              alteration, disclosure or destruction.
            </p>

            <p>
              However, no method of transmission over the Internet
              or method of electronic storage is completely secure.
              Accordingly, we cannot guarantee absolute security.
            </p>


            <h2>7. Disclosure of Information</h2>

            <p>
              We do not intend to sell personal information as a
              commodity. Information may be disclosed where
              necessary to provide requested services, comply with
              legal obligations, protect our rights, prevent fraud
              or address security concerns.
            </p>


            <h2>8. Third-Party Services and Links</h2>

            <p>
              Our website may contain links to third-party websites,
              platforms or services. We are not responsible for the
              privacy practices, security or content of third-party
              websites. We recommend reviewing the privacy policies
              of those websites before providing information.
            </p>


            <h2>9. Data Retention</h2>

            <p>
              We retain information for as long as reasonably
              necessary for the purpose for which it was collected,
              to fulfil contractual or legal obligations, resolve
              disputes and maintain appropriate business records.
            </p>


            <h2>10. Your Choices</h2>

            <p>
              You may contact us regarding personal information
              that you have voluntarily provided to us. Depending
              on the nature of the request and applicable legal
              requirements, we may assist with questions concerning
              access, correction or deletion of information.
            </p>


            <h2>11. Changes to This Privacy Policy</h2>

            <p>
              We may update this Privacy Policy from time to time.
              Any changes will be reflected on this page together
              with an updated effective date.
            </p>


            <h2>12. Contact Us</h2>

            <p>
              If you have questions regarding this Privacy Policy,
              you can contact us using the information below.
            </p>

            <div className="legal-contact">
              <strong>Rudra Research &amp; Analytics</strong>

              <span>
                Office No. 22, 4th Floor, Solitaire Business Hub,
                Balewadi High Street, Baner, Pune – 411045
              </span>

              <a href="mailto:info@rudraresearch.in">
                info@rudraresearch.in
              </a>

              <a href="tel:+912045219327">
                020-45219327
              </a>

              <a href="https://www.rudraresearch.in">
                www.rudraresearch.in
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