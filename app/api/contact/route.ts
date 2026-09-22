import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const BRAND_NAME = "IndiaTroll Consulting";
const BRAND_TAGLINE = "Research, Intelligence & Strategic Consulting";
const SITE_URL = "https://www.indiatrollconsulting.com";
const LOGO_URL = `${SITE_URL}/india-troll-logo-vector.svg`;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cleanSingleLine(value: string) {
  return value.replace(/[\r\n]/g, " ").trim();
}

function buildEmailHtml({
  name,
  email,
  mobile,
  message,
}: {
  name: string;
  email: string;
  mobile: string;
  message: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMobile = escapeHtml(mobile);
  const safeMessage = escapeHtml(message);
  const replyHref = `mailto:${encodeURIComponent(email)}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Inquiry</title>
</head>

<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#202124;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="width:100%;background:#f3f4f6;margin:0;padding:28px 12px;">
    <tr>
      <td align="center">

        <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0"
          style="width:100%;max-width:620px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e7e7e7;">

          <!-- Brand header -->
          <tr>
            <td style="background:#4f1f17;padding:24px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <img
                      src="${LOGO_URL}"
                      alt="${BRAND_NAME}"
                      width="150"
                      style="display:block;width:150px;height:auto;max-width:100%;border:0;outline:none;text-decoration:none;"
                    />
                  </td>
                  <td align="right" valign="middle"
                    style="font-size:11px;line-height:16px;color:#f5e9e5;text-transform:uppercase;letter-spacing:1.2px;">
                    Website Inquiry
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding:30px 28px 26px;">
              <div style="font-size:12px;line-height:18px;font-weight:700;color:#9a7b73;text-transform:uppercase;letter-spacing:1.3px;">
                New contact form submission
              </div>

              <h1 style="margin:7px 0 22px;font-size:25px;line-height:32px;font-weight:700;color:#241b19;">
                New inquiry from ${safeName}
              </h1>

              <!-- Contact details -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                style="border:1px solid #ece8e6;border-radius:10px;overflow:hidden;">
                <tr>
                  <td style="padding:15px 16px;border-bottom:1px solid #ece8e6;width:34%;font-size:12px;font-weight:700;color:#8a7a76;text-transform:uppercase;letter-spacing:.7px;">
                    Name
                  </td>
                  <td style="padding:15px 16px;border-bottom:1px solid #ece8e6;font-size:15px;font-weight:600;color:#25201e;">
                    ${safeName}
                  </td>
                </tr>
                <tr>
                  <td style="padding:15px 16px;border-bottom:1px solid #ece8e6;width:34%;font-size:12px;font-weight:700;color:#8a7a76;text-transform:uppercase;letter-spacing:.7px;">
                    Email
                  </td>
                  <td style="padding:15px 16px;border-bottom:1px solid #ece8e6;font-size:15px;color:#25201e;word-break:break-word;">
                    ${safeEmail}
                  </td>
                </tr>
                <tr>
                  <td style="padding:15px 16px;width:34%;font-size:12px;font-weight:700;color:#8a7a76;text-transform:uppercase;letter-spacing:.7px;">
                    Mobile
                  </td>
                  <td style="padding:15px 16px;font-size:15px;color:#25201e;">
                    ${safeMobile}
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="margin-top:24px;">
                <div style="margin-bottom:9px;font-size:12px;font-weight:700;color:#8a7a76;text-transform:uppercase;letter-spacing:.8px;">
                  Message
                </div>

                <div style="background:#faf8f7;border:1px solid #eee7e4;border-left:4px solid #4f1f17;border-radius:9px;padding:16px 17px;font-size:15px;line-height:1.65;color:#302a28;white-space:pre-wrap;word-break:break-word;">
                  ${safeMessage}
                </div>
              </div>

              <!-- Reply CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 4px;">
                <tr>
                  <td align="center" style="border-radius:7px;background:#4f1f17;">
                    <a
                      href="${replyHref}"
                      style="display:inline-block;padding:13px 22px;font-size:14px;font-weight:700;line-height:18px;color:#ffffff;text-decoration:none;border-radius:7px;"
                    >
                      Reply to Customer
                    </a>
                  </td>
                </tr>
              </table>

              <div style="margin-top:18px;font-size:12px;line-height:18px;color:#8a817e;">
                Replying to this email will address the customer directly.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#fafafa;border-top:1px solid #eeeeee;padding:19px 28px;text-align:center;">
              <div style="font-size:13px;font-weight:700;color:#4f1f17;">
                ${BRAND_NAME}
              </div>
              <div style="margin-top:4px;font-size:11px;line-height:17px;color:#8b8582;">
                ${BRAND_TAGLINE}
              </div>
              <a
                href="${SITE_URL}"
                style="display:inline-block;margin-top:5px;font-size:11px;line-height:17px;color:#4f1f17;text-decoration:none;"
              >
                www.indiatrollconsulting.com
              </a>
            </td>
          </tr>

        </table>

        <div style="max-width:620px;padding:14px 10px 0;font-size:10px;line-height:15px;color:#aaa;text-align:center;">
          This notification was generated from the IndiaTroll Consulting website contact form.
        </div>

      </td>
    </tr>
  </table>
</body>
</html>
`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = cleanSingleLine(String(body?.name ?? ""));
    const email = cleanSingleLine(String(body?.email ?? ""));
    const mobile = cleanSingleLine(String(body?.mobile ?? ""));
    const message = String(body?.message ?? "").trim();

    if (!name || !email || !mobile || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      mobile.length > 30 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { success: false, message: "One or more fields are too long." },
        { status: 400 }
      );
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailIsValid) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const contactReceiver =
      process.env.CONTACT_RECEIVER || "info@indiatrollconsulting.com";

    if (!smtpHost || !smtpUser || !smtpPassword) {
      console.error("Missing SMTP environment variables.");
      return NextResponse.json(
        { success: false, message: "Email service is not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    await transporter.sendMail({
      from: `"${BRAND_NAME}" <${smtpUser}>`,
      to: contactReceiver,
      replyTo: email,
      subject: `New Contact Inquiry — ${name}`,
      text: `New contact form inquiry

Name: ${name}
Email: ${email}
Mobile: ${mobile}

Message:
${message}

Reply to the customer: ${email}
Website: ${SITE_URL}
`,
      html: buildEmailHtml({ name, email, mobile, message }),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to send message." },
      { status: 500 }
    );
  }
}
