import React, { useState } from "react";
import { AlertCircle, ArrowLeft, CheckCircle2, LoaderCircle } from "lucide-react";
import { trackLead } from "@/lib/fbpixel";

const initialForm = {
  fullName: "",
  businessName: "",
  role: "",
  phone: "",
  email: "",
  interest: "",
  message: "",
  website: "",
  consent: false,
};

function buildInitialForm(defaultInterest) {
  return defaultInterest ? { ...initialForm, interest: defaultInterest } : { ...initialForm };
}

function buildLeadPayload(form, source, { includeRole } = {}) {
  const payload = { ...form, ...getAttribution(source) };
  if (includeRole) {
    const parts = [];
    if (form.role) parts.push(`תפקיד: ${form.role}`);
    if (form.message) parts.push(form.message);
    payload.message = parts.join("\n\n");
  }
  delete payload.role;
  return payload;
}

function getAttribution(defaultSource) {
  const params = new URLSearchParams(window.location.search);
  const fromFacebook = params.has("fbclid");
  return {
    pageUrl: window.location.href,
    utm: {
      source: params.get("utm_source") || (fromFacebook ? "facebook" : undefined) || defaultSource || undefined,
      medium: params.get("utm_medium") || (fromFacebook ? "social" : undefined) || undefined,
      campaign: params.get("utm_campaign") || undefined,
      content: params.get("utm_content") || undefined,
    },
  };
}

export default function ContactForm({
  source,
  submitLabel,
  defaultInterest,
  compact = false,
  showRole = false,
  hideInterest = false,
  emailRequired = false,
  businessNameLabel,
  messageLabel,
  messagePlaceholder,
  successTitle,
  successBody,
  note,
} = {}) {
  const [form, setForm] = useState(() => buildInitialForm(defaultInterest));
  const [status, setStatus] = useState("idle");

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    if (status !== "idle") setStatus("idle");
  }

  async function submit(event) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildLeadPayload(form, source, { includeRole: showRole })),
      });

      if (!response.ok) throw new Error("Submission failed");
      setForm(buildInitialForm(defaultInterest));
      setStatus("success");
      // Meta Lead only after API success (PageView unchanged elsewhere).
      trackLead();
    } catch (error) {
      console.warn("Contact form submission failed — Lead event not sent", error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="contact-success" role="status">
        <span>
          <CheckCircle2 size={34} />
        </span>
        <h3>{successTitle || "הפנייה התקבלה בהצלחה"}</h3>
        <p>{successBody || "מעולה — נחזור אליכם לתיאום הדגמה קצרה, בלי התחייבות."}</p>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus("idle")}>
          שליחת פנייה נוספת
        </button>
      </div>
    );
  }

  return (
    <form className={`contact-form${compact ? " contact-form--compact" : ""}`} onSubmit={submit}>
      <div className="contact-form__grid">
        <label className={compact ? "contact-form__wide" : undefined}>
          <span>שם מלא *</span>
          <input
            name="fullName"
            value={form.fullName}
            onChange={updateField}
            minLength={2}
            maxLength={100}
            autoComplete="name"
            required
            placeholder="איך קוראים לך?"
          />
        </label>

        {!compact ? (
          <label>
            <span>{businessNameLabel || "שם העסק"}</span>
            <input
              name="businessName"
              value={form.businessName}
              onChange={updateField}
              maxLength={140}
              autoComplete="organization"
              placeholder="שם העסק או החברה"
              required={showRole}
            />
          </label>
        ) : null}

        {showRole ? (
          <label>
            <span>תפקיד *</span>
            <input
              name="role"
              value={form.role}
              onChange={updateField}
              maxLength={80}
              autoComplete="organization-title"
              required
              placeholder="מנכ״ל, סמנכ״ל תפעול, CIO..."
            />
          </label>
        ) : null}

        <label className={compact ? "contact-form__wide" : undefined}>
          <span>טלפון *</span>
          <input
            name="phone"
            value={form.phone}
            onChange={updateField}
            minLength={9}
            maxLength={20}
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="050-000-0000"
          />
        </label>

        {!compact ? (
          <label className={showRole ? "contact-form__wide" : undefined}>
            <span>{emailRequired ? "אימייל *" : "אימייל"}</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              maxLength={254}
              autoComplete="email"
              placeholder="name@business.co.il"
              required={emailRequired}
            />
          </label>
        ) : null}

        {hideInterest ? (
          <input type="hidden" name="interest" value={form.interest} />
        ) : (
          <label className="contact-form__wide">
            <span>{compact ? "סוג העסק (אופציונלי)" : "מה מעניין אותך?"}</span>
            <select name="interest" value={form.interest} onChange={updateField}>
              <option value="">{compact ? "בחרו סוג עסק" : "בחרו מערכת או צורך"}</option>
              {compact ? (
                <>
                  <option value="יופי וטיפוח">יופי וטיפוח</option>
                  <option value="מספרה">מספרה</option>
                  <option value="קליניקה / בריאות">קליניקה / בריאות</option>
                  <option value="כושר וספורט">כושר וספורט</option>
                  <option value="מסעדה / בית קפה">מסעדה / בית קפה</option>
                  <option value="שירותים מקצועיים">שירותים מקצועיים</option>
                  <option value="אחר">אחר</option>
                </>
              ) : (
                <>
                  <option value="מערכת ניהול מותאמת">מערכת ניהול מותאמת</option>
                  <option value="מערכת לידים ו-CRM">מערכת לידים ו‑CRM</option>
                  <option value="ניהול מוקד וצוותים">ניהול מוקד וצוותים</option>
                  <option value="ניהול קליניקה ותורים">ניהול קליניקה ותורים</option>
                  <option value="חבילת AllInCenter × פלאקארד">חבילת AllInCenter × פלאקארד</option>
                  <option value="אוטומציות לעסק">אוטומציות לעסק</option>
                  <option value="אחר">אחר</option>
                </>
              )}
            </select>
          </label>
        )}

        {!compact ? (
          <label className="contact-form__wide">
            <span>{messageLabel || "ספרו לנו בקצרה על הצורך"}{showRole ? " *" : ""}</span>
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              maxLength={2000}
              rows={4}
              placeholder={messagePlaceholder || "מה תרצו לייעל או לנהל טוב יותר?"}
              required={showRole}
            />
          </label>
        ) : null}
      </div>

      <label className="contact-form__honeypot" aria-hidden="true">
        <span>אתר</span>
        <input
          name="website"
          value={form.website}
          onChange={updateField}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <label className="contact-form__consent">
        <input
          name="consent"
          type="checkbox"
          checked={form.consent}
          onChange={updateField}
          required
        />
        <span>אני מאשר/ת שיחזרו אליי בנוגע לפנייה זו.</span>
      </label>

      {status === "error" && (
        <p className="contact-form__error" role="alert">
          <AlertCircle size={17} />
          השליחה לא הצליחה כרגע. נסו שוב בעוד רגע.
        </p>
      )}

      <button
        className={`btn btn--primary contact-form__submit${compact ? " lp-cta" : ""}`}
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <LoaderCircle className="spin" size={18} />
            שולחים...
          </>
        ) : (
          <>
            {submitLabel || "שליחת הפנייה"}
            <ArrowLeft size={18} className="lp-cta__arrow" />
          </>
        )}
      </button>
      <small className="contact-form__note">
        {note ||
          (compact
            ? "הדגמה ללא התחייבות · הפרטים מאובטחים"
            : "הפרטים נשמרים באופן מאובטח במערכת הלידים שלנו.")}
      </small>
    </form>
  );
}
