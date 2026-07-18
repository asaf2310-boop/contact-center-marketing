import { AGREEMENT_PRICING } from "./agreementConfig";

const DEMO_STORAGE_KEY = "work_agreements_demo";

function getSupabaseConfig() {
  const url = String(import.meta.env.VITE_SUPABASE_URL || "").trim();
  const anonKey = String(import.meta.env.VITE_SUPABASE_ANON_KEY || "").trim();
  return { url, anonKey, configured: Boolean(url && anonKey) };
}

function saveDemoAgreement(record) {
  if (typeof localStorage === "undefined") return;
  const existing = JSON.parse(localStorage.getItem(DEMO_STORAGE_KEY) || "[]");
  existing.unshift(record);
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
}

export async function submitWorkAgreement(payload) {
  const body = {
    ...payload,
    setup_amount: AGREEMENT_PRICING.setup,
    maintenance_amount: AGREEMENT_PRICING.firstMonthMaintenance,
    total_amount: AGREEMENT_PRICING.total,
    signed_at: new Date().toISOString(),
  };

  try {
    const response = await fetch("/api/agreements/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data?.id) {
      return { ok: true, id: data.id, mode: data.mode || "api" };
    }

    if (response.status === 503 && data?.reason === "not_configured") {
      const supabase = getSupabaseConfig();
      if (supabase.configured) {
        return submitViaSupabaseClient(body);
      }
      saveDemoAgreement({ ...body, id: `demo-${Date.now()}`, mode: "demo" });
      return { ok: true, id: `demo-${Date.now()}`, mode: "demo" };
    }

    throw new Error(data?.error || data?.message || "שגיאה בשמירת ההסכם");
  } catch (error) {
    const supabase = getSupabaseConfig();
    if (supabase.configured) {
      try {
        return await submitViaSupabaseClient(body);
      } catch {
        // fall through
      }
    }

    if (import.meta.env.DEV || import.meta.env.VITE_DEMO_MODE === "true") {
      saveDemoAgreement({ ...body, id: `demo-${Date.now()}`, mode: "demo" });
      return { ok: true, id: `demo-${Date.now()}`, mode: "demo" };
    }

    throw error;
  }
}

async function submitViaSupabaseClient(body) {
  const { url, anonKey } = getSupabaseConfig();
  const { createClient } = await import("@supabase/supabase-js");
  const client = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await client
    .from("work_agreements")
    .insert([mapToRow(body)])
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return { ok: true, id: data.id, mode: "supabase" };
}

function mapToRow(body) {
  return {
    client_name: body.client_name,
    company_name: body.company_name || null,
    client_email: body.client_email,
    client_phone: body.client_phone,
    client_id_number: body.client_id_number || null,
    project_description: body.project_description || null,
    agreement_accepted: body.agreement_accepted,
    signature_name: body.signature_name,
    payment_confirmed: body.payment_confirmed,
    payment_method: body.payment_method || "bit",
    setup_amount: body.setup_amount,
    maintenance_amount: body.maintenance_amount,
    total_amount: body.total_amount,
    agreement_text: body.agreement_text || null,
    signed_at: body.signed_at,
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
  };
}
