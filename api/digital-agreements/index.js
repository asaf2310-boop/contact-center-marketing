import { getSupabaseAdmin, getSupabaseAdminConfig } from "../lib/supabaseAdmin.js";
import { requireAdmin, readJsonBody } from "../lib/agreementAuth.js";
import { sanitizeAgreementInput, adminAgreementView } from "../lib/agreementDb.js";

export default async function handler(req, res) {
  const config = getSupabaseAdminConfig();
  if (!config.configured) {
    return res.status(503).json({ error: "not_configured", missing: config.missing });
  }

  const supabase = getSupabaseAdmin();

  if (req.method === "GET") {
    if (!requireAdmin(req, res)) return;

    const { data, error } = await supabase
      .from("digital_agreements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[digital-agreements/list]", error.message);
      return res.status(500).json({ error: "db_error", message: error.message });
    }

    return res.status(200).json({ agreements: (data || []).map(adminAgreementView) });
  }

  if (req.method === "POST") {
    if (!requireAdmin(req, res)) return;

    try {
      const body = readJsonBody(req);
      const validation = sanitizeAgreementInput(body);
      if (!validation.ok) {
        return res.status(400).json({ error: "validation_failed", details: validation.errors });
      }

      const { data, error } = await supabase
        .from("digital_agreements")
        .insert([{ ...validation.row, status: "draft" }])
        .select("*")
        .single();

      if (error) {
        console.error("[digital-agreements/create]", error.message);
        return res.status(500).json({ error: "db_error", message: error.message });
      }

      return res.status(201).json({ agreement: adminAgreementView(data) });
    } catch (error) {
      console.error("[digital-agreements/create]", error);
      return res.status(500).json({ error: "server_error", message: error.message });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "method_not_allowed" });
}
