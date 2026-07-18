import PDFDocument from "pdfkit";
import { buildAgreementSections, buildPlainTextAgreement } from "./agreementTemplate.js";
import { PROVIDER } from "./agreementConstants.js";

function reverseHebrewLine(line) {
  return String(line || "")
    .split("")
    .reverse()
    .join("");
}

function drawRtlText(doc, text, x, y, options = {}) {
  const width = options.width || 500;
  const lineGap = options.lineGap ?? 4;
  const lines = String(text || "").split("\n");

  let cursorY = y;
  for (const line of lines) {
    const display = reverseHebrewLine(line.trim());
    doc.text(display, x, cursorY, { width, align: "right", lineBreak: false });
    cursorY += doc.currentLineHeight() + lineGap;
  }
  return cursorY;
}

export async function generateAgreementPdf(agreement) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50, bufferPages: true });
      const chunks = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      const pageWidth = doc.page.width - 100;
      let y = 50;

      doc.fontSize(20).text(reverseHebrewLine("AllInCenter — הסכם שירות דיגיטלי"), 50, y, {
        width: pageWidth,
        align: "right",
      });
      y += 36;

      doc.fontSize(11).fillColor("#444");
      const meta = [
        `עסק: ${agreement.client_business_name || ""}`,
        `איש קשר: ${agreement.client_contact_name || ""}`,
        `אימייל: ${agreement.client_email || ""}`,
        `טלפון: ${agreement.client_phone || ""}`,
        `נותן שירות: ${PROVIDER.name}`,
      ];
      y = drawRtlText(doc, meta.join("\n"), 50, y, { width: pageWidth });
      y += 12;

      doc.fillColor("#000");
      const sections = buildAgreementSections(agreement);
      for (const section of sections) {
        if (y > doc.page.height - 120) {
          doc.addPage();
          y = 50;
        }
        doc.fontSize(13).fillColor("#1e3a8a");
        y = drawRtlText(doc, section.title, 50, y, { width: pageWidth });
        y += 4;
        doc.fontSize(10).fillColor("#111");
        y = drawRtlText(doc, section.body, 50, y, { width: pageWidth, lineGap: 6 });
        y += 14;
      }

      if (agreement.signed_at || agreement.signature_name || agreement.signature_image) {
        if (y > doc.page.height - 180) {
          doc.addPage();
          y = 50;
        }

        doc.fontSize(13).fillColor("#1e3a8a");
        y = drawRtlText(doc, "פרטי חתימה", 50, y, { width: pageWidth });
        y += 8;

        const signedAt = agreement.signed_at
          ? new Date(agreement.signed_at).toLocaleString("he-IL")
          : new Date().toLocaleString("he-IL");

        const signatureMeta = [
          `שם: ${agreement.signer_full_name || agreement.signature_name || ""}`,
          `אימייל: ${agreement.signer_email || agreement.client_email || ""}`,
          `טלפון: ${agreement.signer_phone || agreement.client_phone || ""}`,
          `תאריך ושעה: ${signedAt}`,
          `כתובת IP: ${agreement.signed_ip || "—"}`,
        ];
        doc.fontSize(10).fillColor("#111");
        y = drawRtlText(doc, signatureMeta.join("\n"), 50, y, { width: pageWidth });
        y += 10;

        if (agreement.signature_image && agreement.signature_type === "draw") {
          try {
            const base64 = agreement.signature_image.replace(/^data:image\/\w+;base64,/, "");
            const imgBuffer = Buffer.from(base64, "base64");
            doc.image(imgBuffer, 50, y, { width: 180, height: 70 });
            y += 80;
          } catch {
            // skip invalid image
          }
        } else if (agreement.signature_name) {
          doc.fontSize(16).fillColor("#000");
          y = drawRtlText(doc, `חתימה: ${agreement.signature_name}`, 50, y, { width: pageWidth });
        }
      }

      doc.fontSize(8).fillColor("#666");
      drawRtlText(doc, buildPlainTextAgreement(agreement).slice(0, 200) + "...", 50, doc.page.height - 40, {
        width: pageWidth,
      });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
