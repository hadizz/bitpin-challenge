import { waitUntil } from '@vercel/functions';

async function getBitpinApiUrl(apiUrl) {
  const res = await fetch(apiUrl);
  return res.json();
}

export function GET(request) {
  const url = new URL(request.url);
  const apiUrl = url.searchParams.get('url');
  console.log('url', url);
  console.log('apiUrl', apiUrl);

  if (!apiUrl) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const targetUrl = `https://api.bitpin.org/${apiUrl}`;
  console.log('targetUrl', targetUrl);

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
