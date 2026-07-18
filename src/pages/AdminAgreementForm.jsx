import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminGate from "@/components/admin/AdminGate";
import AgreementDocument from "@/components/agreement/AgreementDocument";
import StatusBadge from "@/components/agreement/StatusBadge";
import {
  createAgreement,
  getAgreement,
  updateAgreement,
} from "@/lib/digitalAgreementApi";
import { getDefaultFormValues } from "@/lib/digitalAgreementText";

export default function AdminAgreementForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(getDefaultFormValues());
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!isEdit) return undefined;

    let active = true;
    (async () => {
      try {
        const result = await getAgreement(id);
        if (!active) return;
        setForm({
          ...getDefaultFormValues(),
          ...result.agreement,
        });
        setStatus(result.agreement.status);
      } catch (err) {
        if (active) setError(err.message || "שגיאה בטעינה");
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [id, isEdit]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (!form.client_business_name.trim()) {
        throw new Error("שם העסק נדרש");
      }

      const payload = {
        ...form,
        setup_cost: Number(form.setup_cost) || 200,
        monthly_cost: Number(form.monthly_cost) || 50,
      };

      if (isEdit) {
        await updateAgreement(id, payload);
        navigate("/admin/agreements");
      } else {
        const result = await createAgreement(payload);
        navigate(`/admin/agreements/${result.agreement.id}`);
      }
    } catch (err) {
      setError(err.message || "שגיאה בשמירה");
    } finally {
      setSaving(false);
    }
  };

  const readOnly = status === "signed" || status === "cancelled";

  return (
    <AdminGate>
      <div className="admin-content" dir="rtl">
        <div className="admin-header-row">
          <div>
            <h1>{isEdit ? "עריכת הסכם" : "הסכם חדש"}</h1>
            {isEdit && <StatusBadge status={status} />}
          </div>
          <Link to="/admin/agreements" className="secondary-btn">
            חזרה לרשימה
          </Link>
        </div>

        {loading && <p className="agreement-muted">טוען...</p>}

        {!loading && readOnly && (
          <p className="field-error block">
            הסכם זה {status === "signed" ? "נחתם" : "בוטל"} ואינו ניתן לעריכה.
          </p>
        )}

        {!loading && (
          <>
            <div className="admin-form-tabs">
              <button
                type="button"
                className={`secondary-btn small-btn ${!preview ? "active-tab" : ""}`}
                onClick={() => setPreview(false)}
              >
                טופס
              </button>
              <button
                type="button"
                className={`secondary-btn small-btn ${preview ? "active-tab" : ""}`}
                onClick={() => setPreview(true)}
              >
                תצוגה מקדימה
              </button>
            </div>

            {preview ? (
              <div className="agreement-card">
                <AgreementDocument agreement={{ ...form, status }} />
              </div>
            ) : (
              <form className="agreement-card admin-agreement-form" onSubmit={handleSubmit}>
                <h2>פרטי עסק הלקוח</h2>
                <div className="agreement-form">
                  <label>
                    שם העסק *
                    <input
                      value={form.client_business_name}
                      onChange={(e) => updateField("client_business_name", e.target.value)}
                      disabled={readOnly}
                      required
                    />
                  </label>
                  <label>
                    איש קשר
                    <input
                      value={form.client_contact_name}
                      onChange={(e) => updateField("client_contact_name", e.target.value)}
                      disabled={readOnly}
                    />
                  </label>
                  <label>
                    אימייל
                    <input
                      type="email"
                      value={form.client_email}
                      onChange={(e) => updateField("client_email", e.target.value)}
                      disabled={readOnly}
                      dir="ltr"
                    />
                  </label>
                  <label>
                    טלפון
                    <input
                      value={form.client_phone}
                      onChange={(e) => updateField("client_phone", e.target.value)}
                      disabled={readOnly}
                      dir="ltr"
                    />
                  </label>
                  <label className="full-width">
                    כתובת
                    <input
                      value={form.client_address}
                      onChange={(e) => updateField("client_address", e.target.value)}
                      disabled={readOnly}
                    />
                  </label>
                  <label>
                    ת.ז. / ח.פ.
                    <input
                      value={form.client_id_number}
                      onChange={(e) => updateField("client_id_number", e.target.value)}
                      disabled={readOnly}
                    />
                  </label>
                </div>

                <h2>פרטי שירות</h2>
                <div className="agreement-form">
                  <label className="full-width">
                    כותרת שירות
                    <input
                      value={form.service_title}
                      onChange={(e) => updateField("service_title", e.target.value)}
                      disabled={readOnly}
                    />
                  </label>
                  <label className="full-width">
                    תיאור השירות
                    <textarea
                      rows={3}
                      value={form.service_description}
                      onChange={(e) => updateField("service_description", e.target.value)}
                      disabled={readOnly}
                    />
                  </label>
                  <label className="full-width">
                    מה כלול
                    <textarea
                      rows={4}
                      value={form.service_included}
                      onChange={(e) => updateField("service_included", e.target.value)}
                      disabled={readOnly}
                    />
                  </label>
                  <label className="full-width">
                    מה לא כלול
                    <textarea
                      rows={4}
                      value={form.service_excluded}
                      onChange={(e) => updateField("service_excluded", e.target.value)}
                      disabled={readOnly}
                    />
                  </label>
                </div>

                <h2>עלויות ולוחות זמנים</h2>
                <div className="agreement-form">
                  <label>
                    עלות הקמה (₪)
                    <input
                      type="number"
                      min="0"
                      value={form.setup_cost}
                      onChange={(e) => updateField("setup_cost", e.target.value)}
                      disabled={readOnly}
                    />
                  </label>
                  <label>
                    תחזוקה חודשית (₪)
                    <input
                      type="number"
                      min="0"
                      value={form.monthly_cost}
                      onChange={(e) => updateField("monthly_cost", e.target.value)}
                      disabled={readOnly}
                    />
                  </label>
                  <label className="full-width">
                    תנאי תשלום
                    <textarea
                      rows={2}
                      value={form.payment_terms}
                      onChange={(e) => updateField("payment_terms", e.target.value)}
                      disabled={readOnly}
                    />
                  </label>
                  <label className="full-width">
                    לוח זמנים למסירה
                    <textarea
                      rows={2}
                      value={form.delivery_timeline}
                      onChange={(e) => updateField("delivery_timeline", e.target.value)}
                      disabled={readOnly}
                    />
                  </label>
                  <label className="full-width">
                    הערות פנימיות (אדמין)
                    <textarea
                      rows={2}
                      value={form.admin_notes}
                      onChange={(e) => updateField("admin_notes", e.target.value)}
                      disabled={readOnly}
                    />
                  </label>
                </div>

                {error && <p className="field-error block">{error}</p>}

                {!readOnly && (
                  <div className="agreement-actions split">
                    <button type="submit" className="primary-btn" disabled={saving}>
                      {saving ? "שומר..." : isEdit ? "עדכון הסכם" : "יצירת הסכם"}
                    </button>
                  </div>
                )}
              </form>
            )}
          </>
        )}
      </div>
    </AdminGate>
  );
}
