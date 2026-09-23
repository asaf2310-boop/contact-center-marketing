import { formatIsraeliPhoneDisplay, phoneDigitsOnly } from "@/lib/israeliValidators";

export const DEMO_STORAGE_KEY = "allincenter.appointmentsDemo.v1";

export const CLINIC = {
  name: "LIV Clinic",
  tagline: "קליניקה לטיפולי יופי ואסתטיקה",
};

export const SERVICES = [
  { id: "personal", name: "טיפול פנים בהתאמה אישית", duration: 60, price: 250 },
  { id: "consult", name: "פגישת ייעוץ קוסמטי", duration: 45, price: 180 },
  { id: "followup", name: "טיפול פנים קצר", duration: 30, price: 150 },
];

export const BOOKING_SLOTS = ["08:30", "09:30", "11:00", "16:00", "17:30", "18:30"];

export const ADMIN_TIMES = ["08:30", "09:30", "10:00", "11:00", "11:30", "13:00", "14:30", "16:00", "17:30", "18:30"];

export const STATUS_OPTIONS = [
  { id: "confirmed", label: "מאושר" },
  { id: "pending", label: "ממתין" },
  { id: "completed", label: "הושלם" },
  { id: "cancelled", label: "בוטל" },
];

export const PAYMENT_OPTIONS = [
  { id: "paid", label: "שולם" },
  { id: "pending", label: "ממתין לתשלום" },
  { id: "unpaid", label: "לא שולם" },
];

const WEEKDAYS = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

export function getService(serviceId) {
  return SERVICES.find((service) => service.id === serviceId) || SERVICES[0];
}

export function statusLabel(status) {
  return STATUS_OPTIONS.find((option) => option.id === status)?.label || status;
}

export function paymentLabel(status) {
  return PAYMENT_OPTIONS.find((option) => option.id === status)?.label || status;
}

export function formatMoney(amount) {
  return `₪${Math.round(Number(amount) || 0).toLocaleString("he-IL")}`;
}

export function formatDuration(minutes) {
  return `${minutes} דקות`;
}

