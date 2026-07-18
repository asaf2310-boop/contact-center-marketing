# מדריך הקמה שלב-אחר-שלב — GitHub, Supabase ו-Vercel

מדריך זה מיועד למשתמשים שעובדים עם **GitHub Desktop** — **בלי** להתקין Node או להריץ `npm` על המחשב.  
הבנייה והפריסה מתבצעות בענן (GitHub Actions + Vercel).

**סדר מומלץ:** שלב 1 → שלב 2 → שלב 3 → שלב 4.

---

## שלב 1: GitHub — העלאת הקוד

### 1.1 הכנת התיקייה

1. ודאו שהפרויקט נמצא בנתיב: `C:\Users\asafar\Downloads\s\contact-center-marketing`
2. **אין צורך** להתקין Node.js או להריץ `npm install` על המחשב.

### 1.2 חיבור ל-GitHub Desktop

**אם ה-repo עדיין לא ב-GitHub:**

1. פתחו **GitHub Desktop**
2. **File → Add Local Repository**
3. בחרו את התיקייה `contact-center-marketing`
4. אם מופיעה הודעה שאין repo — לחצו **create a repository**
5. לחצו **Publish repository**
6. שם מומלץ: `contact-center-marketing`
7. בחרו **Private** או **Public** לפי הצורך
8. ודאו ש-**Keep this code on my hard drive** מסומן
9. לחצו **Publish Repository**

**אם כבר יש repo מקומי:**

1. **File → Add Local Repository** → בחרו את התיקייה
2. ודאו שהענף הוא `main` (בפינה העליונה)

### 1.3 מה לכלול ב-commit (מה לשלוח ל-GitHub)

**כן — לשלוח (לסמן ב-Changes):**

| קבוצה | דוגמאות |
|--------|---------|
| קוד האתר | `src/`, `api/`, `index.html`, `vite.config.js` |
| הגדרות פריסה | `vercel.json`, `package.json` |
| מסד נתונים | `supabase/digital_agreements.sql` |
| בדיקת build | `.github/workflows/deploy-check.yml` |
| תבנית משתני סביבה | `.env.example` (בלי סודות אמיתיים!) |
| תיעוד | `README.md`, `SETUP-HE.md` |

**לא — אסור לשלוח:**

| קובץ/תיקייה | למה |
|-------------|-----|
| `node_modules/` | תלויות — נבנות בענן |
| `dist/` | תוצאת build — נוצרת ב-Vercel |
| `.env` / `.env.local` | סודות (מפתחות, סיסמאות) |
| קבצי לוג (`*.log`) | לא רלוונטי |

> **טיפ:** GitHub Desktop מציג רק קבצים שלא ב-`.gitignore`. אם רואים `node_modules` — אל תסמנו אותם.

### 1.4 Commit ו-Push ל-main

1. בחלונית **Changes** — סמנו את כל הקבצים הרצויים
2. בשדה **Summary** כתבו תיאור קצר, למשל: `הקמת אתר שיווקי והסכמים דיגיטליים`
3. לחצו **Commit to main**
4. לחצו **Push origin** (או **Publish branch** בפעם הראשונה)
5. פתחו בדפדפן: `https://github.com/<שם-המשתמש>/contact-center-marketing` — ודאו שהקבצים מופיעים

### 1.5 GitHub Action — deploy-check (בדיקת build)

בכל **push** או **Pull Request** לענף `main`, GitHub מריץ אוטומטית workflow בשם **Build check**.

**מה הוא עושה:**

1. מוריד את הקוד מה-repo
2. מתקין Node.js 20 בענן
3. מריץ `npm ci` (התקנת חבילות)
4. מריץ `npm run build` (בניית האתר לתיקיית `dist`)

**למה זה חשוב:**

- אם יש שגיאה בקוד — תראו **❌** ב-GitHub לפני שהשינוי מגיע לפרודקשן
- **אין צורך** להריץ build על המחשב שלכם

**איפה לראות את הסטטוס:**

1. ב-GitHub: לשונית **Actions** → workflow **Build check**
2. ליד כל commit: סימן ✓ (הצליח) או ✗ (נכשל)

---

## שלב 2: Supabase — מסד נתונים להסכמים

### 2.1 יצירת פרויקט חינמי

