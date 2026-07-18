import { AGREEMENT_PRICING, BIT_PAYMENT } from "./agreementConfig";

function toLocalPhone(phone) {
  const digits = String(phone).replace(/\D/g, "");
  if (digits.startsWith("972")) return `0${digits.slice(3)}`;
  if (digits.startsWith("0")) return digits;
  return digits;
}

function toInternationalPhone(phone) {
  const digits = String(phone).replace(/\D/g, "");
  if (digits.startsWith("972")) return digits;
  if (digits.startsWith("0")) return `972${digits.slice(1)}`;
  return digits;
}

export function buildBitPaymentUrl(amount = AGREEMENT_PRICING.total) {
  const value = Math.round(Number(amount) || 0);
  const configured = BIT_PAYMENT.url;

  if (configured) {
    if (/\{amount\}/i.test(configured)) {
      return configured.replace(/\{amount\}/gi, String(value));
    }
    try {
      const url = new URL(configured);
      if (!url.searchParams.has("amount")) {
        url.searchParams.set("amount", String(value));
      }
      return url.toString();
    } catch {
      return configured;
    }
  }

  const phone = toInternationalPhone(BIT_PAYMENT.phone);
  if (!phone || value <= 0) return "";
  return `https://www.bitpay.co.il/app/pay?phone=${phone}&amount=${value}`;
}

export function getBitPaymentDetails(amount = AGREEMENT_PRICING.total) {
  const value = Math.round(Number(amount) || 0);
  const url = buildBitPaymentUrl(value);
  const phoneDisplay = BIT_PAYMENT.phone
    ? toLocalPhone(BIT_PAYMENT.phone).replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3")
    : "";

  return {
    amount: value,
    amountDisplay: `₪${value.toLocaleString("he-IL")}`,
    url,
    phoneDisplay,
    qrImage: BIT_PAYMENT.qrImage,
    isConfigured: Boolean(url || phoneDisplay),
    clipboardText: url || `טלפון: ${phoneDisplay}\nסכום: ₪${value}`,
  };
}

export function tryOpenBitApp() {
  if (typeof navigator === "undefined") return "desktop";

  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) {
    window.location.href =
      "intent://#Intent;package=com.bnhp.payments.paymentsapp;scheme=bit;end";
    return "android";
  }
  if (/iPhone|iPad|iPod/i.test(ua)) {
    window.location.href = "https://apps.apple.com/il/app/bit/id1182007739";
    return "ios";
  }
  return "desktop";
}

export function openBitPayment(amount = AGREEMENT_PRICING.total) {
  const details = getBitPaymentDetails(amount);
  if (details.url) {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
    if (isMobile) {
      window.location.href = details.url;
    } else {
      window.open(details.url, "_blank", "noopener,noreferrer");
    }
    return { opened: true, ...details };
  }

  tryOpenBitApp();
  return { opened: true, fallback: true, ...details };
}

export async function copyText(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
