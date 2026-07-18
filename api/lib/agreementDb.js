import { getDefaultServiceFields } from "./agreementTemplate.js";
import { DEFAULT_PRICING } from "./agreementConstants.js";

export function sanitizeAgreementInput(body, { partial = false } = {}) {
  if (!body || typeof body !== "object") return { ok: false, errors: ["גוף הבקשה חסר"] };

  const defaults = getDefaultServiceFields();
  const errors = [];

  const row = {
    client_business_name: String(body.client_business_name || "").trim(),
    client_contact_name: String(body.client_contact_name || "").trim() || null,
    client_email: String(body.client_email || "").trim() || null,
    client_phone: String(body.client_phone || "").trim() || null,
    client_address: String(body.client_address || "").trim() || null,
    client_id_number: String(body.client_id_number || "").trim() || null,
    service_title: String(body.service_title || defaults.service_title).trim(),
    service_description: String(body.service_description || defaults.service_description).trim(),
    service_included: String(body.service_included || defaults.service_included).trim(),
    service_excluded: String(body.service_excluded || defaults.service_excluded).trim(),
    setup_cost: Number(body.setup_cost) || DEFAULT_PRICING.setup,
    monthly_cost: Number(body.monthly_cost) || DEFAULT_PRICING.monthly,
    payment_terms: String(body.payment_terms || defaults.payment_terms).trim(),
    delivery_timeline: String(body.delivery_timeline || defaults.delivery_timeline).trim(),
    admin_notes: String(body.admin_notes || "").trim() || null,
  };

  if (!partial && !row.client_business_name) {
    errors.push("שם העסק נדרש");
  }

  if (errors.length) return { ok: false, errors };

  return { ok: true, row };
}

export function publicAgreementView(row) {
  if (!row) return null;
  return {
    id: row.id,
    access_token: row.access_token,
    status: row.status,
    client_business_name: row.client_business_name,
    client_contact_name: row.client_contact_name,
    client_email: row.client_email,
    client_phone: row.client_phone,
    client_address: row.client_address,
    service_title: row.service_title,
    service_description: row.service_description,
    service_included: row.service_included,
    service_excluded: row.service_excluded,
    setup_cost: row.setup_cost,
    monthly_cost: row.monthly_cost,
    payment_terms: row.payment_terms,
    delivery_timeline: row.delivery_timeline,
    signed_at: row.signed_at,
    signer_full_name: row.signer_full_name,
    signature_type: row.signature_type,
    signature_name: row.signature_name,
    signature_image: row.signature_image,
    terms_approved: row.terms_approved,
    viewed_at: row.viewed_at,
    sent_at: row.sent_at,
  };
}

export function adminAgreementView(row) {
  return {
    ...publicAgreementView(row),
    client_id_number: row.client_id_number,
    signed_ip: row.signed_ip,
    signer_email: row.signer_email,
    signer_phone: row.signer_phone,
    user_agent: row.user_agent,
    admin_notes: row.admin_notes,
    cancelled_at: row.cancelled_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
    has_pdf: Boolean(row.pdf_base64),
  };
}
