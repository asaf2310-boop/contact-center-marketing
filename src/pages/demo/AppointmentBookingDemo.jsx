import React, { useState } from "react";
import { Link } from "react-router-dom";
import DemoFrame from "@/pages/demo/DemoFrame";
import useAppointmentDemo from "@/lib/useAppointmentDemo";
import { getEmailError, getIsraeliPhoneError, formatIsraeliPhoneDisplay } from "@/lib/israeliValidators";
import {
  SERVICES,
  addOnlineBooking,
  bookingSlotsFor,
  formatDuration,
  formatLongDate,
  formatMoney,
  formatMonthTitle,
  getService,
  isPastDate,
  todayIso,
  toIso,
} from "@/lib/appointmentDemoStore";

const STEPS = ["שירות", "תאריך", "שעה", "פרטים", "אישור"];
const WEEKDAY_LABELS = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];

function validateDetails(details) {
  const errors = {};
  const name = details.name.trim();
  if (name.length < 2) errors.name = "נא להזין שם מלא";
  else if (!/\s/.test(name)) errors.name = "נא להזין שם פרטי ושם משפחה";

  const phoneError = getIsraeliPhoneError(details.phone, { required: true });
  if (phoneError) errors.phone = phoneError;

  const emailError = getEmailError(details.email, { required: true });
  if (emailError) errors.email = emailError;
  return errors;
}

