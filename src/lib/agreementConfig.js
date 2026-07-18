export const AGREEMENT_PRICING = {
  setup: 200,
  firstMonthMaintenance: 50,
  get total() {
    return this.setup + this.firstMonthMaintenance;
  },
};

export const AGREEMENT_PROVIDER = {
  name: String(import.meta.env.VITE_AGREEMENT_PROVIDER_NAME || "פתרונות דיגיטל לעסק").trim(),
  phone: String(import.meta.env.VITE_AGREEMENT_PROVIDER_PHONE || "0540000000").trim(),
  phoneDisplay: String(import.meta.env.VITE_AGREEMENT_PROVIDER_PHONE_DISPLAY || "054-000-0000").trim(),
  email: String(import.meta.env.VITE_AGREEMENT_PROVIDER_EMAIL || "").trim(),
};

export const BIT_PAYMENT = {
  /** קישור ביט מלא (עדיפות ראשונה) — לדוגמה: https://www.bitpay.co.il/app/pay?phone=05...&amount=250 */
  url: String(import.meta.env.VITE_BIT_PAYMENT_URL || "").trim(),
  /** טלפון לביט — משמש לבניית קישור אם אין URL מלא */
  phone: String(import.meta.env.VITE_BIT_PHONE || AGREEMENT_PROVIDER.phone).trim(),
  qrImage: String(import.meta.env.VITE_BIT_QR_IMAGE || "/assets/bit-payment-qr.png").trim(),
};

export function formatNis(amount) {
  return `₪${Math.round(Number(amount) || 0).toLocaleString("he-IL")}`;
}
