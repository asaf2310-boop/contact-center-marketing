const endpoint = "https://api.indexnow.org/IndexNow";
const host = "www.allincenter.co.il";
const key = "307f90264ccf430c891c2938f948056d";
const keyLocation = `https://${host}/${key}.txt`;

const urlList = [
  `https://${host}/`,
  `https://${host}/lp`,
  `https://${host}/pricing`,
  `https://${host}/about`,
  `https://${host}/ai`,
  `https://${host}/allincenter-pelecard`,
  `https://${host}/restaurant-reservations`,
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
