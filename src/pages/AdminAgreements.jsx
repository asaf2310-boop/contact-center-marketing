import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminGate from "@/components/admin/AdminGate";
import StatusBadge from "@/components/agreement/StatusBadge";
import { cancelAgreement, listAgreements, sendAgreement } from "@/lib/digitalAgreementApi";
import { formatNis } from "@/lib/digitalAgreementConfig";

export default function AdminAgreements() {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("");
  const [actionId, setActionId] = useState("");
  const [copiedToken, setCopiedToken] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await listAgreements();
      setAgreements(result.agreements || []);
      setMode(result.mode || "api");
    } catch (err) {
      setError(err.message || "שגיאה בטעינה");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSend = async (id) => {
    setActionId(id);
    try {
      const result = await sendAgreement(id);
      if (result.signUrl) {
        await navigator.clipboard.writeText(result.signUrl);
        setCopiedToken(id);
        setTimeout(() => setCopiedToken(""), 2500);
      }
      await load();
    } catch (err) {
      alert(err.message || "שגיאה בשליחה");
    } finally {
      setActionId("");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("לבטל את ההסכם?")) return;
    setActionId(id);
    try {
      await cancelAgreement(id);
      await load();
    } catch (err) {
      alert(err.message || "שגיאה בביטול");
    } finally {
      setActionId("");
    }
  };

  const copySignLink = async (token) => {
    const url = `${window.location.origin}/sign/${token}`;
    await navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(""), 2500);
  };

  return (
    <AdminGate>
      <div className="admin-content" dir="rtl">
        <div className="admin-header-row">
          <div>
            <h1>הסכמים דיגיטליים</h1>
            {mode === "demo" && <p className="agreement-muted">מצב דמו — נשמר ב-localStorage</p>}
          </div>
          <Link to="/admin/agreements/new" className="primary-btn">
            הסכם חדש
          </Link>
        </div>

        {loading && <p className="agreement-muted">טוען...</p>}
        {error && <p className="field-error block">{error}</p>}

        {!loading && agreements.length === 0 && (
          <div className="agreement-card">
            <p>אין הסכמים עדיין. צרו הסכם חדש ללקוח.</p>
          </div>
        )}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>עסק</th>
                <th>איש קשר</th>
                <th>סכום</th>
                <th>סטטוס</th>
                <th>תאריך</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {agreements.map((item) => {
                const total = (Number(item.setup_cost) || 0) + (Number(item.monthly_cost) || 0);
                const busy = actionId === item.id;
                return (
                  <tr key={item.id}>
                    <td>{item.client_business_name}</td>
                    <td>{item.client_contact_name || "—"}</td>
                    <td>{formatNis(total)}</td>
                    <td>
                      <StatusBadge status={item.status} />
                    </td>
                    <td>
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString("he-IL")
                        : "—"}
                    </td>
                    <td className="admin-actions-cell">
                      <Link to={`/admin/agreements/${item.id}`} className="secondary-btn small-btn">
                        עריכה
                      </Link>
                      {item.status !== "signed" && item.status !== "cancelled" && (
                        <>
                          <button
                            type="button"
                            className="primary-btn small-btn"
                            disabled={busy}
                            onClick={() => handleSend(item.id)}
                          >
                            {busy ? "..." : "שליחה"}
                          </button>
                          <button
                            type="button"
                            className="secondary-btn small-btn"
                            onClick={() => copySignLink(item.access_token)}
                          >
                            {copiedToken === item.access_token ? "הועתק" : "קישור"}
                          </button>
                          <button
                            type="button"
                            className="secondary-btn small-btn danger-btn"
                            disabled={busy}
                            onClick={() => handleCancel(item.id)}
                          >
                            ביטול
                          </button>
                        </>
                      )}
                      {item.status === "signed" && (
                        <Link to={`/sign/${item.access_token}`} className="secondary-btn small-btn">
                          צפייה
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminGate>
  );
}
