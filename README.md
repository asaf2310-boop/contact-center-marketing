# אתר שיווקי — פתרונות דיגיטל לעסק

> ## 🚀 מתחילים? מדריך הקמה שלב-אחר-שלב
>
> **[SETUP-HE.md — GitHub → Supabase → Vercel → בדיקה ראשונה](SETUP-HE.md)**
>
> מיועד למשתמשי **GitHub Desktop** — בלי Node/npm מקומי. כל השלבים ממוספרים בעברית.

אתר נחיתה בעברית (RTL) המציג פתרונות ניהול מותאמים לעסק: תשלומים, לקוחות וחיסכון בזמן עבודה. כולל קישורים להדגמות חיות של שתי מערכות:



- **מוקד חכם** — ניהול הפסקות, שיבוצים וזמינות נציגים

- **Maya Clinic** — קביעת תורים, ניהול לקוחות ודוחות הכנסות



## הסכמים דיגיטליים — פרויקט נפרד

מודול ההסכמים (AllInCenter / Maya Clinic) הועבר לתיקייה **`Agreement/`** — פרויקט Vite עצמאי עם פריסה נפרדת ב-Vercel.  
ראו [Agreement/README.md](../Agreement/README.md).

---



## עבודה עם GitHub Desktop (בלי Node/npm מקומי)

**מדריך מלא:** [SETUP-HE.md](SETUP-HE.md)

**אין צורך להתקין Node או להריץ `npm install` / `npm run build` על המחשב.**  

הבנייה והפריסה מתבצעות בענן — ב-Vercel (פריסה) וב-GitHub Actions (בדיקת build).



### מה עורכים מקומית



1. פתחו את התיקייה `contact-center-marketing` ב-**GitHub Desktop** (או ב-Cursor).

