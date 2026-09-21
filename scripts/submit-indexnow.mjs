const endpoint = "https://api.indexnow.org/IndexNow";
const host = "www.allincenter.co.il";
const key = "307f90264ccf430c891c2938f948056d";
const keyLocation = `https://${host}/${key}.txt`;

const urlList = [
  `https://${host}/`,
  `https://${host}/pricing`,
  `https://${host}/about`,
  `https://${host}/ai`,
  `https://${host}/systems`,
  `https://${host}/services`,
  `https://${host}/allincenter-pelecard`,
  `https://${host}/appointment-management`,
  `https://${host}/restaurant-reservations`,
  `https://${host}/guides`,
  `https://${host}/guides/how-to-choose-appointment-system`,
  `https://${host}/guides/restaurant-reservation-system`,
  `https://${host}/guides/ai-automation-small-business`,
  `https://${host}/guides/seo-ai-visibility-business`,
  `https://${host}/google-ai-visibility`,
];

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (!response.ok) {
  const details = await response.text();
  throw new Error(
    `IndexNow submission failed (${response.status} ${response.statusText})${details ? `: ${details}` : ""}`,
  );
}

console.log(`IndexNow accepted ${urlList.length} URLs (${response.status}).`);
