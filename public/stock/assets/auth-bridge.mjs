// Stock — public authentication bridge for e-mail links (www.allincenter.co.il/stock/auth/).
// Pure logic (unit-tested) + a small DOM controller. No dependencies, no external scripts.
//
// Security properties
//  • Input comes ONLY from the URL fragment (#…), which browsers never send to servers → no token in any access log.
//  • The fragment is removed from the address bar/history immediately after it is read.
//  • Accepted inputs: a one-time Supabase token_hash of an allowed type, a Supabase error, or a Stock invitation id.
//    Anything else → "invalid link". There is NO redirect parameter → no open redirect; destinations are fixed.
//  • Link scanners: e-mail security scanners and previewers may open links automatically. The one-time token is
//    exchanged ONLY after a deliberate user action (the Confirm button, or submitting the new password), never on page
//    load, so a scanner that fetches or even renders the page cannot consume it (Supabase "email prefetching" guidance).
//  • token_hash is single-use and short-lived on the server (Supabase /verify); the session it yields is held in memory
//    only and signed out right after the confirmation / password change. Nothing is written to storage or logged.
//  • Works without the app: confirmation and password reset complete in the browser; "Open the Stock app" is optional
//    and, if the app does not open within a moment, the page says so and points to the website.
//  • Flows: sign-up confirmation (optionally carrying the Stock invitation id it was started from), password recovery,
//    e-mail change (both halves of a secure change), and Stock invitation links. Other Supabase link types (magic link,
//    admin invite) are not used by Stock and are rejected.

export const CONFIG = Object.freeze({
  supabaseUrl: 'https://oymozbalhgzhqletveuq.supabase.co',
  // publishable (anon) key — public by design; never a service-role key
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95bW96YmFsaGd6aHFsZXR2ZXVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0MzkxOTgsImV4cCI6MjEwOTAxNTE5OH0.hajOArjF5XsFKbbM6p_WDfc1SnZfXnCgDSkeMSnX6Ms',
  appScheme: 'il.co.allincenter.stock',           // release app's custom URL scheme
  website: 'https://stock.allincenter.co.il/',     // fixed; never taken from the URL
});

const VERIFY_TYPES = new Set(['signup', 'recovery', 'email_change']);
const TOKEN_HASH = /^(pkce_)?[A-Za-z0-9_-]{20,128}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ERROR_CODES = new Set(['otp_expired', 'access_denied', 'otp_disabled', 'flow_state_expired', 'flow_state_not_found', 'bad_code_verifier', 'validation_failed']);

