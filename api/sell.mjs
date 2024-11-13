async function getBitpinApiUrl(apiUrl) {
  const res = await fetch(apiUrl);
  return res.json();
}

export async function GET(request) {
  const targetUrl = 'https://api.bitpin.org/v2/mth/actives/1/?type=sell';
  const startTime = performance.now();

  const data = await getBitpinApiUrl(targetUrl);
  console.log('data', data);

  const endTime = performance.now();
  const timeSpent = endTime - startTime;
  console.log(`API call took ${timeSpent}ms`);

  return new Response(JSON.stringify({ data }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
