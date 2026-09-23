import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DemoFrame from "@/pages/demo/DemoFrame";
import useAppointmentDemo from "@/lib/useAppointmentDemo";
import { formatIsraeliPhoneDisplay, getEmailError, getIsraeliPhoneError } from "@/lib/israeliValidators";
import {
  ADMIN_TIMES,
  CLINIC,
  PAYMENT_OPTIONS,
  SERVICES,
  STATUS_OPTIONS,
  addDays,
  createManualAppointment,
  describeCustomer,
  findCustomer,
  formatLongDate,
  formatMoney,
  formatShortDate,
  formatWeekday,
  getService,
  isFreshOnlineBooking,
  nextUpcoming,
  onlineBookings,
  patchAppointment,
  paymentLabel,
  resetDemoState,
  startOfWeek,
  statusLabel,
  todayIso,
  todaySummary,
} from "@/lib/appointmentDemoStore";

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  serviceId: "personal",
  date: "",
  time: "10:00",
  status: "confirmed",
  paymentStatus: "pending",
  notes: "",
};

function appointmentsOn(state, iso) {
  return state.appointments
    .filter((appointment) => appointment.date === iso)
    .sort((a, b) => a.time.localeCompare(b.time) || a.id.localeCompare(b.id));
}

function StatusBadge({ status }) {
  return <span className={`ad-status ad-status--${status}`}>{statusLabel(status)}</span>;
}

function PaymentBadge({ status }) {
  return <span className={`ad-pay ad-pay--${status}`}>{paymentLabel(status)}</span>;
}

function AppointmentButton({ appointment, customer, onOpen, compact = false }) {
  const service = getService(appointment.serviceId);
  const fromSite = appointment.source === "booking";
  const fresh = isFreshOnlineBooking(appointment);
  return (
    <button
      type="button"
      className={`ad-appt${compact ? " ad-appt--compact" : ""}${appointment.status === "cancelled" ? " is-cancelled" : ""}${fromSite ? " is-online" : ""}${fresh ? " is-new" : ""}`}
      onClick={() => onOpen(appointment.id)}
    >
      <span className="ad-appt__time">{appointment.time}</span>
      <span className="ad-name ad-appt__name">{customer?.name || "לקוח"}</span>
      <small className="ad-appt__service">{service.name}</small>
      <span className="ad-appt__meta">
        <StatusBadge status={appointment.status} />
        {fromSite ? <span className="ad-chip">חדש מהאתר</span> : null}
      </span>
    </button>
  );
}

