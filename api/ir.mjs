export async function GET(request) {
  const url = new URL(request.url);
  const targetUrl = `https://api.bitpin.ir${url.pathname.replace('/api/ir', '')}${url.search}`;

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
