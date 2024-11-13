export function GET(requestgst) {
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}
