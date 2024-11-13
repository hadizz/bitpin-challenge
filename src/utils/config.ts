const isDevelopment = import.meta.env.MODE === 'development';

const config = {
  baseUrl: isDevelopment ? 'https://bitpin-challenge.vercel.app' : '',
};

export default config;
