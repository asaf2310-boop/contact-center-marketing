import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AgreementLogoHeader from "@/components/agreement/AgreementLogoHeader";
import {
  AGREEMENT_PRICING,
  AGREEMENT_PROVIDER,
  formatNis,
} from "@/lib/agreementConfig";
import { buildAgreementPlainText, buildAgreementSections } from "@/lib/agreementText";
import {
  copyText,
  getBitPaymentDetails,
  openBitPayment,
} from "@/lib/paymentLinks";
import {
  formatIsraeliPhoneDisplay,
  getEmailError,
  getIsraeliPhoneError,
  phoneDigitsOnly,
} from "@/lib/israeliValidators";
import { submitWorkAgreement } from "@/lib/agreementApi";

const STEPS = [
  { id: "details", label: "פרטי לקוח" },
  { id: "agreement", label: "הסכם" },
  { id: "payment", label: "תשלום" },
  { id: "signature", label: "אישור" },
];

const initialForm = {
  client_name: "",
  company_name: "",
  client_email: "",
  client_phone: "",
  client_id_number: "",
  project_description: "",
};

export default function Agreement() {
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [agreementRead, setAgreementRead] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [bitGuideOpen, setBitGuideOpen] = useState(false);
  const [signatureName, setSignatureName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState(null);
  const [copyFeedback, setCopyFeedback] = useState("");

  const sections = useMemo(() => buildAgreementSections(), []);
  const bitDetails = useMemo(() => getBitPaymentDetails(), []);

  const fieldErrors = useMemo(
    () => ({
      client_name: !form.client_name.trim() ? "יש להזין שם מלא" : "",
      client_email: getEmailError(form.client_email, { required: true }) || "",
      client_phone: getIsraeliPhoneError(form.client_phone, { required: true }) || "",
    }),
    [form],
  );

  const detailsValid =
    !fieldErrors.client_name && !fieldErrors.client_email && !fieldErrors.client_phone;

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhoneChange = (value) => {
    updateField("client_phone", formatIsraeliPhoneDisplay(value));
  };

  const handleBitPay = () => {
    setBitGuideOpen(true);
    openBitPayment();
  };

  const handleCopyPayment = async () => {
    try {
      await copyText(bitDetails.clipboardText);
      setCopyFeedback("הועתק");
      setTimeout(() => setCopyFeedback(""), 2000);
    } catch {
      setCopyFeedback("שגיאה בהעתקה");
    }
  };

  const goNext = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  const handleSubmit = async () => {
    setSubmitError("");
    const trimmedSignature = signatureName.trim();
    if (!trimmedSignature) {
      setSubmitError("יש להזין את השם המלא לאישור");
      return;
    }
    if (trimmedSignature !== form.client_name.trim()) {
      setSubmitError("שם האישור חייב להתאים בדיוק לשם המלא מהשלב הראשון");
      return;
    }
    if (!agreementRead || !paymentConfirmed) {
      setSubmitError("יש לאשר את ההסכם ואת התשלום");
      return;
    }

    setSubmitting(true);
    try {
      const agreementText = buildAgreementPlainText(form.client_name);
      const response = await submitWorkAgreement({
        ...form,
        client_phone: phoneDigitsOnly(form.client_phone),
        agreement_accepted: agreementRead,
        signature_name: trimmedSignature,
        payment_confirmed: paymentConfirmed,
        payment_method: "bit",
        agreement_text: agreementText,
      });
      setResult(response);
    } catch (error) {
      setSubmitError(error.message || "שגיאה בשליחה. נסו שוב.");
    } finally {
      setSubmitting(false);
    }
  };

  if (result?.ok) {
    return (
      <div className="agreement-shell">
        <AgreementLogoHeader subtitle="הסכם שירותי פיתוח ותחזוקה" />
        <div className="agreement-card agreement-success">
          <span className="agreement-success-icon" aria-hidden="true">✓</span>
          <h1>ההסכם נשמר בהצלחה</h1>
          <p>
            תודה, {form.client_name}. אישור ההסכם והתשלום נקלטו במערכת.
            {result.mode === "demo" && " (מצב דמו — נשמר מקומית בדפדפן)"}
          </p>
          {result.id && (
            <p className="agreement-ref">
              מספר אסמכתא: <code>{result.id}</code>
            </p>
          )}
          <p className="agreement-muted">
            ניצור קשר בקרוב לתיאום המשך העבודה. לשאלות: {AGREEMENT_PROVIDER.phoneDisplay}
          </p>
          <Link to="/" className="primary-btn">
            חזרה לאתר
          </Link>
        </div>
      </div>
    );
  }

  const step = STEPS[stepIndex].id;

  return (
    <div className="agreement-shell">
      <AgreementLogoHeader subtitle="הסכם שירותי פיתוח ותחזוקה" />

      <div className="agreement-progress" aria-label="התקדמות">
        {STEPS.map((s, index) => (
          <div
            key={s.id}
            className={`agreement-progress-step ${index === stepIndex ? "active" : ""} ${index < stepIndex ? "done" : ""}`}
          >
            <span>{index + 1}</span>
            <small>{s.label}</small>
          </div>
        ))}
      </div>

      <div className="agreement-card">
        {step === "details" && (
          <>
            <h1>פרטי הלקוח</h1>
            <p className="agreement-lead">מלאו את הפרטים לצורך ההסכם והחשבונית.</p>
            <div className="agreement-form">
              <label>
                שם מלא *
                <input
                  value={form.client_name}
                  onChange={(e) => updateField("client_name", e.target.value)}
                  placeholder="ישראל ישראלי"
                  autoComplete="name"
                />
                {fieldErrors.client_name && <em className="field-error">{fieldErrors.client_name}</em>}
              </label>
              <label>
                שם חברה / עסק
                <input
                  value={form.company_name}
                  onChange={(e) => updateField("company_name", e.target.value)}
                  placeholder="שם העסק (אופציונלי)"
                />
              </label>
              <label>
                אימייל *
                <input
                  type="email"
                  value={form.client_email}
                  onChange={(e) => updateField("client_email", e.target.value)}
                  placeholder="name@example.com"
                  dir="ltr"
                  autoComplete="email"
                />
                {fieldErrors.client_email && <em className="field-error">{fieldErrors.client_email}</em>}
              </label>
              <label>
                טלפון נייד *
                <input
                  value={form.client_phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="05X-XXX-XXXX"
                  dir="ltr"
                  inputMode="tel"
                  autoComplete="tel"
                />
                {fieldErrors.client_phone && <em className="field-error">{fieldErrors.client_phone}</em>}
              </label>
              <label>
                ת.ז. / ח.פ.
                <input
                  value={form.client_id_number}
                  onChange={(e) => updateField("client_id_number", e.target.value)}
                  placeholder="אופציונלי"
                />
              </label>
              <label className="full-width">
                תיאור הפרויקט (אופציונלי)
                <textarea
                  rows={3}
                  value={form.project_description}
                  onChange={(e) => updateField("project_description", e.target.value)}
                  placeholder="לדוגמה: אתר תדמית + מערכת הזמנות"
                />
              </label>
            </div>
            <div className="agreement-actions">
              <button type="button" className="primary-btn" disabled={!detailsValid} onClick={goNext}>
                המשך להסכם
              </button>
            </div>
          </>
        )}

        {step === "agreement" && (
          <>
            <h1>הסכם שירות</h1>
            <p className="agreement-lead">
              קראו את תנאי ההסכם. לאחר מכן אשרו ועברו לתשלום.
            </p>
            <div className="agreement-text-box">
              {sections.map((section) => (
                <section key={section.title}>
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                </section>
              ))}
            </div>
            <label className="agreement-checkbox">
              <input
                type="checkbox"
                checked={agreementRead}
                onChange={(e) => setAgreementRead(e.target.checked)}
              />
              <span>קראתי את תנאי ההסכם ואני מסכים/ה להם</span>
            </label>
            <div className="agreement-actions split">
              <button type="button" className="secondary-btn" onClick={goBack}>
                חזרה
              </button>
              <button type="button" className="primary-btn" disabled={!agreementRead} onClick={goNext}>
                המשך לתשלום
              </button>
            </div>
          </>
        )}

        {step === "payment" && (
          <>
            <h1>תשלום בביט</h1>
            <p className="agreement-lead">סכום חד-פעמי עם חתימה על ההסכם</p>

            <div className="pricing-table">
              <div className="pricing-row">
                <span>עלות הקמה (חד-פעמית)</span>
                <strong>{formatNis(AGREEMENT_PRICING.setup)}</strong>
              </div>
              <div className="pricing-row">
                <span>תחזוקה — חודש ראשון</span>
                <strong>{formatNis(AGREEMENT_PRICING.firstMonthMaintenance)}</strong>
              </div>
              <div className="pricing-row total">
                <span>סה״כ לתשלום</span>
                <strong>{formatNis(AGREEMENT_PRICING.total)}</strong>
              </div>
            </div>

            <div className="bit-payment-panel">
              <div className="bit-payment-layout">
                <div className="bit-payment-main">
                  <h2 className="bit-payment-title">תשלום בביט — {bitDetails.amountDisplay}</h2>
                  <p className="bit-payment-lead">
                    סרקו את קוד ה-QR או לחצו לפתיחת תשלום בביט. סכום כולל: הקמה{" "}
                    {formatNis(AGREEMENT_PRICING.setup)} + חודש ראשון{" "}
                    {formatNis(AGREEMENT_PRICING.firstMonthMaintenance)}.
                  </p>
                  <div className="bit-actions">
                    <button type="button" className="bit-btn" onClick={handleBitPay}>
                      <span className="bit-logo" aria-hidden="true">ביט</span>
                      שלמו {bitDetails.amountDisplay}
                    </button>
                    <button type="button" className="secondary-btn" onClick={handleCopyPayment}>
                      העתק פרטים {copyFeedback && `(${copyFeedback})`}
                    </button>
                  </div>

                  {bitGuideOpen && !bitDetails.qrImage && (
                    <div className="bit-guide">
                      <p>
                        {bitDetails.url ? (
                          <>
                            קישור תשלום:{" "}
                            <a href={bitDetails.url} target="_blank" rel="noreferrer">
                              פתיחה בביט
                            </a>
                          </>
                        ) : (
                          <>
                            העבירו <strong>{bitDetails.amountDisplay}</strong> לטלפון{" "}
                            <strong>{bitDetails.phoneDisplay || AGREEMENT_PROVIDER.phoneDisplay}</strong>
                          </>
                        )}
                      </p>
                    </div>
                  )}

                  <p className="agreement-muted bit-payment-footer">
                    לאחר הסריקה או התשלום — סמנו את תיבת האישור למטה
                  </p>
                </div>

                {bitDetails.qrImage && (
                  <figure className="bit-payment-qr-wrap">
                    <img
                      src={bitDetails.qrImage}
                      alt={`ברקוד תשלום ביט — ${bitDetails.amountDisplay} (הקמה ותחזוקה חודש ראשון)`}
                      className="bit-qr"
                      width={240}
                      height={240}
                      loading="eager"
                      decoding="async"
                    />
                    <figcaption>סרקו עם אפליקציית ביט</figcaption>
                  </figure>
                )}
              </div>
            </div>

            <label className="agreement-checkbox">
              <input
                type="checkbox"
                checked={paymentConfirmed}
                onChange={(e) => setPaymentConfirmed(e.target.checked)}
              />
              <span>אני מאשר/ת ששילמתי {formatNis(AGREEMENT_PRICING.total)} בביט</span>
            </label>

            <div className="agreement-actions split">
              <button type="button" className="secondary-btn" onClick={goBack}>
                חזרה
              </button>
              <button type="button" className="primary-btn" disabled={!paymentConfirmed} onClick={goNext}>
                המשך לאישור סופי
              </button>
            </div>
          </>
        )}

        {step === "signature" && (
          <>
            <h1>אישור וחתימה</h1>
            <p className="agreement-lead">
              הקלידו את שמכם המלא בדיוק כפי שהוזן בשלב הראשון — זהו אישור מחייב להסכם.
            </p>

            <div className="signature-summary">
              <p><strong>שם:</strong> {form.client_name}</p>
              {form.company_name && <p><strong>חברה:</strong> {form.company_name}</p>}
              <p><strong>אימייל:</strong> {form.client_email}</p>
              <p><strong>סכום:</strong> {formatNis(AGREEMENT_PRICING.total)} (ביט)</p>
            </div>

            <label>
              אישור שם מלא (חתימה) *
              <input
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                placeholder={form.client_name}
                autoComplete="name"
              />
            </label>

            <label className="agreement-checkbox">
              <input type="checkbox" checked readOnly />
              <span>אני מאשר/ת שכל הפרטים נכונים ושההסכם מחייב אותי/אותי מבחינה משפטית</span>
            </label>

            {submitError && <p className="field-error block">{submitError}</p>}

            <div className="agreement-actions split">
              <button type="button" className="secondary-btn" onClick={goBack} disabled={submitting}>
                חזרה
              </button>
              <button
                type="button"
                className="primary-btn"
                disabled={submitting || !signatureName.trim()}
                onClick={handleSubmit}
              >
                {submitting ? "שולח..." : "שליחת הסכם חתום"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
