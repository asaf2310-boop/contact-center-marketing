# Monthly GEO measurement process — AllInCenter

Process for measuring how AI search engines mention, link, and describe AllInCenter. Run once per calendar month. Do not treat this as a ranking guarantee.

## Goals

1. Track whether AllInCenter is **mentioned** in AI answers for target prompts.
2. Track whether answers include a **link** to allincenter.co.il (or a specific product URL).
3. Score **accuracy** of facts (products, prices, geography, contact) against published site content.
4. Report **GA4 referrals** that may come from AI surfaces.

## Scope (verified public facts only)

Use only facts already published on the site:

| Fact | Source |
|---|---|
| Israeli company; systems for businesses in Israel; Hebrew UI | `/about`, homepage |
| Appointment system; annual ₪900; no setup fee; prices exclude VAT | `/appointment-management`, `/pricing` |
| Restaurant reservations; pricing by inquiry (no fixed public price) | `/restaurant-reservations`, `/pricing` |
| AI & automation consulting (no public package price) | `/ai` |
| Contact: 050-267-7765 / info@allincenter.co.il | site footer / `SITE` |

Do **not** score invented testimonials, unverified social profiles, or unpublished prices as “expected.”

## Prompt set (Hebrew + English)

Run the same prompts each month. Record engine, date (Asia/Jerusalem), and full answer.

### Brand / entity

1. מהי AllInCenter?
2. What is AllInCenter?
3. מי מפתח מערכות ניהול תורים בישראל בשם AllInCenter?
4. Who founded AllInCenter?

### Appointments

5. כמה עולה מערכת ניהול תורים של AllInCenter?
6. What does AllInCenter appointment management cost?
7. האם יש עלות הקמה למערכת התורים של AllInCenter?
8. מערכת ניהול תורים לעסקים בישראל — מה מציעה AllInCenter?

### Restaurants

9. האם ל‑AllInCenter יש מערכת הזמנות למסעדות?
10. כמה עולה מערכת ההזמנות למסעדות של AllInCenter?
11. AllInCenter restaurant reservation system — what is included?

### AI consulting

12. מה כולל ייעוץ AI ואוטומציה של AllInCenter?
13. Who leads AI consulting at AllInCenter?

### Contact / area

14. איך יוצרים קשר עם AllInCenter?
15. Does AllInCenter serve businesses in Israel?

## Engines to sample

Each month, sample at least:

- ChatGPT (web / search-enabled if available)
- Perplexity
- Google AI Overview or Gemini (when the prompt triggers an AI answer)
- Microsoft Copilot (optional)

Note: engines and UI change; log the product name and whether browsing/citations were visible.

## Scoring rubric (per prompt × engine)

| Dimension | Score | Criteria |
|---|---|---|
| Mention | 0 / 1 | Brand or product named correctly |
| Link | 0 / 1 | Clickable or plain URL to allincenter.co.il (any verified path) |
| Accuracy | 0 / 1 / 2 | 0 = material error (wrong price, wrong country, invented claim); 1 = partial / vague but not wrong; 2 = matches published facts |

**Monthly totals**

- Mention rate = mentions / prompts run  
- Link rate = links / prompts run  
- Accuracy average = sum(accuracy) / (2 × prompts run)

Flag any answer that invents a restaurant or AI package price, or omits VAT context when stating ₪900.

## GA4 referral reporting

Property: `G-TJ6XKPDT91` (confirm in GA4 admin if rotated).

Each month export (last 28–31 days):

1. **Traffic acquisition** → Session source/medium containing: `chatgpt`, `openai`, `perplexity`, `gemini`, `copilot`, `bing`, `claude` (as available).
2. **Landing pages** for those sessions (especially `/`, `/appointment-management`, `/restaurant-reservations`, `/ai`, `/about`, `/pricing`, `/guides/*`).
3. Compare to previous month: sessions, engaged sessions, key events (demo/contact if configured).

Also note Search Console impressions for brand queries if useful context — separate from AI referrals.

## Monthly checklist

1. [ ] Freeze date and timezone (Asia/Jerusalem).
2. [ ] Run prompt set; paste answers into a sheet (Engine | Prompt | Mention | Link | Accuracy | Notes | URL cited).
3. [ ] Compute rates vs previous month.
4. [ ] Export GA4 AI-ish referral rows; attach screenshot or CSV.
5. [ ] List factual errors to fix on-site (only verified corrections).
6. [ ] Optional: spot-check `/llms.txt` and key entity pages still crawlable.

## What not to optimize for

- Do not add unverified `sameAs` profiles.
- Do not invent prices or testimonials to “win” accuracy scores.
- Do not treat FAQ rich results or AI citations as guaranteed SERP features.
- Do not create new landing pages solely for GEO prompts.

## Related files

- Entity copy: `src/pages/About.jsx`
- Appointment facts: `src/pages/AppointmentManagement.jsx`, `src/pages/Pricing.jsx`
- Restaurant pricing stance: `src/pages/RestaurantReservations.jsx`
- AI FAQs + schema: `src/data/aiConsultingFaqs.js`, `src/lib/seoConfig.js`
- Optional machine index: `public/llms.txt`