export function toIso(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayIso(now = new Date()) {
  return toIso(now);
}

export function parseIso(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(iso, days) {
  const date = parseIso(iso);
  date.setDate(date.getDate() + days);
  return toIso(date);
}

export function startOfWeek(iso) {
  const date = parseIso(iso);
  date.setDate(date.getDate() - date.getDay());
  return toIso(date);
}

export function isPastDate(iso, now = new Date()) {
  return iso < todayIso(now);
}

export function formatLongDate(iso) {
  return new Intl.DateTimeFormat("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parseIso(iso));
}

export function formatShortDate(iso) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("he-IL", { day: "numeric", month: "short" }).format(parseIso(iso));
}

export function formatWeekday(iso) {
  return WEEKDAYS[parseIso(iso).getDay()];
}

export function formatMonthTitle(year, monthIndex) {
  return new Intl.DateTimeFormat("he-IL", { month: "long", year: "numeric" }).format(new Date(year, monthIndex, 1));
}

function slotMinutes(slot) {
  const [hours, minutes] = slot.split(":").map(Number);
  return hours * 60 + minutes;
}

export function bookingSlotsFor(dateIso, appointments, now = new Date()) {
  const day = parseIso(dateIso).getDay();
  if (day === 6) return { closed: true, slots: [] };

  let slots = [...BOOKING_SLOTS];
  if (day === 5) slots = ["08:30", "09:30", "11:00"];
  if (day === 1) slots = slots.filter((slot) => slot !== "18:30");
  if (day === 2) slots = slots.filter((slot) => slot !== "11:00");
  if (day === 3) slots = slots.filter((slot) => slot !== "09:30" && slot !== "18:30");
  if (day === 4) slots = slots.filter((slot) => slot !== "09:30");

  const taken = new Set(
    appointments
      .filter((appointment) => appointment.date === dateIso && appointment.status !== "cancelled")
      .map((appointment) => appointment.time),
  );
  slots = slots.filter((slot) => !taken.has(slot));

  if (dateIso === todayIso(now)) {
    const minutesNow = now.getHours() * 60 + now.getMinutes();
    slots = slots.filter((slot) => slotMinutes(slot) > minutesNow);
  }

  return { closed: false, slots };
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function appointment(id, customerId, serviceId, date, time, status, paymentStatus, notes) {
  return {
    id,
    customerId,
    serviceId,
    date,
    time,
    status,
    paymentStatus,
    notes,
    source: "seed",
    createdAt: 0,
  };
}

export function createSeed(now = new Date()) {
  const today = todayIso(now);
  const customers = [
    { id: "c1", name: "נועה כהן", phone: "050-100-1001", email: "noa@example.com" },
    { id: "c2", name: "יעל לוי", phone: "050-100-1002", email: "yael@example.com" },
    { id: "c3", name: "מיכל ישראלי", phone: "050-100-1003", email: "michal@example.com" },
    { id: "c4", name: "דנה אברהם", phone: "050-100-1004", email: "dana@example.com" },
    { id: "c5", name: "שירה רז", phone: "050-100-1005", email: "shira@example.com" },
    { id: "c6", name: "רוני אלון", phone: "050-100-1006", email: "roni@example.com" },
    { id: "c7", name: "ליאור חדד", phone: "050-100-1007", email: "lior@example.com" },
    { id: "c8", name: "מאיה ברק", phone: "050-100-1008", email: "maya@example.com" },
    { id: "c9", name: "עדי מזרחי", phone: "050-100-1009", email: "adi@example.com" },
    { id: "c10", name: "תמר גולן", phone: "050-100-1010", email: "tamar@example.com" },
    { id: "c11", name: "הילה נחום", phone: "050-100-1011", email: "hila@example.com" },
    { id: "c12", name: "אורי פרץ", phone: "050-100-1012", email: "ori@example.com" },
  ];

  const appointments = [
    appointment("a-past-1", "c1", "personal", addDays(today, -14), "10:00", "completed", "paid", "ביקור קודם בסדרה."),
    appointment("a-past-2", "c2", "consult", addDays(today, -8), "16:00", "completed", "paid", "פגישת היכרות."),
    appointment("a-past-3", "c3", "followup", addDays(today, -21), "09:30", "completed", "paid", "טיפול המשך ראשון."),
    appointment("a-past-4", "c4", "personal", addDays(today, -12), "11:00", "completed", "paid", ""),
    appointment("a-past-5", "c5", "personal", addDays(today, -30), "17:30", "completed", "paid", ""),
    appointment("a-past-6", "c6", "personal", addDays(today, -2), "08:30", "completed", "paid", "המשך טיפול."),
    appointment("a-past-7", "c10", "followup", addDays(today, -1), "10:00", "cancelled", "unpaid", "בוטל יום לפני המועד."),
    appointment("a-past-8", "c11", "consult", addDays(today, -9), "18:30", "completed", "paid", ""),
    appointment("a-today-1", "c1", "personal", today, "08:30", "completed", "paid", "הטיפול הסתיים."),
    appointment("a-today-2", "c7", "personal", today, "09:30", "completed", "paid", "לקוחה חדשה."),
    appointment("a-today-3", "c2", "consult", today, "10:00", "completed", "paid", ""),
    appointment("a-today-4", "c3", "followup", today, "11:30", "confirmed", "paid", "המשך סדרה."),
    appointment("a-today-5", "c9", "consult", today, "13:00", "confirmed", "paid", ""),
    appointment("a-today-6", "c8", "followup", today, "14:30", "confirmed", "paid", ""),
    appointment("a-today-7", "c4", "personal", today, "16:00", "pending", "paid", "ממתינה לאישור סופי."),
    appointment("a-today-8", "c5", "consult", today, "17:30", "pending", "unpaid", "ביקשה לאשר לפני ההגעה."),
    appointment("a-next-1", "c6", "personal", addDays(today, 1), "09:30", "confirmed", "pending", "המשך טיפול."),
    appointment("a-next-2", "c11", "consult", addDays(today, 2), "16:00", "confirmed", "unpaid", ""),
    appointment("a-next-3", "c12", "followup", addDays(today, 3), "11:00", "pending", "unpaid", "תור ראשון."),
    appointment("a-next-4", "c10", "personal", addDays(today, 4), "08:30", "confirmed", "paid", "נקבע מחדש אחרי ביטול."),
    appointment("a-next-5", "c2", "consult", addDays(today, 6), "17:30", "confirmed", "unpaid", ""),
  ];

  return { customers, appointments };
}

export function loadDemoState() {
  if (typeof window === "undefined") return createSeed();
  try {
    const raw = window.localStorage.getItem(DEMO_STORAGE_KEY);
    if (!raw) return persist(createSeed());
    const parsed = JSON.parse(raw);
    if (parsed?.version !== 1 || !Array.isArray(parsed.customers) || !Array.isArray(parsed.appointments)) {
      return persist(createSeed());
    }
    return { customers: parsed.customers, appointments: parsed.appointments };
  } catch {
    return createSeed();
  }
}

export function saveDemoState(state) {
  return persist(state);
}

export function resetDemoState() {
  return persist(createSeed());
}

function persist(state) {
  const next = {
    customers: state.customers,
    appointments: state.appointments,
  };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify({ version: 1, ...next }));
    } catch {
      /* The demo keeps working in memory when storage is blocked. */
    }
  }
  return next;
}

function matchCustomer(customers, phone) {
  const digits = phoneDigitsOnly(phone);
  return customers.find((customer) => phoneDigitsOnly(customer.phone) === digits) || null;
}

