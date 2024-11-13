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

  const startTime = performance.now();

  const response = await fetch(targetUrl, {
    method: 'GET',
    headers: request.headers,
  });

  const data = await response.json();

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
