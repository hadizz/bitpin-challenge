export async function GET(request) {
  const url = new URL(request.url);
  const targetUrl = `https://api.bitpin.ir${url.pathname.replace('/api/ir', '')}`;

  return fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
}
