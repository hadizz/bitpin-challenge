export async function GET(request) {
  const url = new URL(request.url);
  const targetUrl = `https://api.bitpin.ir${url.pathname.replace('/api/ir', '')}`;

  return new Response({ url: url.pathname, targetUrl });
}