1. היכנסו ל-[supabase.com](https://supabase.com) והתחברו (או הירשמו)
2. לחצו **New Project**
3. בחרו **Organization** (או צרו חדשה)
4. **Name:** למשל `contact-center-agreements`
5. **Database Password:** בחרו סיסמה חזקה — **שמרו אותה** (לגיבוי DB, לא נדרש ל-Vercel)
6. **Region:** בחרו האזור הקרוב (למשל Frankfurt)
7. לחצו **Create new project** — המתינו 1–2 דקות

### 2.2 הרצת סקריפט SQL (יצירת טבלת ההסכמים)

1. בפרויקט Supabase: בתפריט השמאלי לחצו **SQL Editor**
2. לחצו **+ New query**
3. במחשב: פתחו את הקובץ  
   `contact-center-marketing\supabase\digital_agreements.sql`  
   (ב-Cursor, Notepad, או GitHub Desktop → **Repository → Show in Explorer**)
4. **העתיקו את כל התוכן** של הקובץ (Ctrl+A → Ctrl+C)
5. **הדביקו** בעורך ה-SQL ב-Supabase (Ctrl+V)
6. לחצו **Run** (או Ctrl+Enter)
7. בתחתית המסך אמור להופיע **Success** / **Success. No rows returned**

**מה הסקריפט יוצר:**

- טבלה `digital_agreements` — שמירת הסכמים, חתימות וסטטוס
- אינדקסים לחיפוש מהיר
- Row Level Security — גישה רק דרך מפתח service role (בצד השרת)

### 2.3 איפה למצוא את המפתחות

1. ב-Supabase: **Project Settings** (גלגל שיניים בתחתית) → **API**
2. העתיקו את הערכים הבאים:

| שדה ב-Supabase | משתנה ב-Vercel | שימוש |
|----------------|----------------|-------|
| **Project URL** | `VITE_SUPABASE_URL` | כתובת הפרויקט — נשלחת לדפדפן |
| **anon public** | `VITE_SUPABASE_ANON_KEY` | מפתח ציבורי — מוטמע באתר (עם הגנות RLS) |
| **service_role** (לחצו Reveal) | `SUPABASE_SERVICE_ROLE_KEY` | מפתח סודי — **רק ב-Vercel**, ל-API בצד שרת |

### 2.4 מה כל מפתח עושה (במילים פשוטות)

| מפתח | איפה רץ | תפקיד |
|------|---------|--------|
| **Project URL** | דפדפן + שרת | כתובת הבסיס של Supabase |
| **anon key** | דפדפן (אופציונלי) | מזהה ציבורי; בפרויקט זה הגישה לטבלה מוגבלת ב-RLS |
| **service_role key** | **רק שרת Vercel** | גישה מלאה לשמירה/קריאה של הסכמים — **לעולם לא לשתף או לשים ב-GitHub** |

> שמרו את שלושת הערכים בקובץ טקסט זמני — תזדקקו להם בשלב 3.

---

## שלב 3: Vercel — פריסת האתר

### 3.1 ייבוא הפרויקט מ-GitHub

1. היכנסו ל-[vercel.com](https://vercel.com) (התחברות עם חשבון GitHub מומלצת)
2. לחצו **Add New… → Project**
3. מצאו את ה-repo `contact-center-marketing` → **Import**
4. אם לא מופיע — **Adjust GitHub App Permissions** ואשרו גישה ל-repo

### 3.2 הגדרות Framework (Vite)

במסך **Configure Project** ודאו:

| הגדרה | ערך |
|--------|-----|
| **Framework Preset** | Vite |
| **Root Directory** | `./` (ברירת מחדל) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

> הערכים כבר מוגדרים ב-`vercel.json` — בדרך כלל Vercel מזהה אוטומטית.

### 3.3 משתני סביבה — הוספה ב-Vercel

**לפני Deploy ראשון:** גללו ל-**Environment Variables** והוסיפו את כל המשתנים מהרשימה למטה.

**איפה:** Vercel → הפרויקט → **Settings → Environment Variables**  
**סביבה:** סמנו **Production** (ואופציונלית Preview) לכל משתנה.

#### אתר שיווקי (דמו וקשר)

| משתנה | ערך לדוגמה | הסבר |
|--------|------------|------|
| `VITE_CONTACT_CENTER_DEMO_URL` | `https://smart-break-shift-demo.vercel.app` | קישור לדמו **מוקד חכם** בדף הנחיתה |
| `VITE_MAYACLINIC_DEMO_URL` | `https://mayaclinic-demo.vercel.app` | קישור לדמו **Maya Clinic** |
| `VITE_CONTACT_URL` | `mailto:info@example.com?subject=בקשת הדגמה` | כפתור יצירת קשר (mailto או URL) |
| `VITE_PRODUCT_URL` | *(אופציונלי)* | גיבוי לכתובת דמו המוקד |

#### הסכמים דיגיטליים — פרטי ספק

| משתנה | ערך לדוגמה | הסבר |
|--------|------------|------|
| `VITE_AGREEMENT_PROVIDER_NAME` | `AllInCenter` | שם הספק על ההסכם |
| `VITE_AGREEMENT_PROVIDER_PHONE` | `0540000000` | טלפון לביט (בלי מקפים) |
| `VITE_AGREEMENT_PROVIDER_PHONE_DISPLAY` | `054-000-0000` | טלפון לתצוגה בהסכם |
| `VITE_AGREEMENT_PROVIDER_EMAIL` | `info@allincenter.co.il` | אימייל הספק על ההסכם |

#### הסכמים — אבטחה וקישורים

| משתנה | ערך לדוגמה | הסבר |
|--------|------------|------|
| `VITE_AGREEMENT_ADMIN_KEY` | מחרוזת סודית שתבחרו | מפתח כניסה לאזור אדמין **בדפדפן** |
| `AGREEMENT_ADMIN_KEY` | **אותו ערך בדיוק** | אותו מפתח — ל-**API בצד שרת** |
| `AGREEMENT_ADMIN_EMAIL` | `info@allincenter.co.il` | אימייל לקבלת עותקי הסכמים חתומים |
| `PUBLIC_APP_URL` | `https://your-app.vercel.app` | כתובת האתר בפרודקשן — לקישורי חתימה במייל |

> **חשוב:** `VITE_AGREEMENT_ADMIN_KEY` ו-`AGREEMENT_ADMIN_KEY` חייבים להיות **זהים**. בחרו מחרוזת ארוכה ואקראית (למשל 20+ תווים).

#### תשלום ביט

| משתנה | ערך לדוגמה | הסבר |
|--------|------------|------|
| `VITE_BIT_PAYMENT_URL` | `https://www.bitpay.co.il/app/pay?phone=972540000000&amount=250` | קישור ביט מלא — **מומלץ** |
| `VITE_BIT_PHONE` | `0540000000` | חלופה: בניית קישור ביט אוטומטית מהטלפון |

#### Supabase (מהשלב 2)

| משתנה | מקור | הסבר |
|--------|------|------|
| `VITE_SUPABASE_URL` | Supabase → Settings → API → Project URL | כתובת הפרויקט |
| `VITE_SUPABASE_ANON_KEY` | Supabase → anon public | מפתח ציבורי |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → service_role | מפתח סודי — **רק Vercel, לא בדפדפן** |

#### SMTP — שליחת PDF במייל

| משתנה | ערך לדוגמה | הסבר |
|--------|------------|------|
| `SMTP_HOST` | `smtp.gmail.com` | שרת דואר |
| `SMTP_PORT` | `587` | פורט (TLS) |
| `SMTP_USER` | `your-email@gmail.com` | שם משתמש SMTP |
| `SMTP_PASS` | סיסמת אפליקציה | סיסמה (ב-Gmail: App Password) |
| `SMTP_FROM` | `AllInCenter <info@allincenter.co.il>` | שם וכתובת השולח |

> **Gmail:** צרו [App Password](https://myaccount.google.com/apppasswords) — לא את סיסמת ההתחברות הרגילה.

### 3.4 מה הולך ל-Vercel ומה לא נדרש מקומית

| מיקום | מה |
|--------|-----|
| **Vercel בלבד** | כל המשתנים למעלה |
| **המחשב שלכם** | **כלום** — אין ליצור קובץ `.env` מקומי |
| **GitHub** | רק `.env.example` (תבנית בלי סודות) — **לא** `.env` אמיתי |

**משתנים שלא חובה (אופציונלי):**

- `VITE_PUBLIC_APP_URL` — חלופה ל-`PUBLIC_APP_URL`
- `VITE_BIT_QR_IMAGE` — תמונת QR סטטית
- `VITE_DEMO_MODE=true` — מצב דמו בלי DB (לפיתוח בלבד)

### 3.5 Deploy ו-Redeploy

**פריסה ראשונה:**

1. אחרי הוספת משתני הסביבה → לחצו **Deploy**
2. המתינו 1–3 דקות
3. בסיום: **Visit** או העתיקו את הכתובת (למשל `https://contact-center-marketing.vercel.app`)

**אחרי שינוי משתני סביבה:**

1. **Settings → Environment Variables** — ערכו/הוסיפו
2. לשונית **Deployments** → שלוש נקודות ליד הפריסה האחרונה → **Redeploy**
3. או: בצעו **push** חדש מ-GitHub Desktop — Vercel יפרוס מחדש אוטומטית

**עדכון `PUBLIC_APP_URL`:** אחרי ה-Deploy הראשון, החליפו את `your-app.vercel.app` בכתובת האמיתית מ-Vercel ועשו Redeploy.

---

## שלב 4: בדיקה ראשונה

החליפו `your-app.vercel.app` בכתובת האמיתית מ-**Vercel Dashboard**.

### 4.1 כתובות לפתיחה

| מה לבדוק | כתובת |
|----------|--------|
| דף נחיתה | `https://your-app.vercel.app/` |
| זרימת לקוח (ביט + חתימה) | `https://your-app.vercel.app/agreement` |
| אותה זרימה בעברית | `https://your-app.vercel.app/הסכם` |
| ניהול הסכמים (אדמין) | `https://your-app.vercel.app/admin/agreements` |
| יצירת הסכם חדש | `https://your-app.vercel.app/admin/agreements/new` |

### 4.2 כניסה לאזור אדמין

1. פתחו `https://your-app.vercel.app/admin/agreements`
2. יופיע מסך **כניסת מנהל**
3. הזינו את הערך שהגדרתם ב-`VITE_AGREEMENT_ADMIN_KEY` (ב-Vercel)
4. לחצו **כניסה**
5. אם הכניסה נכשלת — ודאו ש-`VITE_AGREEMENT_ADMIN_KEY` ו-`AGREEMENT_ADMIN_KEY` **זהים** ב-Vercel, ועשו **Redeploy**

### 4.3 יצירת הסכם בדיקה (מנהל)

1. אחרי הכניסה → **הסכם חדש** (או גשו ל-`/admin/agreements/new`)
2. מלאו לפחות **שם העסק** (שדה חובה)
3. בדקו את התמחור: ₪200 הקמה + ₪50 תחזוקה = ₪250
4. לחצו **שמירה** — תועברו לעריכת ההסכם
5. (אופציונלי) לחצו **שליחה ללקוח** — נשלח מייל עם קישור חתימה (דורש SMTP תקין)

### 4.4 בדיקת זרימת לקוח (ביט + חתימה)

1. פתחו `https://your-app.vercel.app/agreement`
2. מלאו פרטי עסק ואיש קשר
3. אשרו תנאים
4. שלב תשלום ביט — אמור להופיע קישור (אם הגדרתם `VITE_BIT_PAYMENT_URL` או `VITE_BIT_PHONE`)
5. חתמו (ציור או הקלדה) ושלחו
6. בדקו ב-`/admin/agreements` שההסכם מופיע עם סטטוס **חתום**

### 4.5 אם משהו לא עובד

| בעיה | מה לבדוק |
|------|-----------|
| דף ריק / שגיאה | Vercel → Deployments → לוג ה-build |
| ❌ ב-GitHub Actions | לשונית Actions → פרטי השגיאה ב-build |
| אדמין לא נכנס | `VITE_AGREEMENT_ADMIN_KEY` = `AGREEMENT_ADMIN_KEY` + Redeploy |
| הסכמים לא נשמרים | Supabase: SQL הורץ? `VITE_SUPABASE_*` ו-`SUPABASE_SERVICE_ROLE_KEY` ב-Vercel? |
| מייל לא נשלח | `SMTP_*` — ב-Gmail צריך App Password |
| קישור ביט לא עובד | `VITE_BIT_PAYMENT_URL` או `VITE_BIT_PHONE` |

---

## סיכום זרימת עבודה שוטפת

1. **עריכה** — קבצים ב-`src/` / `api/` (GitHub Desktop או Cursor)
2. **Commit + Push** — GitHub Desktop → `main`
3. **בדיקה אוטומטית** — GitHub Action **Build check** (✓ או ✗)
4. **פריסה** — Vercel מפריס אוטומטית אחרי push
5. **בדיקה ידנית** — פתחו את כתובת Vercel

**אין צורך** ב-`npm install`, `npm run build` או קובץ `.env` על המחשב.

---

[← חזרה ל-README](README.md)
