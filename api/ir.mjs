import { waitUntil } from '@vercel/functions';

async function getBitpinApiUrl(apiUrl) {
  const res = await fetch(apiUrl);
  const data = await res.json();
  console.log('getBitpinApiUrl data:', data);
  return res;
}

export async function GET(request) {
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

  const targetUrl = `https://api.bitpin.ir/${apiUrl}`;
  console.log('targetUrl', targetUrl);

  const startTime = performance.now();

  const response = await waitUntil(getBitpinApiUrl(targetUrl));

  let data;
  console.log('response', response);
  try {
    data = await response.json();
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return new Response(JSON.stringify({ error: 'Invalid JSON response from API' }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

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
