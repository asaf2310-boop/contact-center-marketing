export const AGREEMENT_STATUSES = ["draft", "sent", "viewed", "signed", "cancelled"];

export const STATUS_LABELS = {
  draft: "טיוטה",
  sent: "נשלח",
  viewed: "נצפה",
  signed: "נחתם",
  cancelled: "בוטל",
};

export const DEFAULT_PRICING = {
  setup: 200,
  monthly: 50,
};

export const AGREEMENT_PROVIDER = {
  name: String(import.meta.env.VITE_AGREEMENT_PROVIDER_NAME || "AllInCenter").trim(),
  phone: String(import.meta.env.VITE_AGREEMENT_PROVIDER_PHONE_DISPLAY || "054-000-0000").trim(),
  email: String(import.meta.env.VITE_AGREEMENT_PROVIDER_EMAIL || "info@allincenter.co.il").trim(),
};

export const DEMO_STORAGE_KEY = "digital_agreements_demo";

export function formatNis(amount) {
  return `₪${Math.round(Number(amount) || 0).toLocaleString("he-IL")}`;
}

export function getAdminKey() {
  if (typeof sessionStorage === "undefined") return "";
  return sessionStorage.getItem("agreement_admin_key") || "";
}

export function setAdminKey(key) {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem("agreement_admin_key", key);
}

export function clearAdminKey() {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.removeItem("agreement_admin_key");
}