export default function AppointmentAdminDemo() {
  const [state, commit] = useAppointmentDemo();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState("calendar");
  const [range, setRange] = useState("day");
  const [cursor, setCursor] = useState(() => todayIso());
  const [selectedId, setSelectedId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const focusedFromBooking = useRef(false);

  useEffect(() => {
    if (!state || !selectedId) return;
    if (!state.appointments.some((appointment) => appointment.id === selectedId)) {
      setSelectedId(null);
      setEditing(false);
    }
  }, [state, selectedId]);

  useEffect(() => {
    if (!state || focusedFromBooking.current) return;
    const focusId = searchParams.get("focus");
    const fromBooking = searchParams.get("from") === "booking";
    const target = (focusId && state.appointments.find((appointment) => appointment.id === focusId))
      || (fromBooking ? onlineBookings(state)[0] : null);
    if (!target) return;
    focusedFromBooking.current = true;
    setView("calendar");
    setRange("day");
    setCursor(target.date);
    setSelectedId(target.id);
  }, [state, searchParams]);

  useEffect(() => {
    if (!selectedId && !customerId && !creating) return undefined;
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      setCreating(false);
      setSelectedId(null);
      setCustomerId(null);
      setEditing(false);
      setConfirmCancel(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, customerId, creating]);

  const today = todayIso();
  const summary = state ? todaySummary(state) : null;
  const upcoming = state ? nextUpcoming(state) : null;
  const upcomingCustomer = upcoming ? findCustomer(state, upcoming.customerId) : null;
  const selected = state?.appointments.find((appointment) => appointment.id === selectedId) || null;
  const selectedCustomer = selected ? findCustomer(state, selected.customerId) : null;
  const activeCustomer = state?.customers.find((customer) => customer.id === customerId) || null;
  const customerDetails = state && activeCustomer ? describeCustomer(state, activeCustomer, today) : null;
  const bookedOnline = state ? onlineBookings(state).filter((appointment) => isFreshOnlineBooking(appointment)) : [];
  const weekStart = startOfWeek(cursor);
  const weekDays = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  const customers = useMemo(() => {
    if (!state) return [];
    return [...state.customers].sort((a, b) => a.name.localeCompare(b.name, "he"));
  }, [state]);

  function openAppointment(id) {
    setCustomerId(null);
    setCreating(false);
    setEditing(false);
    setConfirmCancel(false);
    setSelectedId(id);
  }

  function closeDrawer() {
    setSelectedId(null);
    setCustomerId(null);
    setEditing(false);
    setConfirmCancel(false);
  }

  function revealBooking(appointment) {
    setView("calendar");
    setRange("day");
    setCursor(appointment.date);
    openAppointment(appointment.id);
  }

  function changeStatus(status) {
    if (!selected) return;
    commit(patchAppointment(state, selected.id, { status }));
    setConfirmCancel(false);
  }

  function startEdit() {
    if (!selected) return;
    setDraft({
      serviceId: selected.serviceId,
      date: selected.date,
      time: selected.time,
      notes: selected.notes || "",
      paymentStatus: selected.paymentStatus,
    });
    setEditing(true);
    setConfirmCancel(false);
  }

  function saveEdit(event) {
    event.preventDefault();
    if (!selected || !draft?.date || !draft?.time) return;
    commit(patchAppointment(state, selected.id, draft));
    setCursor(draft.date);
    setEditing(false);
  }

  function cancelAppointment() {
    if (!selected) return;
    commit(patchAppointment(state, selected.id, { status: "cancelled" }));
    setConfirmCancel(false);
    setEditing(false);
  }

  function openCreate() {
    setCreating(true);
    setSelectedId(null);
    setCustomerId(null);
    setForm({ ...EMPTY_FORM, date: cursor });
    setFormErrors({});
  }

  function updateForm(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
    setFormErrors((current) => ({ ...current, [key]: undefined }));
  }

  function submitCreate(event) {
    event.preventDefault();
    const errors = {};
    if (form.name.trim().length < 2) errors.name = "נא להזין שם מלא";
    const phoneError = getIsraeliPhoneError(form.phone, { required: true });
    if (phoneError) errors.phone = phoneError;
    if (form.email.trim()) {
      const emailError = getEmailError(form.email, { required: true });
      if (emailError) errors.email = emailError;
    }
    if (!form.date) errors.date = "נא לבחור תאריך";
    if (!form.time) errors.time = "נא לבחור שעה";
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    const next = createManualAppointment(state, form);
    commit(next);
    setCursor(form.date);
    setView("calendar");
    setRange("day");
    setCreating(false);
    const created = next.appointments[next.appointments.length - 1];
    setSelectedId(created.id);
  }

  function resetDemo() {
    commit(resetDemoState());
    setSelectedId(null);
    setCustomerId(null);
    setEditing(false);
    setCreating(false);
    setConfirmReset(false);
    setCursor(todayIso());
  }

  function onKeyDown(event) {
    if (event.key === "Escape") {
      if (creating) setCreating(false);
      else closeDrawer();
    }
  }

  return (
    <DemoFrame
      title="מרכז הבקרה"
      subtitle={CLINIC.name}
      switchTo="/demo/appointments/booking"
      switchLabel="חוויית הלקוח"
    >
      {!state || !summary ? <p className="ad-loading">טוענים את היומן…</p> : (
        <>
          <section className="ad-summary" aria-label="סיכום היום">
            <article className="ad-stat">
              <span>תורים היום</span>
              <strong>{summary.appointments}</strong>
              <small>{summary.remaining > 0 ? `${summary.remaining} נותרו להמשך היום` : "אין תורים נוספים היום"}</small>
            </article>
            <article className="ad-stat">
              <span>לקוחות</span>
              <strong>{summary.customers}</strong>
              <small>כרטיסים פעילים</small>
            </article>
            <article className="ad-stat">
              <span>הכנסות היום</span>
              <strong>{formatMoney(summary.revenue)}</strong>
              <small>מטיפולים ששולמו</small>
            </article>
            <article className="ad-stat">
              <span>ממתינים לאישור</span>
              <strong>{summary.pending}</strong>
              <small>{summary.completed} הושלמו היום</small>
            </article>
          </section>

          {upcoming && upcomingCustomer && (
            <button type="button" className="ad-next" onClick={() => { setView("calendar"); setRange("day"); setCursor(upcoming.date); openAppointment(upcoming.id); }}>
              <span>התור הבא</span>
              <strong>{upcoming.time}</strong>
              <b className="ad-name">{upcomingCustomer.name}</b>
              <small>{getService(upcoming.serviceId).name}</small>
              <StatusBadge status={upcoming.status} />
            </button>
          )}

          <div className="ad-toolbar">
            <div className="ad-tabs" role="tablist" aria-label="תצוגות">
              <button type="button" role="tab" aria-selected={view === "calendar"} onClick={() => setView("calendar")}>יומן</button>
              <button type="button" role="tab" aria-selected={view === "customers"} onClick={() => setView("customers")}>לקוחות</button>
            </div>
            <div className="ad-toolbar__actions">
              <button type="button" className="ad-btn ad-btn--primary" onClick={openCreate}>+ תור חדש</button>
              <button type="button" className="ad-btn ad-btn--ghost" onClick={() => setConfirmReset(true)}>איפוס נתוני הדמו</button>
            </div>
          </div>

          {confirmReset && (
            <div className="ad-confirm" role="alertdialog" aria-label="איפוס נתוני הדמו">
              <p>לאפס את נתוני הדמו לנתונים המקוריים? תורים שנוצרו בהזמנה יימחקו מהדפדפן.</p>
              <div className="ad-inline-actions">
                <button type="button" className="ad-btn ad-btn--danger" onClick={resetDemo}>איפוס</button>
                <button type="button" className="ad-btn ad-btn--ghost" onClick={() => setConfirmReset(false)}>ביטול</button>
              </div>
            </div>
          )}

          {view === "calendar" && (
            <section className="ad-panel" aria-label="יומן תורים">
              {bookedOnline.length > 0 && (
                <div className="ad-banner">
                  <strong>נוסף עכשיו דרך ההזמנה אונליין</strong>
                  <ul>
                    {bookedOnline.map((appointment) => {
                      const customer = findCustomer(state, appointment.customerId);
                      return (
                        <li key={appointment.id}>
                          <button type="button" className="ad-textlink" onClick={() => revealBooking(appointment)}>
                            <span className="ad-name">{customer?.name}</span> · {formatShortDate(appointment.date)} · {appointment.time} · {getService(appointment.serviceId).name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className="ad-dayhead">
                <div className="ad-segment" aria-label="טווח תצוגה">
                  <button type="button" aria-pressed={range === "day"} onClick={() => setRange("day")}>יום</button>
                  <button type="button" aria-pressed={range === "week"} onClick={() => setRange("week")}>שבוע</button>
                </div>
                <div className="ad-inline-actions">
                  <button type="button" className="ad-btn ad-btn--ghost" onClick={() => setCursor(addDays(cursor, range === "week" ? -7 : -1))}>הקודם</button>
                  <button type="button" className="ad-btn ad-btn--ghost" onClick={() => setCursor(today)}>היום</button>
                  <button type="button" className="ad-btn ad-btn--ghost" onClick={() => setCursor(addDays(cursor, range === "week" ? 7 : 1))}>הבא</button>
                </div>
              </div>

              {range === "day" ? (
                <>
                  <h2>{formatWeekday(cursor)} · {formatLongDate(cursor)}</h2>
                  {appointmentsOn(state, cursor).length === 0 ? (
                    <p className="ad-empty">אין תורים ביום זה.</p>
                  ) : (
                    <ul className="ad-history">
                      {appointmentsOn(state, cursor).map((appointment) => (
                        <li key={appointment.id}>
                          <AppointmentButton
                            appointment={appointment}
                            customer={findCustomer(state, appointment.customerId)}
                            onOpen={openAppointment}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <>
                  <h2>שבוע {formatShortDate(weekDays[0])} – {formatShortDate(weekDays[6])}</h2>
                  <div className="ad-week">
                    {weekDays.map((iso) => {
                      const items = appointmentsOn(state, iso);
                      return (
                        <article key={iso}>
                          <h3>{formatWeekday(iso)} {formatShortDate(iso)}</h3>
                          {items.length === 0 ? <p className="ad-muted">אין תורים</p> : items.map((appointment) => (
                            <AppointmentButton
                              key={appointment.id}
                              compact
                              appointment={appointment}
                              customer={findCustomer(state, appointment.customerId)}
                              onOpen={(id) => { setCursor(iso); openAppointment(id); }}
                            />
                          ))}
                        </article>
                      );
                    })}
                  </div>
                </>
              )}
            </section>
          )}

          {view === "customers" && (
            <section className="ad-panel" aria-label="לקוחות">
              <h2>לקוחות</h2>
              <table className="ad-table">
                <thead>
                  <tr>
                    <th>לקוח</th>
                    <th>טלפון</th>
                    <th>ביקור אחרון</th>
                    <th>תור הבא</th>
                    <th>מספר ביקורים</th>
                    <th>סה״כ תשלומים</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => {
                    const details = describeCustomer(state, customer, today);
                    return (
                      <tr key={customer.id}>
                        <td data-label="לקוח">
                          <button type="button" className="ad-rowbtn ad-name" onClick={() => { setSelectedId(null); setCustomerId(customer.id); }}>
                            {customer.name}
                          </button>
                        </td>
                        <td data-label="טלפון">{customer.phone}</td>
                        <td data-label="ביקור אחרון">{details.last ? formatShortDate(details.last.date) : "—"}</td>
                        <td data-label="תור הבא">{details.next ? `${formatShortDate(details.next.date)} ${details.next.time}` : "—"}</td>
                        <td data-label="מספר ביקורים">{details.visits}</td>
                        <td data-label="סה״כ תשלומים">{formatMoney(details.totalPaid)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          )}

          <p className="ad-footnote">זהו דמו בלבד. לא נוצר תור אמיתי ולא נשלחים הודעות או בקשות תשלום.</p>
          <p className="ad-customize">המערכת, השירותים, הצבעים ותהליך ההזמנה מותאמים לעסק.</p>

          {selected && selectedCustomer && (
            <div className="ad-overlay" onClick={closeDrawer} onKeyDown={onKeyDown}>
              <aside
                className="ad-drawer"
                role="dialog"
                aria-modal="true"
                aria-labelledby="appointment-drawer-title"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="ad-drawer__head">
                  <h2 id="appointment-drawer-title" className="ad-name">{selectedCustomer.name}</h2>
                  <button type="button" className="ad-btn ad-btn--ghost" onClick={closeDrawer}>סגירה</button>
                </div>
                {selected.source === "booking" ? <p className="ad-chip ad-chip--block">חדש מהאתר</p> : null}
                <dl className="ad-meta">
                  <dt>לקוח</dt><dd className="ad-name">{selectedCustomer.name}</dd>
                  <dt>טלפון</dt><dd>{selectedCustomer.phone}</dd>
                  {!editing && (
                    <>
                      <dt>שירות</dt><dd>{getService(selected.serviceId).name}</dd>
                      <dt>תאריך</dt><dd>{formatLongDate(selected.date)}</dd>
                      <dt>שעה</dt><dd>{selected.time}</dd>
                      <dt>סטטוס תשלום</dt><dd><PaymentBadge status={selected.paymentStatus} /></dd>
                      <dt>הערות</dt><dd>{selected.notes || "—"}</dd>
                    </>
                  )}
                </dl>
                <label className="ad-field">
                  <span>שינוי סטטוס</span>
                  <select value={selected.status} onChange={(event) => changeStatus(event.target.value)}>
                    {STATUS_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                  </select>
                </label>

                {editing && draft && (
                  <form className="ad-form" onSubmit={saveEdit}>
                    <label className="ad-field">
                      <span>שירות</span>
                      <select value={draft.serviceId} onChange={(event) => setDraft({ ...draft, serviceId: event.target.value })}>
                        {SERVICES.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
                      </select>
                    </label>
                    <label className="ad-field">
                      <span>תאריך</span>
                      <input type="date" value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} required />
                    </label>
                    <label className="ad-field">
                      <span>שעה</span>
                      <select value={draft.time} onChange={(event) => setDraft({ ...draft, time: event.target.value })}>
                        {[...new Set([draft.time, ...ADMIN_TIMES])].map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                      </select>
                    </label>
                    <label className="ad-field">
                      <span>סטטוס תשלום</span>
                      <select value={draft.paymentStatus} onChange={(event) => setDraft({ ...draft, paymentStatus: event.target.value })}>
                        {PAYMENT_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                      </select>
                    </label>
                    <label className="ad-field">
                      <span>הערות</span>
                      <textarea value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} />
                    </label>
                    <div className="ad-actions">
                      <button type="submit" className="ad-btn ad-btn--primary">שמירת שינויים</button>
                      <button type="button" className="ad-btn ad-btn--ghost" onClick={() => setEditing(false)}>סגירה</button>
                    </div>
                  </form>
                )}

                {!editing && (
                  <div className="ad-actions">
                    <button type="button" className="ad-btn ad-btn--primary" onClick={startEdit}>עריכת תור</button>
                    <button type="button" className="ad-btn ad-btn--danger" onClick={() => setConfirmCancel(true)} disabled={selected.status === "cancelled"}>ביטול תור</button>
                  </div>
                )}

                {confirmCancel && selected.status !== "cancelled" && (
                  <div className="ad-confirm">
                    <p>לבטל את התור של {selectedCustomer.name}?</p>
                    <div className="ad-inline-actions">
                      <button type="button" className="ad-btn ad-btn--danger" onClick={cancelAppointment}>ביטול תור</button>
                      <button type="button" className="ad-btn ad-btn--ghost" onClick={() => setConfirmCancel(false)}>השארה</button>
                    </div>
                  </div>
                )}
              </aside>
            </div>
          )}

          {activeCustomer && customerDetails && (
            <div className="ad-overlay" onClick={closeDrawer} onKeyDown={onKeyDown}>
              <aside className="ad-drawer" role="dialog" aria-modal="true" aria-labelledby="customer-drawer-title" onClick={(event) => event.stopPropagation()}>
                <div className="ad-drawer__head">
                  <h2 id="customer-drawer-title" className="ad-name">{activeCustomer.name}</h2>
                  <button type="button" className="ad-btn ad-btn--ghost" onClick={closeDrawer}>סגירה</button>
                </div>
                <dl className="ad-meta">
                  <dt>טלפון</dt><dd>{activeCustomer.phone}</dd>
                  <dt>אימייל</dt><dd>{activeCustomer.email || "—"}</dd>
                  <dt>מספר ביקורים</dt><dd>{customerDetails.visits}</dd>
                  <dt>סה״כ תשלומים</dt><dd>{formatMoney(customerDetails.totalPaid)}</dd>
                </dl>
                <h3>היסטוריית תורים</h3>
                {customerDetails.history.length === 0 ? <p className="ad-empty">אין היסטוריה.</p> : (
                  <ul className="ad-history">
                    {customerDetails.history.map((appointment) => (
                      <li key={appointment.id}>
                        <button type="button" onClick={() => openAppointment(appointment.id)}>
                          <strong>{formatShortDate(appointment.date)} · {appointment.time}</strong>
                          <small>{getService(appointment.serviceId).name}</small>
                          <StatusBadge status={appointment.status} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </aside>
            </div>
          )}

          {creating && (
            <div className="ad-overlay ad-overlay--center" onClick={() => setCreating(false)} onKeyDown={onKeyDown}>
              <div className="ad-modal" role="dialog" aria-modal="true" aria-labelledby="create-title" onClick={(event) => event.stopPropagation()}>
                <div className="ad-drawer__head">
                  <h2 id="create-title">תור חדש</h2>
                  <button type="button" className="ad-btn ad-btn--ghost" onClick={() => setCreating(false)}>סגירה</button>
                </div>
                <p className="ad-note">התור יופיע מיד ביומן הקליניקה.</p>
                <form className="ad-form" noValidate onSubmit={submitCreate}>
                  <label className="ad-field">
                    <span>שם מלא</span>
                    <input value={form.name} autoComplete="off" aria-invalid={Boolean(formErrors.name)} onChange={(event) => updateForm("name", event.target.value)} />
                    {formErrors.name && <p className="ad-error" role="alert">{formErrors.name}</p>}
                  </label>
                  <label className="ad-field">
                    <span>טלפון</span>
                    <input inputMode="tel" autoComplete="off" value={form.phone} aria-invalid={Boolean(formErrors.phone)} onChange={(event) => updateForm("phone", formatIsraeliPhoneDisplay(event.target.value))} />
                    {formErrors.phone && <p className="ad-error" role="alert">{formErrors.phone}</p>}
                  </label>
                  <label className="ad-field">
                    <span>אימייל</span>
                    <input type="email" autoComplete="off" value={form.email} aria-invalid={Boolean(formErrors.email)} onChange={(event) => updateForm("email", event.target.value)} />
                    {formErrors.email && <p className="ad-error" role="alert">{formErrors.email}</p>}
                  </label>
                  <label className="ad-field">
                    <span>שירות</span>
                    <select value={form.serviceId} onChange={(event) => updateForm("serviceId", event.target.value)}>
                      {SERVICES.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
                    </select>
                  </label>
                  <label className="ad-field">
                    <span>תאריך</span>
                    <input type="date" value={form.date} aria-invalid={Boolean(formErrors.date)} onChange={(event) => updateForm("date", event.target.value)} />
                    {formErrors.date && <p className="ad-error" role="alert">{formErrors.date}</p>}
                  </label>
                  <label className="ad-field">
                    <span>שעה</span>
                    <select value={form.time} onChange={(event) => updateForm("time", event.target.value)}>
                      {ADMIN_TIMES.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                    </select>
                  </label>
                  <label className="ad-field">
                    <span>סטטוס</span>
                    <select value={form.status} onChange={(event) => updateForm("status", event.target.value)}>
                      {STATUS_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                    </select>
                  </label>
                  <label className="ad-field">
                    <span>סטטוס תשלום</span>
                    <select value={form.paymentStatus} onChange={(event) => updateForm("paymentStatus", event.target.value)}>
                      {PAYMENT_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                    </select>
                  </label>
                  <label className="ad-field">
                    <span>הערות</span>
                    <textarea value={form.notes} onChange={(event) => updateForm("notes", event.target.value)} />
                  </label>
                  <div className="ad-actions">
                    <button type="submit" className="ad-btn ad-btn--primary">שמירה ביומן</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </DemoFrame>
  );
}