/** Classifies the fragment. Never returns anything taken verbatim from the URL except validated values. */
export function parseFragment(hash) {
  const raw = String(hash ?? '').replace(/^#/, '');
  if (!raw || raw.length > 2048 || /[\u0000-\u001f]/.test(raw)) return { kind: 'invalid' };
  const p = new URLSearchParams(raw);
  const keys = [...p.keys()];
  if (keys.some((k, i) => keys.indexOf(k) !== i)) return { kind: 'invalid' }; // duplicated parameters
  if (p.has('error') || p.has('error_code')) {
    const code = p.get('error_code') ?? '';
    return { kind: 'error', code: ERROR_CODES.has(code) ? code : 'unknown' };
  }
  const invite = p.get('invite');
  if (invite !== null && !UUID.test(invite)) return { kind: 'invalid' };
  if (keys.length === 1 && invite !== null) return { kind: 'invite', token: invite.toLowerCase() };
  const tokenHash = p.get('token_hash') ?? ''; const type = p.get('type') ?? '';
  if (!VERIFY_TYPES.has(type) || !TOKEN_HASH.test(tokenHash)) return { kind: 'invalid' };
  // a sign-up confirmation may carry the invitation it was started from; nothing else may carry extra parameters
  if (keys.length === 2 && invite === null) return { kind: 'verify', type, tokenHash };
  if (keys.length === 3 && invite !== null && type === 'signup') return { kind: 'verify', type, tokenHash, invite: invite.toLowerCase() };
  return { kind: 'invalid' };
}

/** Deep link into the installed app for a FIXED set of routes only. */
export function appLink(route) {
  if (route === 'login') return `${CONFIG.appScheme}://open#/login`;
  if (route?.invite && UUID.test(route.invite)) return `${CONFIG.appScheme}://open#/invite/${route.invite.toLowerCase()}`;
  throw new Error('route not allowed');
}
export const websiteLink = (route) => route?.invite && UUID.test(route.invite)
  ? `${CONFIG.website}#/invite/${route.invite.toLowerCase()}` : `${CONFIG.website}#/login`;

/** Maps Supabase auth errors to message keys (no server text is ever shown). */
export function errorMessageKey(code, reasons) {
  if (Array.isArray(reasons) && reasons.includes('pwned')) return 'pwned';
  return ({ otp_expired: 'expired', flow_state_expired: 'expired', access_denied: 'expired', weak_password: 'weak',
    // the in-memory recovery session ran out (page left open too long) → same advice as an expired link
    bad_jwt: 'expired', session_not_found: 'expired', session_expired: 'expired', reauthentication_needed: 'expired',
    same_password: 'same', over_request_rate_limit: 'rate', validation_failed: 'invalid' })[code] ?? 'generic';
}

export function pickLang(navLangs, stored) {
  if (['he', 'en', 'ar'].includes(stored)) return stored;
  for (const l of navLangs ?? []) { const b = String(l).toLowerCase().slice(0, 2); if (b === 'he' || b === 'iw') return 'he'; if (b === 'ar') return 'ar'; if (b === 'en') return 'en'; }
  return 'he';
}

export const TEXT = {
  he: { dir: 'rtl', confirmPrompt: 'כדי לאשר את כתובת האימייל, לחצו על הכפתור.', confirmBtn: 'אישור כתובת האימייל', changePrompt: 'כדי לאשר את שינוי כתובת האימייל, לחצו על הכפתור.', changeBtn: 'אישור השינוי', resetPrompt: 'בחרו סיסמה חדשה לחשבון Stock.', title: 'Stock — אישור חשבון', working: 'רגע, בודקים את הקישור…', confirmed: 'כתובת האימייל אומתה.', confirmedHint: 'אפשר להיכנס עכשיו לאפליקציה או לאתר עם האימייל והסיסמה.',
    resetTitle: 'בחירת סיסמה חדשה', newPw: 'סיסמה חדשה', newPw2: 'אימות הסיסמה', save: 'שמירת הסיסמה', mismatch: 'הסיסמאות אינן זהות.', short: 'הסיסמה צריכה לכלול לפחות 8 תווים.',
    resetDone: 'הסיסמה עודכנה.', resetDoneHint: 'היכנסו לאפליקציה או לאתר עם הסיסמה החדשה.', confirmedInviteHint: 'עכשיו אפשר לפתוח את ההזמנה ולהיכנס עם האימייל והסיסמה שבחרתם.', changeHalf: 'האישור התקבל.', changeHalfHint: 'כדי להשלים את שינוי האימייל, פתחו גם את הקישור שנשלח לכתובת השנייה.', changed: 'כתובת האימייל עודכנה.', changedHint: 'מעכשיו נכנסים עם הכתובת החדשה.',
    appNotOpened: 'נראה שהאפליקציה לא נפתחה. אם היא לא מותקנת במכשיר הזה, המשיכו באתר או התקינו את Stock ונסו שוב.', invite: 'הוזמנתם להצטרף לעסק ב-Stock.', inviteHint: 'פתחו את ההזמנה באפליקציה והיכנסו עם כתובת האימייל שאליה נשלחה.',
    openApp: 'פתיחה באפליקציית Stock', openWeb: 'המשך באתר', noApp: 'האפליקציה לא נפתחה? ודאו שהיא מותקנת, או המשיכו באתר.',
    invalid: 'הקישור אינו תקין.', expired: 'הקישור פג תוקף או שכבר נעשה בו שימוש. בקשו קישור חדש מהאפליקציה.', weak: 'הסיסמה חלשה מדי. בחרו סיסמה ארוכה ומגוונת יותר.',
    pwned: 'הסיסמה הזו הופיעה בדליפת מידע ידועה. בחרו סיסמה אחרת.', same: 'הסיסמה החדשה זהה לקודמת.', rate: 'יותר מדי ניסיונות. נסו שוב בעוד כמה דקות.', generic: 'משהו השתבש. נסו שוב או בקשו קישור חדש.' },
  en: { dir: 'ltr', confirmPrompt: 'To confirm your e-mail address, press the button.', confirmBtn: 'Confirm e-mail address', changePrompt: 'To confirm the change of your e-mail address, press the button.', changeBtn: 'Confirm the change', resetPrompt: 'Choose a new password for your Stock account.', title: 'Stock — account', working: 'One moment, checking the link…', confirmed: 'Your e-mail address is confirmed.', confirmedHint: 'You can now sign in in the app or on the website with your e-mail and password.',
    resetTitle: 'Choose a new password', newPw: 'New password', newPw2: 'Confirm the password', save: 'Save password', mismatch: 'The passwords do not match.', short: 'The password needs at least 8 characters.',
    resetDone: 'Your password was changed.', resetDoneHint: 'Sign in to the app or the website with the new password.', confirmedInviteHint: 'You can now open the invitation and sign in with the e-mail and password you chose.', changeHalf: 'Confirmation received.', changeHalfHint: 'To finish changing your e-mail, also open the link sent to your other address.', changed: 'Your e-mail address was changed.', changedHint: 'From now on, sign in with the new address.',
    appNotOpened: 'The app does not seem to have opened. If it is not installed on this device, continue on the website, or install Stock and try again.', invite: 'You were invited to join a business on Stock.', inviteHint: 'Open the invitation in the app and sign in with the e-mail address it was sent to.',
    openApp: 'Open in the Stock app', openWeb: 'Continue on the website', noApp: 'The app did not open? Make sure it is installed, or continue on the website.',
    invalid: 'This link is not valid.', expired: 'This link has expired or was already used. Request a new one in the app.', weak: 'This password is too weak. Choose a longer, more varied one.',
    pwned: 'This password appeared in a known data breach. Choose a different one.', same: 'The new password is the same as the old one.', rate: 'Too many attempts. Try again in a few minutes.', generic: 'Something went wrong. Try again or request a new link.' },
  ar: { dir: 'rtl', confirmPrompt: 'لتأكيد بريدك الإلكتروني، اضغط الزر.', confirmBtn: 'تأكيد البريد الإلكتروني', changePrompt: 'لتأكيد تغيير بريدك الإلكتروني، اضغط الزر.', changeBtn: 'تأكيد التغيير', resetPrompt: 'اختر كلمة مرور جديدة لحساب Stock.', title: 'Stock — الحساب', working: 'لحظة، نتحقق من الرابط…', confirmed: 'تم تأكيد بريدك الإلكتروني.', confirmedHint: 'يمكنك الآن تسجيل الدخول في التطبيق أو الموقع بالبريد وكلمة المرور.',
    resetTitle: 'اختيار كلمة مرور جديدة', newPw: 'كلمة المرور الجديدة', newPw2: 'تأكيد كلمة المرور', save: 'حفظ كلمة المرور', mismatch: 'كلمتا المرور غير متطابقتين.', short: 'يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل.',
    resetDone: 'تم تغيير كلمة المرور.', resetDoneHint: 'سجّل الدخول إلى التطبيق أو الموقع بكلمة المرور الجديدة.', confirmedInviteHint: 'يمكنك الآن فتح الدعوة وتسجيل الدخول بالبريد وكلمة المرور اللذين اخترتهما.', changeHalf: 'تم استلام التأكيد.', changeHalfHint: 'لإكمال تغيير البريد، افتح أيضًا الرابط المرسل إلى عنوانك الآخر.', changed: 'تم تغيير بريدك الإلكتروني.', changedHint: 'من الآن سجّل الدخول بالعنوان الجديد.',
    appNotOpened: 'يبدو أن التطبيق لم يُفتح. إذا لم يكن مثبتًا على هذا الجهاز، تابع في الموقع أو ثبّت Stock وحاول مجددًا.', invite: 'تمت دعوتك للانضمام إلى مصلحة على Stock.', inviteHint: 'افتح الدعوة في التطبيق وسجّل الدخول بالبريد الذي أُرسلت إليه.',
    openApp: 'فتح في تطبيق Stock', openWeb: 'المتابعة في الموقع', noApp: 'لم يُفتح التطبيق؟ تأكد من تثبيته أو تابع في الموقع.',
    invalid: 'هذا الرابط غير صالح.', expired: 'انتهت صلاحية الرابط أو تم استخدامه. اطلب رابطًا جديدًا من التطبيق.', weak: 'كلمة المرور ضعيفة جدًا. اختر كلمة أطول وأكثر تنوعًا.',
    pwned: 'ظهرت كلمة المرور هذه في تسريب بيانات معروف. اختر كلمة أخرى.', same: 'كلمة المرور الجديدة مطابقة للقديمة.', rate: 'محاولات كثيرة جدًا. حاول بعد بضع دقائق.', generic: 'حدث خطأ. حاول مجددًا أو اطلب رابطًا جديدًا.' },
};

// ------------------------------------------------------------------ browser controller
async function call(path, { method = 'POST', body, token } = {}) {
  const r = await fetch(`${CONFIG.supabaseUrl}/auth/v1/${path}`, { method, credentials: 'omit', referrerPolicy: 'no-referrer',
    headers: { apikey: CONFIG.anonKey, 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body) });
  const d = await r.json().catch(() => ({}));
  if (r.ok) return { ok: true, data: d };
  const code = typeof d.error_code === 'string' ? d.error_code : (r.status === 401 || r.status === 403) ? 'bad_jwt' : '';
  return { ok: false, code, reasons: d.weak_password?.reasons };
}
const signOut = (token) => call('logout?scope=local', { token }).catch(() => {});

export function start(doc = document, win = window) {
  const input = parseFragment(win.location.hash);
  win.history.replaceState(null, '', win.location.pathname); // drop the token from the address bar and history
  let stored; try { stored = win.localStorage.getItem('stock.locale.explicit'); } catch { /* blocked */ }
  let lang = pickLang(win.navigator.languages, stored);
  const $ = (id) => doc.getElementById(id);
  let view = { name: 'working' };
  const actions = (route) => {
    const box = $('actions'); box.replaceChildren();
    const a = doc.createElement('a'); a.className = 'btn btn-primary'; a.href = appLink(route); a.textContent = TEXT[lang].openApp; a.id = 'open-app';
    const w = doc.createElement('a'); w.className = 'btn'; w.href = websiteLink(route); w.textContent = TEXT[lang].openWeb; w.rel = 'noopener'; w.id = 'open-web';
    const n = doc.createElement('p'); n.className = 'muted small'; n.id = 'no-app'; n.textContent = TEXT[lang].noApp;
    // If the app is not installed the custom-scheme link does nothing (or iOS shows an error); the page stays visible.
    a.addEventListener('click', () => {
      let left = false; const away = () => { left = true; };
      doc.addEventListener('visibilitychange', away, { once: true }); win.addEventListener('pagehide', away, { once: true }); win.addEventListener('blur', away, { once: true });
      win.setTimeout(() => { if (!left && !doc.hidden) { n.textContent = TEXT[lang].appNotOpened; n.className = 'notice'; } }, 1800);
    });
    box.append(a, w, n);
  };
  const render = () => {
    const T = TEXT[lang];
    doc.documentElement.lang = lang; doc.documentElement.dir = T.dir; doc.title = T.title;
    for (const b of doc.querySelectorAll('[data-lang]')) b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    $('form').hidden = view.name !== 'reset'; $('actions').replaceChildren();
    const go = $('go'); go.hidden = view.name !== 'confirm'; go.disabled = false;
    if (view.name === 'confirm') { go.textContent = view.type === 'email_change' ? T.changeBtn : T.confirmBtn; }
    const msg = $('message'); const hint = $('hint'); msg.className = ''; hint.textContent = '';
    if (view.name === 'working') msg.textContent = T.working;
    if (view.name === 'confirm') msg.textContent = view.type === 'email_change' ? T.changePrompt : T.confirmPrompt;
    if (view.name === 'error') { msg.textContent = T[view.key]; msg.className = 'error'; }
    if (view.name === 'confirmed') { msg.textContent = T.confirmed; hint.textContent = view.invite ? T.confirmedInviteHint : T.confirmedHint; actions(view.invite ? { invite: view.invite } : 'login'); }
    if (view.name === 'changeHalf') { msg.textContent = T.changeHalf; hint.textContent = T.changeHalfHint; }
    if (view.name === 'changed') { msg.textContent = T.changed; hint.textContent = T.changedHint; actions('login'); }
    if (view.name === 'done') { msg.textContent = T.resetDone; hint.textContent = T.resetDoneHint; actions('login'); }
    if (view.name === 'invite') { msg.textContent = T.invite; hint.textContent = T.inviteHint; actions({ invite: view.token }); }
    if (view.name === 'reset') {
      msg.textContent = T.resetTitle; hint.textContent = T.resetPrompt; $('pw-label').textContent = T.newPw; $('pw2-label').textContent = T.newPw2; $('save').textContent = T.save;
      if (view.err) { hint.textContent = T[view.err]; hint.className = 'error'; } else hint.className = 'muted';
      $('save').disabled = false;
    }
  };
  const show = (v) => { view = v; render(); };
  for (const b of doc.querySelectorAll('[data-lang]')) b.addEventListener('click', () => { lang = b.dataset.lang; render(); });

  let session = null; // memory only
  let used = false;   // the one-time token is sent at most once per page load
  const exchange = async () => {
    if (used) return { ok: false, code: 'otp_expired' };
    used = true;
    return call('verify', { body: { type: input.type, token_hash: input.tokenHash } });
  };
  $('go').addEventListener('click', async () => {
    if (view.name !== 'confirm' || $('go').disabled) return;
    $('go').disabled = true; show({ name: 'working' });
    const r = await exchange();
    if (!r.ok) return show({ name: 'error', key: errorMessageKey(r.code) });
    // secure e-mail change: the first of the two links is accepted without a session
    if (input.type === 'email_change' && !r.data?.access_token) return show({ name: 'changeHalf' });
    if (!r.data?.access_token) return show({ name: 'error', key: 'generic' });
    await signOut(r.data.access_token);
    show(input.type === 'email_change' ? { name: 'changed' } : { name: 'confirmed', invite: input.invite });
  });
  $('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const pw = $('pw').value; const pw2 = $('pw2').value;
    if (pw.length < 8) return show({ name: 'reset', err: 'short' });
    if (pw !== pw2) return show({ name: 'reset', err: 'mismatch' });
    if ($('save').disabled) return;
    $('save').disabled = true;
    if (!session) { // password reset: the link is verified only now, when the user submits the new password
      const v = await exchange();
      if (!v.ok || !v.data?.access_token) { $('pw').value = ''; $('pw2').value = ''; return show({ name: 'error', key: v.ok ? 'generic' : errorMessageKey(v.code) }); }
      session = v.data.access_token;
    }
    const r = await call('user', { method: 'PUT', body: { password: pw }, token: session });
    $('save').disabled = false;
    if (!r.ok) {
      const key = errorMessageKey(r.code, r.reasons);
      if (key === 'expired') { session = null; return show({ name: 'error', key }); } // the link's session is gone
      return show({ name: 'reset', err: key });
    }
    $('pw').value = ''; $('pw2').value = '';
    await signOut(session); session = null; show({ name: 'done' });
  });

  render();
  if (input.kind === 'invalid') return show({ name: 'error', key: 'invalid' });
  if (input.kind === 'error') return show({ name: 'error', key: errorMessageKey(input.code) });
  if (input.kind === 'invite') return show({ name: 'invite', token: input.token });
  // Nothing is sent to the server on page load: link scanners that open the page cannot consume the token.
  return show(input.type === 'recovery' ? { name: 'reset' } : { name: 'confirm', type: input.type });
}
