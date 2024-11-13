async function getBitpinApiUrl(apiUrl) {
  const res = await fetch(apiUrl);
  return res.json();
}

export async function GET(request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const id = url.searchParams.get('id');
  const targetUrl = `https://api.bitpin.org/v2/mth/actives/${id}/?type=${type}`;

  const data = await getBitpinApiUrl(targetUrl);

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
