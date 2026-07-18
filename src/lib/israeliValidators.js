const VALID_PREFIXES = ["02", "03", "04", "05", "07", "08", "09"];

export function phoneDigitsOnly(value) {
  return String(value ?? "").replace(/\D/g, "").slice(0, 10);
}

export function formatIsraeliPhoneDisplay(value) {
  const digits = phoneDigitsOnly(value);
  if (!digits) return "";

  if (digits.startsWith("05")) {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
}

function isValidIsraeliPhoneComplete(digits) {
  if (digits.length !== 10 || !digits.startsWith("0")) return false;
  return (
    /^05[0-9]{8}$/.test(digits) ||
    /^02[0-9]{7}$/.test(digits) ||
    /^03[0-9]{7}$/.test(digits) ||
    /^04[0-9]{7}$/.test(digits) ||
    /^08[0-9]{7}$/.test(digits) ||
    /^09[0-9]{7}$/.test(digits) ||
    /^07[2-9][0-9]{7}$/.test(digits)
  );
}

export function getIsraeliPhoneError(value, { required = false } = {}) {
  const digits = phoneDigitsOnly(value);

  if (!digits) {
    return required ? "יש להזין מספר טלפון" : null;
  }

  if (!digits.startsWith("0")) {
    return "מספר ישראלי מתחיל ב-0";
  }

  if (digits.length === 10) {
    return isValidIsraeliPhoneComplete(digits) ? null : "מספר טלפון לא תקין";
  }

  if (digits.length >= 2 && !VALID_PREFIXES.includes(digits.slice(0, 2))) {
    return "קידומת לא תקינה";
  }

  return digits.length < 10 ? "יש להשלים 10 ספרות" : null;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function getEmailError(value, { required = false } = {}) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) {
    return required ? "יש להזין כתובת אימייל" : null;
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return "כתובת אימייל לא תקינה";
  }
  return null;
}
