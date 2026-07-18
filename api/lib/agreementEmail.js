import nodemailer from "nodemailer";
import { PROVIDER } from "./agreementConstants.js";

function getSmtpConfig() {
  const host = String(process.env.SMTP_HOST || "").trim();
  const port = Number(process.env.SMTP_PORT || 587);
  const user = String(process.env.SMTP_USER || "").trim();
  const pass = String(process.env.SMTP_PASS || "").trim();
  const from = String(process.env.SMTP_FROM || PROVIDER.email).trim();

  return {
    configured: Boolean(host && user && pass),
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    from,
  };
}

function createTransport() {
  const smtp = getSmtpConfig();
  if (!smtp.configured) return null;

  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: smtp.auth,
  });
}

export async function sendAgreementLinkEmail({ agreement, signUrl }) {
  const transport = createTransport();
  if (!transport) {
    return { sent: false, reason: "smtp_not_configured" };
  }

  const smtp = getSmtpConfig();
  const to = agreement.client_email;

  if (!to) {
    return { sent: false, reason: "no_client_email" };
  }

  const subject = `הסכם שירות — ${agreement.client_business_name} | ${PROVIDER.name}`;
  const html = `
    <div dir="rtl" style="font-family: Heebo, Arial, sans-serif; line-height: 1.6;">
      <p>שלום ${agreement.client_contact_name || agreement.client_business_name},</p>
      <p>מצורף קישור לחתימה על הסכם השירות עם ${PROVIDER.name}:</p>
      <p><a href="${signUrl}">${signUrl}</a></p>
      <p>בברכה,<br/>${PROVIDER.name}</p>
    </div>
  `;

  await transport.sendMail({
    from: smtp.from,
    to,
    subject,
    html,
    text: `קישור לחתימה על הסכם: ${signUrl}`,
  });

  return { sent: true };
}

export async function sendSignedAgreementEmails({ agreement, pdfBuffer }) {
  const transport = createTransport();
  if (!transport) {
    return { sent: false, reason: "smtp_not_configured" };
  }

  const smtp = getSmtpConfig();
  const recipients = new Set(
    [agreement.signer_email || agreement.client_email, PROVIDER.adminEmail].filter(Boolean),
  );

  const signedAt = agreement.signed_at
    ? new Date(agreement.signed_at).toLocaleString("he-IL")
    : new Date().toLocaleString("he-IL");

  const subject = `הסכם חתום — ${agreement.client_business_name} | ${PROVIDER.name}`;
  const html = `
    <div dir="rtl" style="font-family: Heebo, Arial, sans-serif; line-height: 1.6;">
      <p>הסכם השירות נחתם בהצלחה.</p>
      <p><strong>עסק:</strong> ${agreement.client_business_name}</p>
      <p><strong>חותם/ת:</strong> ${agreement.signer_full_name || agreement.signature_name || ""}</p>
      <p><strong>תאריך:</strong> ${signedAt}</p>
      <p>קובץ PDF מצורף למייל זה.</p>
    </div>
  `;

  const attachment = {
    filename: `agreement-${agreement.id || "signed"}.pdf`,
    content: pdfBuffer,
    contentType: "application/pdf",
  };

  const results = [];
  for (const to of recipients) {
    await transport.sendMail({
      from: smtp.from,
      to,
      subject,
      html,
      attachments: [attachment],
    });
    results.push(to);
  }

  return { sent: true, recipients: results };
}