export function addOnlineBooking(state, input) {
  const phone = formatIsraeliPhoneDisplay(phoneDigitsOnly(input.phone));
  const customers = state.customers.map((customer) => ({ ...customer }));
  let customer = matchCustomer(customers, phone);
  if (customer) {
    customer.name = input.name.trim();
    customer.email = input.email.trim();
    customer.phone = phone;
  } else {
    customer = {
      id: uid("c"),
      name: input.name.trim(),
      phone,
      email: input.email.trim(),
    };
    customers.push(customer);
  }

  const appointment = {
    id: uid("a"),
    customerId: customer.id,
    serviceId: input.serviceId,
    date: input.date,
    time: input.time,
    status: "pending",
    paymentStatus: "unpaid",
    notes: "נקבע דרך ההזמנה אונליין.",
    source: "booking",
    createdAt: Date.now(),
  };

  return {
    ...state,
    customers,
    appointments: [...state.appointments, appointment],
  };
}

export function createManualAppointment(state, input) {
  const phone = formatIsraeliPhoneDisplay(phoneDigitsOnly(input.phone));
  const customers = state.customers.map((customer) => ({ ...customer }));
  let customer = matchCustomer(customers, phone);
  if (customer) {
    customer.name = input.name.trim();
    customer.phone = phone;
    if (input.email?.trim()) customer.email = input.email.trim();
  } else {
    customer = {
      id: uid("c"),
      name: input.name.trim(),
      phone,
      email: input.email?.trim() || "",
    };
    customers.push(customer);
  }

  const appointment = {
    id: uid("a"),
    customerId: customer.id,
    serviceId: input.serviceId,
    date: input.date,
    time: input.time,
    status: input.status || "confirmed",
    paymentStatus: input.paymentStatus || "pending",
    notes: input.notes?.trim() || "נוסף ידנית ממרכז הבקרה.",
    source: "manual",
    createdAt: Date.now(),
  };

  return {
    ...state,
    customers,
    appointments: [...state.appointments, appointment],
  };
}

export function patchAppointment(state, appointmentId, patch) {
  return {
    ...state,
    appointments: state.appointments.map((appointment) => (
      appointment.id === appointmentId ? { ...appointment, ...patch } : appointment
    )),
  };
}

export function todaySummary(state, now = new Date()) {
  const clock = now instanceof Date ? now : new Date();
  const iso = now instanceof Date ? todayIso(now) : String(now || todayIso());
  const minutesNow = clock.getHours() * 60 + clock.getMinutes();
  const todays = state.appointments.filter((appointment) => appointment.date === iso && appointment.status !== "cancelled");
  const revenue = todays
    .filter((appointment) => appointment.paymentStatus === "paid")
    .reduce((sum, appointment) => sum + getService(appointment.serviceId).price, 0);
  const remaining = todays.filter((appointment) => (
    appointment.status !== "completed" && slotMinutes(appointment.time) > minutesNow
  )).length;
  const completed = todays.filter((appointment) => appointment.status === "completed").length;

  return {
    appointments: todays.length,
    customers: state.customers.length,
    revenue,
    pending: todays.filter((appointment) => appointment.status === "pending").length,
    remaining,
    completed,
  };
}

export function nextUpcoming(state, now = new Date()) {
  const iso = todayIso(now);
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  return state.appointments
    .filter((appointment) => appointment.status !== "cancelled" && appointment.status !== "completed")
    .filter((appointment) => appointment.date > iso || (appointment.date === iso && slotMinutes(appointment.time) > minutesNow))
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))[0] || null;
}

export function isFreshOnlineBooking(appointment, now = Date.now()) {
  return appointment.source === "booking" && appointment.status !== "cancelled" && now - (appointment.createdAt || 0) < 1000 * 60 * 60 * 12;
}

export function describeCustomer(state, customer, iso = todayIso()) {
  const history = state.appointments
    .filter((appointment) => appointment.customerId === customer.id)
    .sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`));
  const active = history.filter((appointment) => appointment.status !== "cancelled");
  const visits = active.filter((appointment) => appointment.status === "completed" || appointment.date < iso).length;
  const totalPaid = active
    .filter((appointment) => appointment.paymentStatus === "paid")
    .reduce((sum, appointment) => sum + getService(appointment.serviceId).price, 0);
  const last = history.find((appointment) => (
    appointment.status !== "cancelled" && (appointment.date < iso || appointment.status === "completed")
  ));
  const next = active
    .filter((appointment) => appointment.date >= iso && appointment.status !== "completed")
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))[0] || null;

  return { history, visits, totalPaid, last, next };
}

export function findCustomer(state, customerId) {
  return state.customers.find((customer) => customer.id === customerId) || null;
}

export function onlineBookings(state) {
  return state.appointments
    .filter((appointment) => appointment.source === "booking" && appointment.status !== "cancelled")
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}
