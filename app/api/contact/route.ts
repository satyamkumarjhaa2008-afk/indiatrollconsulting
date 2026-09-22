import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

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

    if (name.length > 100 || email.length > 254 || mobile.length > 30 || message.length > 5000) {
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
      from: `"IndiaTroll Website" <${smtpUser}>`,
      to: contactReceiver,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `New contact form submission

Name: ${name}
Email: ${email}
Mobile: ${mobile}

Message:
${message}
`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
          <h2 style="color: #4f1f17;">New Contact Form Submission</h2>
          <hr />
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Mobile:</strong> ${escapeHtml(mobile)}</p>
          <p><strong>Message:</strong></p>
          <div style="background:#f7f7f7;padding:15px;border-radius:8px;white-space:pre-wrap;">
            ${escapeHtml(message)}
          </div>
          <hr />
          <p style="font-size:13px;color:#777;">
            Submitted through the IndiaTroll Research & Consulting website.
          </p>
        </div>
      `,
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
