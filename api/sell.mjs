import { waitUntil } from '@vercel/functions';

async function getBitpinApiUrl(apiUrl) {
  const res = await fetch(apiUrl);
  return res.json();
}

export function GET(request) {
  const targetUrl = 'https://api.bitpin.org/v2/mth/actives/1/?type=sell';
  const startTime = performance.now();

  let data;
  waitUntil(
    getBitpinApiUrl(targetUrl).then((res) => {
      console.log('result of the waitUntil:', res);
      data = res;
    })
  );
  const endTime = performance.now();
  const timeSpent = endTime - startTime;

  console.log('data', data);
  console.log(`API call took ${timeSpent}ms`);

  return new Response(JSON.stringify({ data }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
