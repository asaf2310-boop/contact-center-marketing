import { getSupabaseAdmin, getSupabaseAdminConfig } from "../lib/supabaseAdmin.js";

function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string" && req.body.trim()) return JSON.parse(req.body);
  return null;
}

function validatePayload(body) {
  const errors = [];
  if (!body || typeof body !== "object") {
    return { ok: false, errors: ["גוף הבקשה חסר"] };
  }

  const clientName = String(body.client_name || "").trim();
  const clientEmail = String(body.client_email || "").trim();
  const clientPhone = String(body.client_phone || "").trim();
  const signatureName = String(body.signature_name || "").trim();

  if (!clientName) errors.push("שם לקוח חסר");
  if (!clientEmail || !clientEmail.includes("@")) errors.push("אימייל לא תקין");
  if (!clientPhone || clientPhone.replace(/\D/g, "").length < 9) errors.push("טלפון לא תקין");
  if (!body.agreement_accepted) errors.push("יש לאשר את תנאי ההסכם");
  if (!body.payment_confirmed) errors.push("יש לאשר ביצוע תשלום");
  if (!signatureName) errors.push("חתימה / אישור שם חסר");
  if (signatureName && clientName && signatureName !== clientName) {
    errors.push("שם החתימה חייב להתאים לשם המלא");
  }

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    row: {
      client_name: clientName,
      company_name: String(body.company_name || "").trim() || null,
      client_email: clientEmail,
      client_phone: clientPhone,
      client_id_number: String(body.client_id_number || "").trim() || null,
      project_description: String(body.project_description || "").trim() || null,
      agreement_accepted: Boolean(body.agreement_accepted),
      signature_name: signatureName,
      payment_confirmed: Boolean(body.payment_confirmed),
      payment_method: String(body.payment_method || "bit").trim(),
      setup_amount: Number(body.setup_amount) || 200,
      maintenance_amount: Number(body.maintenance_amount) || 50,
      total_amount: Number(body.total_amount) || 250,
      agreement_text: String(body.agreement_text || "").trim() || null,
      signed_at: body.signed_at || new Date().toISOString(),
      user_agent: String(body.user_agent || "").trim() || null,
    },
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const config = getSupabaseAdminConfig();
  if (!config.configured) {
    return res.status(503).json({
      skipped: true,
      reason: "not_configured",
      missing: config.missing,
    });
  }

  try {
    const body = readJsonBody(req);
    const validation = validatePayload(body);
    if (!validation.ok) {
      return res.status(400).json({ error: "validation_failed", details: validation.errors });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("work_agreements")
      .insert([validation.row])
      .select("id")
      .single();

    if (error) {
      console.error("[agreements/submit]", error.message);
      return res.status(500).json({ error: "db_error", message: error.message });
    }

    return res.status(201).json({ id: data.id, mode: config.usingServiceRole ? "service_role" : "anon" });
  } catch (error) {
    console.error("[agreements/submit]", error);
    return res.status(500).json({ error: "server_error", message: error.message });
  }
}
