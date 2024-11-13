export async function GET(request) {
  const apiUrl = new URL(request.query);
  console.log(apiUrl);

  if (!apiUrl) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const targetUrl = `https://api.bitpin.ir/${apiUrl}`;

  const response = await fetch(targetUrl, {
    method: 'GET',
    headers: request.headers,
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
