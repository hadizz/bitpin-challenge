export async function GET(request) {
  const url = new URL(request.url);
  const targetUrl = `https://api.bitpin.org${url.pathname.replace('/api/org', '')}`;

  return fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
}
