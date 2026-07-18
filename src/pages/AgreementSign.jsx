import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AgreementDocument from "@/components/agreement/AgreementDocument";
import AgreementLogoHeader from "@/components/agreement/AgreementLogoHeader";
import SignaturePad from "@/components/agreement/SignaturePad";
import StatusBadge from "@/components/agreement/StatusBadge";
import { fetchPublicAgreement, signAgreement } from "@/lib/digitalAgreementApi";
import {
  formatIsraeliPhoneDisplay,
  getEmailError,
  getIsraeliPhoneError,
  phoneDigitsOnly,
} from "@/lib/israeliValidators";

export default function AgreementSign() {
  const { token } = useParams();
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("");

  const [termsApproved, setTermsApproved] = useState(false);
  const [signatureMode, setSignatureMode] = useState("draw");
  const [signatureImage, setSignatureImage] = useState("");
  const [signatureName, setSignatureName] = useState("");
  const [signerFullName, setSignerFullName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [signerPhone, setSignerPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const result = await fetchPublicAgreement(token);
        if (!active) return;
        setAgreement(result.agreement);
        setMode(result.mode || "api");
        setSignerFullName(result.agreement.client_contact_name || "");
        setSignerEmail(result.agreement.client_email || "");
        setSignerPhone(
          result.agreement.client_phone
            ? formatIsraeliPhoneDisplay(result.agreement.client_phone)
            : "",
        );
        if (result.agreement.status === "signed") setSigned(true);
      } catch (err) {
        if (active) setError(err.message || "הסכם לא נמצא");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [token]);

  const emailError = getEmailError(signerEmail, { required: true });
  const phoneError = getIsraeliPhoneError(signerPhone, { required: true });

  const canSubmit =
    termsApproved &&
    signerFullName.trim() &&
    !emailError &&
    !phoneError &&
    (signatureMode === "draw" ? signatureImage : signatureName.trim());

  const handleSign = async () => {
    setSubmitError("");
    if (!canSubmit) {
      setSubmitError("יש למלא את כל השדות ולאשר את התנאים");
      return;
    }

    setSubmitting(true);
    try {
      const result = await signAgreement(token, {
        terms_approved: true,
        signature_type: signatureMode,
        signature_image: signatureMode === "draw" ? signatureImage : null,
        signature_name: signatureMode === "type" ? signatureName.trim() : signerFullName.trim(),
        signer_full_name: signerFullName.trim(),
        signer_email: signerEmail.trim(),
        signer_phone: phoneDigitsOnly(signerPhone),
      });
      setAgreement(result.agreement);
      setSigned(true);
    } catch (err) {
      setSubmitError(err.message || "שגיאה בחתימה");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="agreement-shell">
        <AgreementLogoHeader subtitle="טוען הסכם..." homeTo="/" />
        <div className="agreement-card">
          <p className="agreement-muted">טוען...</p>
        </div>
      </div>
    );
  }

  if (error || !agreement) {
    return (
      <div className="agreement-shell">
        <AgreementLogoHeader homeTo="/" />
        <div className="agreement-card agreement-success">
          <h1>הסכם לא נמצא</h1>
          <p className="agreement-muted">{error || "הקישור אינו תקין או שפג תוקפו."}</p>
          <Link to="/" className="primary-btn">
            חזרה לאתר
          </Link>
        </div>
      </div>
    );
  }

  if (agreement.status === "cancelled") {
    return (
      <div className="agreement-shell">
        <AgreementLogoHeader homeTo="/" />
        <div className="agreement-card">
          <h1>ההסכם בוטל</h1>
          <p className="agreement-muted">ההסכם אינו זמין לחתימה. פנו אלינו לקבלת הסכם חדש.</p>
        </div>
      </div>
    );
  }

  if (signed || agreement.status === "signed") {
    return (
      <div className="agreement-shell">
        <AgreementLogoHeader subtitle="הסכם חתום" homeTo="/" />
        <div className="agreement-card agreement-success">
          <span className="agreement-success-icon" aria-hidden="true">✓</span>
          <h1>ההסכם נחתם בהצלחה</h1>
          <p>
            תודה, {agreement.signer_full_name || signerFullName}. עותק ההסכם יישלח לאימייל שלך
            {mode === "demo" && " (מצב דמו — ללא שליחת מייל)"}.
          </p>
          <StatusBadge status="signed" />
        </div>
        <div className="agreement-card">
          <AgreementDocument agreement={agreement} />
        </div>
      </div>
    );
  }

  return (
    <div className="agreement-shell">
      <AgreementLogoHeader subtitle={agreement.service_title} homeTo="/" />

      <div className="agreement-card">
        <div className="agreement-sign-header">
          <h1>חתימה על הסכם שירות</h1>
          <StatusBadge status={agreement.status} />
        </div>
        <AgreementDocument agreement={agreement} />
      </div>

      <div className="agreement-card">
        <h2>אישור וחתימה דיגיטלית</h2>
        <p className="agreement-lead">
          מלאו את פרטיכם, אשרו את התנאים וחתמו על ההסכם.
        </p>

        <div className="agreement-form">
          <label>
            שם מלא *
            <input
              value={signerFullName}
              onChange={(e) => setSignerFullName(e.target.value)}
              placeholder="ישראל ישראלי"
            />
          </label>
          <label>
            אימייל *
            <input
              type="email"
              value={signerEmail}
              onChange={(e) => setSignerEmail(e.target.value)}
              dir="ltr"
            />
            {emailError && <em className="field-error">{emailError}</em>}
          </label>
          <label>
            טלפון *
            <input
              value={signerPhone}
              onChange={(e) => setSignerPhone(formatIsraeliPhoneDisplay(e.target.value))}
              dir="ltr"
              inputMode="tel"
            />
            {phoneError && <em className="field-error">{phoneError}</em>}
          </label>
        </div>

        <label className="agreement-checkbox">
          <input
            type="checkbox"
            checked={termsApproved}
            onChange={(e) => setTermsApproved(e.target.checked)}
          />
          <span>קראתי את תנאי ההסכם ואני מסכים/ה להם</span>
        </label>

        <div className="signature-mode-tabs">
          <button
            type="button"
            className={`secondary-btn small-btn ${signatureMode === "draw" ? "active-tab" : ""}`}
            onClick={() => setSignatureMode("draw")}
          >
            חתימה בציור
          </button>
          <button
            type="button"
            className={`secondary-btn small-btn ${signatureMode === "type" ? "active-tab" : ""}`}
            onClick={() => setSignatureMode("type")}
          >
            הקלדת שם מלא
          </button>
        </div>

        {signatureMode === "draw" ? (
          <SignaturePad onChange={setSignatureImage} disabled={submitting} />
        ) : (
          <label>
            הקלידו את שמכם המלא כחתימה *
            <input
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              placeholder={signerFullName}
            />
          </label>
        )}

        <p className="agreement-muted signature-legal-note">
          בלחיצה על "חתימה והשלמה" תישמר חתימתכם הדיגיטלית יחד עם תאריך, שעה וכתובת IP.
        </p>

        {submitError && <p className="field-error block">{submitError}</p>}

        <div className="agreement-actions">
          <button
            type="button"
            className="primary-btn"
            disabled={submitting || !canSubmit}
            onClick={handleSign}
          >
            {submitting ? "חותם..." : "חתימה והשלמה"}
          </button>
        </div>
      </div>
    </div>
  );
}
