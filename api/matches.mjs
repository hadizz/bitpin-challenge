async function getBitpinApiUrl(apiUrl) {
  const res = await fetch(apiUrl);
  return res.json();
}

export async function GET(request) {
  const url = new URL(request.url);
  const marketId = url.searchParams.get('id');
  const targetUrl = `https://api.bitpin.org/v1/mth/matches/${marketId}/`;

  const data = await getBitpinApiUrl(targetUrl);

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS, POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
