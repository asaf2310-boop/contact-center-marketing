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

export const PROVIDER = {
  name: String(process.env.VITE_AGREEMENT_PROVIDER_NAME || "AllInCenter").trim(),
  phone: String(process.env.VITE_AGREEMENT_PROVIDER_PHONE_DISPLAY || "054-000-0000").trim(),
  email: String(process.env.VITE_AGREEMENT_PROVIDER_EMAIL || "info@allincenter.co.il").trim(),
  adminEmail: String(
    process.env.AGREEMENT_ADMIN_EMAIL || process.env.VITE_AGREEMENT_PROVIDER_EMAIL || "info@allincenter.co.il",
  ).trim(),
};

export const EDITABLE_STATUSES = new Set(["draft", "sent"]);
