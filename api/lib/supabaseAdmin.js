import { createClient } from "@supabase/supabase-js";

let cachedClient = null;

export function getSupabaseAdminConfig() {
  const url = String(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").trim();
  const serviceRoleKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  const anonKey = String(
    process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "",
  ).trim();
  const key = serviceRoleKey || anonKey;

  const missing = [];
  if (!url) missing.push("SUPABASE_URL or VITE_SUPABASE_URL");
  if (!key) missing.push("SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY");

  return {
    url,
    key,
    usingServiceRole: Boolean(serviceRoleKey),
    configured: Boolean(url && key),
    missing,
  };
}

export function getSupabaseAdmin() {
  const config = getSupabaseAdminConfig();
  if (!config.configured) return null;

  if (!cachedClient) {
    cachedClient = createClient(config.url, config.key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return cachedClient;
}
