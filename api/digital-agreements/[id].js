import { getSupabaseAdmin, getSupabaseAdminConfig } from "../lib/supabaseAdmin.js";
import { requireAdmin, readJsonBody } from "../lib/agreementAuth.js";
import { sanitizeAgreementInput, adminAgreementView } from "../lib/agreementDb.js";
import { EDITABLE_STATUSES } from "../lib/agreementConstants.js";

export default async function handler(req, res) {
  const config = getSupabaseAdminConfig();
  if (!config.configured) {
    return res.status(503).json({ error: "not_configured", missing: config.missing });
  }

  const id = req.query.id;
  if (!id) return res.status(400).json({ error: "missing_id" });

  const supabase = getSupabaseAdmin();

  if (req.method === "GET") {
    if (!requireAdmin(req, res)) return;

    const { data, error } = await supabase
      .from("digital_agreements")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) return res.status(500).json({ error: "db_error", message: error.message });
    if (!data) return res.status(404).json({ error: "not_found" });

    return res.status(200).json({ agreement: adminAgreementView(data) });
  }

  if (req.method === "PATCH") {
    if (!requireAdmin(req, res)) return;

    try {
      const { data: existing, error: fetchError } = await supabase
        .from("digital_agreements")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (fetchError) return res.status(500).json({ error: "db_error", message: fetchError.message });
      if (!existing) return res.status(404).json({ error: "not_found" });

      if (!EDITABLE_STATUSES.has(existing.status)) {
        return res.status(409).json({
          error: "immutable",
          message: "לא ניתן לערוך הסכם שנחתם או בוטל",
        });
      }

      const body = readJsonBody(req);
      const validation = sanitizeAgreementInput(body, { partial: true });
      if (!validation.ok) {
        return res.status(400).json({ error: "validation_failed", details: validation.errors });
      }

      const { data, error } = await supabase
        .from("digital_agreements")
        .update(validation.row)
        .eq("id", id)
        .select("*")
        .single();

      if (error) return res.status(500).json({ error: "db_error", message: error.message });

      return res.status(200).json({ agreement: adminAgreementView(data) });
    } catch (error) {
      return res.status(500).json({ error: "server_error", message: error.message });
    }
  }

  res.setHeader("Allow", "GET, PATCH");
  return res.status(405).json({ error: "method_not_allowed" });
}
