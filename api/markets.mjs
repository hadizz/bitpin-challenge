async function getBitpinApiUrl(apiUrl) {
  const res = await fetch(apiUrl);
  return res.json();
}

export async function GET() {
  const targetUrl = `https://api.bitpin.ir/v1/mkt/markets/`;

  const data = await getBitpinApiUrl(targetUrl);

  return new Response(JSON.stringify({ data }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
