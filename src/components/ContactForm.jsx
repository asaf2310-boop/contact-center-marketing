import React, { useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";

const initialForm = {
  fullName: "",
  businessName: "",
  phone: "",
  email: "",
  interest: "",
  message: "",
  website: "",
  consent: false,
};

function getAttribution() {
  const params = new URLSearchParams(window.location.search);
  return {
    pageUrl: window.location.href,
    utm: {
      source: params.get("utm_source") || undefined,
      medium: params.get("utm_medium") || undefined,
      campaign: params.get("utm_campaign") || undefined,
      content: params.get("utm_content") || undefined,
    },
  };
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
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
        body: JSON.stringify({ ...form, ...getAttribution() }),
      });

      if (!response.ok) throw new Error("Submission failed");
      setForm(initialForm);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="contact-success" role="status">
        <span>
          <CheckCircle2 size={34} />
        </span>
        <h3>הפנייה התקבלה בהצלחה</h3>
        <p>הפרטים נכנסו למערכת הלידים שלנו. נחזור אליכם בהקדם.</p>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus("idle")}>
          שליחת פנייה נוספת
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="contact-form__grid">
        <label>
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

        <label>
          <span>שם העסק</span>
          <input
            name="businessName"
            value={form.businessName}
            onChange={updateField}
            maxLength={140}
            autoComplete="organization"
            placeholder="שם העסק או החברה"
          />
        </label>

        <label>
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

        <label>
          <span>אימייל</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            maxLength={254}
            autoComplete="email"
            placeholder="name@business.co.il"
          />
        </label>

        <label className="contact-form__wide">
          <span>מה מעניין אותך?</span>
          <select name="interest" value={form.interest} onChange={updateField}>
            <option value="">בחרו מערכת או צורך</option>
            <option value="מערכת ניהול מותאמת">מערכת ניהול מותאמת</option>
            <option value="מערכת לידים ו-CRM">מערכת לידים ו‑CRM</option>
            <option value="ניהול מוקד וצוותים">ניהול מוקד וצוותים</option>
            <option value="ניהול קליניקה ותורים">ניהול קליניקה ותורים</option>
            <option value="אוטומציות לעסק">אוטומציות לעסק</option>
            <option value="אחר">אחר</option>
          </select>
        </label>

        <label className="contact-form__wide">
          <span>ספרו לנו בקצרה על הצורך</span>
          <textarea
            name="message"
            value={form.message}
            onChange={updateField}
            maxLength={2000}
            rows={4}
            placeholder="מה תרצו לייעל או לנהל טוב יותר?"
          />
        </label>
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

      <button className="btn btn--primary contact-form__submit" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <LoaderCircle className="spin" size={18} />
            שולחים...
          </>
        ) : (
          <>
            <Send size={18} />
            שליחת הפנייה
          </>
        )}
      </button>
      <small className="contact-form__note">הפרטים נשמרים באופן מאובטח במערכת הלידים שלנו.</small>
    </form>
  );
}
