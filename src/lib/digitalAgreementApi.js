import {
  DEMO_STORAGE_KEY,
  getAdminKey,
  DEFAULT_PRICING,
} from "./digitalAgreementConfig";
import { getDefaultFormValues } from "./digitalAgreementText";

function readDemoStore() {
  if (typeof localStorage === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(DEMO_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeDemoStore(items) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(items));
}

function createDemoId() {
  return `demo-${crypto.randomUUID?.() || Date.now()}`;
}

function createDemoToken() {
  return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}

function demoAgreementFromInput(input, existing) {
  const now = new Date().toISOString();
  return {
    id: existing?.id || createDemoId(),
    access_token: existing?.access_token || createDemoToken(),
    status: existing?.status || "draft",
    ...getDefaultFormValues(),
    ...input,
    setup_cost: Number(input.setup_cost) || DEFAULT_PRICING.setup,
    monthly_cost: Number(input.monthly_cost) || DEFAULT_PRICING.monthly,
    created_at: existing?.created_at || now,
    updated_at: now,
    sent_at: existing?.sent_at || null,
    viewed_at: existing?.viewed_at || null,
    signed_at: existing?.signed_at || null,
    cancelled_at: existing?.cancelled_at || null,
    terms_approved: existing?.terms_approved || false,
    signature_type: existing?.signature_type || null,
    signature_image: existing?.signature_image || null,
    signature_name: existing?.signature_name || null,
    signer_full_name: existing?.signer_full_name || null,
    signer_email: existing?.signer_email || null,
    signer_phone: existing?.signer_phone || null,
    signed_ip: existing?.signed_ip || null,
    has_pdf: Boolean(existing?.pdf_base64),
  };
}

async function apiFetch(path, options = {}) {
  const adminKey = getAdminKey();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (adminKey) headers["X-Admin-Key"] = adminKey;

  const response = await fetch(path, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.message || data?.error || data?.details?.join?.(", ") || "שגיאה";
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

function useDemoFallback(error) {
  return (
    import.meta.env.DEV ||
    import.meta.env.VITE_DEMO_MODE === "true" ||
    error?.status === 503
  );
}

export async function listAgreements() {
  try {
    const data = await apiFetch("/api/digital-agreements");
    return { agreements: data.agreements, mode: "api" };
  } catch (error) {
    if (!useDemoFallback(error)) throw error;
    return { agreements: readDemoStore(), mode: "demo" };
  }
}

export async function getAgreement(id) {
  try {
    const data = await apiFetch(`/api/digital-agreements/${id}`);
    return { agreement: data.agreement, mode: "api" };
  } catch (error) {
    if (!useDemoFallback(error)) throw error;
    const found = readDemoStore().find((a) => a.id === id);
    if (!found) throw new Error("הסכם לא נמצא");
    return { agreement: found, mode: "demo" };
  }
}

export async function createAgreement(payload) {
  try {
    const data = await apiFetch("/api/digital-agreements", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return { agreement: data.agreement, mode: "api" };
  } catch (error) {
    if (!useDemoFallback(error)) throw error;
    const agreement = demoAgreementFromInput(payload);
    const store = readDemoStore();
    store.unshift(agreement);
    writeDemoStore(store);
    return { agreement, mode: "demo" };
  }
}

export async function updateAgreement(id, payload) {
  try {
    const data = await apiFetch(`/api/digital-agreements/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return { agreement: data.agreement, mode: "api" };
  } catch (error) {
    if (!useDemoFallback(error)) throw error;
    const store = readDemoStore();
    const index = store.findIndex((a) => a.id === id);
    if (index < 0) throw new Error("הסכם לא נמצא");
    if (store[index].status === "signed") throw new Error("לא ניתן לערוך הסכם שנחתם");
    store[index] = demoAgreementFromInput(payload, store[index]);
    writeDemoStore(store);
    return { agreement: store[index], mode: "demo" };
  }
}

export async function sendAgreement(id) {
  try {
    const data = await apiFetch(`/api/digital-agreements/${id}/send`, { method: "POST" });
    return data;
  } catch (error) {
    if (!useDemoFallback(error)) throw error;
    const store = readDemoStore();
    const index = store.findIndex((a) => a.id === id);
    if (index < 0) throw new Error("הסכם לא נמצא");
    store[index].status = "sent";
    store[index].sent_at = new Date().toISOString();
    writeDemoStore(store);
    const signUrl = `${window.location.origin}/sign/${store[index].access_token}`;
    return { agreement: store[index], signUrl, email: { sent: false, reason: "demo_mode" }, mode: "demo" };
  }
}

export async function cancelAgreement(id) {
  try {
    const data = await apiFetch(`/api/digital-agreements/${id}/cancel`, { method: "POST" });
    return data;
  } catch (error) {
    if (!useDemoFallback(error)) throw error;
    const store = readDemoStore();
    const index = store.findIndex((a) => a.id === id);
    if (index < 0) throw new Error("הסכם לא נמצא");
    if (store[index].status === "signed") throw new Error("לא ניתן לבטל הסכם שנחתם");
    store[index].status = "cancelled";
    store[index].cancelled_at = new Date().toISOString();
    writeDemoStore(store);
    return { agreement: store[index], mode: "demo" };
  }
}

export async function fetchPublicAgreement(token) {
  try {
    const data = await apiFetch(`/api/digital-agreements/public/${token}`);
    return { agreement: data.agreement, mode: "api" };
  } catch (error) {
    if (!useDemoFallback(error)) throw error;
    const store = readDemoStore();
    const index = store.findIndex((a) => a.access_token === token);
    if (index < 0) throw new Error("קישור לא תקין");
    if (store[index].status === "sent") {
      store[index].status = "viewed";
      store[index].viewed_at = new Date().toISOString();
      writeDemoStore(store);
    }
    return { agreement: store[index], mode: "demo" };
  }
}

export async function signAgreement(token, payload) {
  try {
    const data = await apiFetch(`/api/digital-agreements/public/${token}/sign`, {
      method: "POST",
      body: JSON.stringify({
        ...payload,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      }),
    });
    return data;
  } catch (error) {
    if (!useDemoFallback(error)) throw error;
    const store = readDemoStore();
    const index = store.findIndex((a) => a.access_token === token);
    if (index < 0) throw new Error("קישור לא תקין");
    if (store[index].status === "signed") throw new Error("ההסכם כבר נחתם");
    store[index] = {
      ...store[index],
      ...payload,
      status: "signed",
      terms_approved: true,
      signed_at: new Date().toISOString(),
      signed_ip: "demo",
      has_pdf: true,
    };
    writeDemoStore(store);
    return { agreement: store[index], email: { sent: false, reason: "demo_mode" }, mode: "demo" };
  }
}