2. ערכו קבצי קוד (`src/`, `api/`, וכו').

3. **אל תיצרו** קובץ `.env` מקומי — משתני הסביבה מוגדרים רק ב-Vercel (ראו למטה).



### commit ו-push ב-GitHub Desktop



1. בחלונית **Changes** — סמנו את הקבצים שברצונכם לכלול.

2. כתבו **Summary** (למשל: `עדכון טקסט הסכם`).

3. לחצו **Commit to main** (או לענף אחר).

4. לחצו **Push origin** כדי לשלוח ל-GitHub.



לאחר ה-push, Vercel מפריס אוטומטית גרסה חדשה (אם הפרויקט מחובר ל-repo).



### פריסה ב-Vercel (חיבור ל-GitHub)



הגדרה חד-פעמית:



1. [vercel.com](https://vercel.com) → **Add New Project** → בחרו את ה-repo `contact-center-marketing`.

2. Framework: **Vite** (מזוהה אוטומטית). Output: `dist` (מוגדר ב-`vercel.json`).

3. הוסיפו משתני סביבה (ראו [הגדרה ב-Vercel](#הגדרת-משתני-סביבה-ב-vercel)).

4. **Deploy**.



מעכשיו: כל **push** לענף המחובר (בדרך כלל `main`) מפעיל build ופריסה אוטומטית.  

סטטוס ה-build מופיע ב-Vercel Dashboard וב-GitHub (Checks), בלי להריץ כלום מקומית.



### בדיקת build ב-GitHub (ללא מחשב מקומי)



Workflow `.github/workflows/deploy-check.yml` מריץ `npm ci` + `npm run build` בענן על כל push ו-PR.  

אם ה-build נכשל, תראו ❌ ב-GitHub לפני שהשינוי מגיע לפרודקשן.



---



## הגדרת Supabase (ממשק אינטרנט — בלי CLI)



1. היכנסו ל-[supabase.com](https://supabase.com) → הפרויקט שלכם.

2. **SQL Editor** → **New query**.

3. פתחו בעריכה את `supabase/digital_agreements.sql`, העתיקו את כל התוכן והדביקו בעורך.

4. לחצו **Run**.

5. ב-**Project Settings → API** העתיקו:

   - **Project URL** → `VITE_SUPABASE_URL`

   - **anon public** → `VITE_SUPABASE_ANON_KEY`

   - **service_role** (סודי) → `SUPABASE_SERVICE_ROLE_KEY` ב-Vercel בלבד



---



## הגדרת משתני סביבה ב-Vercel



הגדירו ב-**Vercel → Project → Settings → Environment Variables**.  

העתיקו את הרשימה מ-`.env.example` — **אין צורך בקובץ `.env` מקומי**.



### אתר שיווקי (דמו וקשר)



| משתנה | תיאור |

|--------|--------|

| `VITE_CONTACT_CENTER_DEMO_URL` | קישור דמו מוקד חכם |

| `VITE_MAYACLINIC_DEMO_URL` | קישור דמו Maya Clinic |

| `VITE_CONTACT_URL` | mailto או טופס יצירת קשר |

| `VITE_PRODUCT_URL` | (אופציונלי) גיבוי לכתובת דמו המוקד |



### הסכמים דיגיטליים — AllInCenter



| משתנה | תיאור |

|--------|--------|

| `VITE_AGREEMENT_PROVIDER_NAME` | שם הספק על ההסכם |

| `VITE_AGREEMENT_PROVIDER_PHONE` | טלפון (ללא מקפים, לביט) |

| `VITE_AGREEMENT_PROVIDER_PHONE_DISPLAY` | טלפון לתצוגה |

| `VITE_AGREEMENT_PROVIDER_EMAIL` | אימייל הספק |

| `VITE_AGREEMENT_ADMIN_KEY` | מפתח כניסה לאזור אדמין (גם בדפדפן) |

| `AGREEMENT_ADMIN_KEY` | אותו ערך — ל-API בצד שרת |

| `AGREEMENT_ADMIN_EMAIL` | אימייל לקבלת עותקי הסכמים |

| `PUBLIC_APP_URL` | כתובת האתר בפרודקשן (לקישורי חתימה) |

| `VITE_BIT_PAYMENT_URL` | קישור ביט מלא (מומלץ) |

| `VITE_BIT_PHONE` | חלופה לבניית קישור ביט |



### Supabase ו-SMTP (שרת)



| משתנה | תיאור |

|--------|--------|

| `VITE_SUPABASE_URL` | כתובת פרויקט Supabase |

| `VITE_SUPABASE_ANON_KEY` | מפתח anon (ציבורי) |

| `SUPABASE_SERVICE_ROLE_KEY` | מפתח service role — **רק ב-Vercel**, לא בדפדפן |

| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | שליחת PDF במייל |



לאחר שינוי משתנים: **Redeploy** ב-Vercel (או push חדש).



---



## בדיקה אחרי פריסה



החליפו `your-app.vercel.app` בכתובת האמיתית מ-Vercel Dashboard.



| בדיקה | כתובת |

|--------|--------|

| דף נחיתה | `https://your-app.vercel.app/` |

| זרימת לקוח (ביט + חתימה) | `https://your-app.vercel.app/agreement` |

| אותה זרימה בעברית | `https://your-app.vercel.app/הסכם` |

| ניהול הסכמים (אדמין) | `https://your-app.vercel.app/admin/agreements` |

| יצירת הסכם | `https://your-app.vercel.app/admin/agreements/new` |



באזור האדמין — הזינו את `VITE_AGREEMENT_ADMIN_KEY` כשמתבקשים.



---



## מבנה טכני (למפתחים)



- **Frontend:** Vite + React (`npm run build` → `dist/`)

- **API:** תיקיית `api/` (פונקציות Vercel Serverless)

- **פריסה:** `vercel.json` — Framework Vite, rewrites ל-SPA



פיתוח מקומי (אופציונלי, דורש Node): `npm install` → `npm run dev`.  

למשתמשי GitHub Desktop זה **לא נדרש** לעבודה שוטפת.



---



## העלאה ראשונית ל-GitHub



אם ה-repo עדיין לא ב-GitHub:



```text

upload-marketing-to-github.cmd

```



או: **GitHub Desktop → File → Add Local Repository** → בחרו את התיקייה → **Publish repository**.