function MonthCalendar({ visibleMonth, selected, today, onSelect, onPrev, onNext, canPrev, canNext }) {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const lead = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: days }, (_, index) => index + 1),
  ];

  return (
    <div>
      <div className="ad-calendar-head">
        <button type="button" className="ad-btn ad-btn--ghost" onClick={onPrev} disabled={!canPrev}>חודש קודם</button>
        <strong>{formatMonthTitle(year, month)}</strong>
        <button type="button" className="ad-btn ad-btn--ghost" onClick={onNext} disabled={!canNext}>חודש הבא</button>
      </div>
      <div className="ad-weekdays" aria-hidden="true">
        {WEEKDAY_LABELS.map((label) => <span key={label}>{label}</span>)}
      </div>
      <div className="ad-month" role="group" aria-label="בחירת תאריך">
        {cells.map((day, index) => {
          if (!day) return <span key={`empty-${index}`} />;
          const iso = toIso(new Date(year, month, day));
          const past = isPastDate(iso);
          return (
            <button
              key={iso}
              type="button"
              className={`ad-day${selected === iso ? " is-selected" : ""}${iso === today ? " is-today" : ""}`}
              disabled={past}
              aria-pressed={selected === iso}
              aria-current={iso === today ? "date" : undefined}
              aria-label={formatLongDate(iso)}
              onClick={() => onSelect(iso)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AppointmentBookingDemo() {
  const [state, commit] = useAppointmentDemo();
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const today = todayIso();
  const service = serviceId ? getService(serviceId) : null;
  const maxMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 4, 1);
  const canPrev = visibleMonth > new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const canNext = visibleMonth < maxMonth;

  function restart() {
    setStep(1);
    setServiceId("");
    setDate("");
    setTime("");
    setDetails({ name: "", phone: "", email: "" });
    setErrors({});
    setFormError("");
    setConfirmation(null);
  }

  function goNext() {
    setFormError("");
    if (step === 1 && !serviceId) {
      setFormError("בחרו שירות כדי להמשיך.");
      return;
    }
    if (step === 2 && !date) {
      setFormError("בחרו תאריך כדי להמשיך.");
      return;
    }
    if (step === 3 && !time) {
      setFormError("בחרו שעה כדי להמשיך.");
      return;
    }
    setStep((current) => Math.min(current + 1, 4));
  }

  function selectDate(iso) {
    setDate(iso);
    setFormError("");
    if (!state) return;
    const availability = bookingSlotsFor(iso, state.appointments);
    if (time && !availability.slots.includes(time)) setTime("");
  }

  function updateDetail(key, value) {
    setDetails((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = validateDetails(details);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || !state) return;

    const availability = bookingSlotsFor(date, state.appointments);
    if (!availability.slots.includes(time)) {
      setTime("");
      setStep(3);
      setFormError("השעה כבר לא פנויה. בחרו שעה אחרת.");
      return;
    }

    const next = addOnlineBooking(state, {
      serviceId,
      date,
      time,
      name: details.name,
      phone: details.phone,
      email: details.email,
    });
    commit(next);
    setConfirmation({
      service: getService(serviceId),
      date,
      time,
      name: details.name.trim(),
    });
    setStep(5);
    setFormError("");
  }

  const availability = state && date ? bookingSlotsFor(date, state.appointments) : { closed: false, slots: [] };

  return (
    <DemoFrame
      title="דמו מערכת זימון תורים"
      extraNav={<Link className="ad-navlink" to="/demo/appointments/admin">צפייה בממשק הניהול</Link>}
    >
      {!state ? <p className="ad-loading">טוען את סביבת ההדגמה…</p> : (
        <div className="ad-booking">
          <ol className="ad-steps" aria-label="שלבי ההזמנה">
            {STEPS.map((label, index) => {
              const number = index + 1;
              const className = number === step ? "is-current" : number < step ? "is-done" : "";
              return (
                <li key={label} className={className} aria-current={number === step ? "step" : undefined}>
                  <span>{number}</span>
                  <small>{label}</small>
                  <i />
                </li>
              );
            })}
          </ol>

          <section className="ad-card" aria-live="polite">
            {step === 5 && confirmation ? (
              <>
                <h2>התור נקבע בהצלחה</h2>
                <p className="ad-lead">התור נוסף ליומן הדמו בדפדפן זה. אפשר לראות אותו בממשק הניהול.</p>
                <dl className="ad-success">
                  <div><dt>שירות</dt><dd>{confirmation.service.name}</dd></div>
                  <div><dt>תאריך</dt><dd>{formatLongDate(confirmation.date)}</dd></div>
                  <div><dt>שעה</dt><dd>{confirmation.time}</dd></div>
                  <div><dt>שם</dt><dd>{confirmation.name}</dd></div>
                </dl>
                <div className="ad-actions">
                  <button type="button" className="ad-btn ad-btn--ghost" onClick={restart}>חזרה לדמו</button>
                  <Link className="ad-btn ad-btn--primary" to="/demo/appointments/admin">מעבר לממשק הניהול</Link>
                </div>
              </>
            ) : (
              <>
                {step === 1 && (
                  <>
                    <h2>איזה שירות תרצו לקבוע?</h2>
                    <p className="ad-lead">קליניקה לדוגמה · בחרו שירות כדי לראות זמנים פנויים.</p>
                    <div className="ad-choice-grid" role="radiogroup" aria-label="בחירת שירות">
                      {SERVICES.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          role="radio"
                          aria-checked={serviceId === item.id}
                          className={`ad-choice${serviceId === item.id ? " is-selected" : ""}`}
                          onClick={() => { setServiceId(item.id); setFormError(""); }}
                        >
                          <strong>{item.name}</strong>
                          <span>{formatDuration(item.duration)}</span>
                          <b>{formatMoney(item.price)}</b>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2>בחרו תאריך</h2>
                    <p className="ad-lead">{service?.name} · אפשר לקבוע מהיום והלאה.</p>
                    <MonthCalendar
                      visibleMonth={visibleMonth}
                      selected={date}
                      today={today}
                      onSelect={selectDate}
                      canPrev={canPrev}
                      canNext={canNext}
                      onPrev={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))}
                      onNext={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))}
                    />
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2>בחרו שעה</h2>
                    <p className="ad-lead">{date ? formatLongDate(date) : ""}</p>
                    {availability.closed && <p className="ad-empty">הקליניקה סגורה בשבת. בחרו יום אחר.</p>}
                    {!availability.closed && availability.slots.length === 0 && (
                      <p className="ad-empty">אין שעות פנויות בתאריך הזה. בחרו יום אחר.</p>
                    )}
                    <div className="ad-time-grid" role="radiogroup" aria-label="בחירת שעה">
                      {availability.slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          role="radio"
                          aria-checked={time === slot}
                          className={`ad-time${time === slot ? " is-selected" : ""}`}
                          onClick={() => { setTime(slot); setFormError(""); }}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <h2>הפרטים שלכם</h2>
                    <p className="ad-note">זהו דמו בלבד – אין צורך להזין פרטים אמיתיים</p>
                    <form className="ad-form" noValidate onSubmit={submit}>
                      <label className="ad-field">
                        <span>שם מלא</span>
                        <input
                          name="demo-full-name"
                          autoComplete="off"
                          value={details.name}
                          aria-invalid={Boolean(errors.name)}
                          onChange={(event) => updateDetail("name", event.target.value)}
                        />
                        {errors.name && <p className="ad-error" role="alert">{errors.name}</p>}
                      </label>
                      <label className="ad-field">
                        <span>טלפון</span>
                        <input
                          name="demo-phone"
                          inputMode="tel"
                          autoComplete="off"
                          placeholder="050-100-2002"
                          value={details.phone}
                          aria-invalid={Boolean(errors.phone)}
                          onChange={(event) => updateDetail("phone", formatIsraeliPhoneDisplay(event.target.value))}
                        />
                        {errors.phone && <p className="ad-error" role="alert">{errors.phone}</p>}
                      </label>
                      <label className="ad-field">
                        <span>אימייל</span>
                        <input
                          name="demo-email"
                          type="email"
                          inputMode="email"
                          autoComplete="off"
                          placeholder="name@example.com"
                          spellCheck="false"
                          value={details.email}
                          aria-invalid={Boolean(errors.email)}
                          onChange={(event) => updateDetail("email", event.target.value)}
                        />
                        {errors.email && <p className="ad-error" role="alert">{errors.email}</p>}
                      </label>
                      <div className="ad-actions">
                        <button type="button" className="ad-btn ad-btn--ghost" onClick={() => { setFormError(""); setStep(3); }}>חזרה</button>
                        <button type="submit" className="ad-btn ad-btn--primary">קביעת התור</button>
                      </div>
                    </form>
                  </>
                )}

                {formError && <p className="ad-error" role="alert">{formError}</p>}

                {step < 4 && (
                  <div className="ad-actions">
                    {step > 1 && (
                      <button type="button" className="ad-btn ad-btn--ghost" onClick={() => { setFormError(""); setStep(step - 1); }}>חזרה</button>
                    )}
                    <button type="button" className="ad-btn ad-btn--primary" onClick={goNext}>המשך</button>
                  </div>
                )}
              </>
            )}
          </section>
          <p className="ad-footnote">סביבת הדגמה מקומית. לא נוצר תור אמיתי, ולא נשלחים דוא״ל, הודעות או בקשות תשלום.</p>
        </div>
      )}
    </DemoFrame>
  );
}
