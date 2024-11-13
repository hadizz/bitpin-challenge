import cors from 'cors';
import express, { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(cors());

const proxyMiddleware = createProxyMiddleware({
  target: 'https://api.bitpin.ir',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
});

const orgProxyMiddleware = createProxyMiddleware({
  target: 'https://api.bitpin.org',
  changeOrigin: true,
  pathRewrite: {
    '^/api-org': '',
  },
});

// Handle both /api and /api-org routes
app.use('/api', proxyMiddleware);
app.use('/api-org', orgProxyMiddleware);

// Vercel serverless function handler
export default function handler(req: Request, res: Response) {
  return app(req, res);
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
  });
}
