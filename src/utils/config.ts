const isDevelopment = import.meta.env.MODE === 'development';

const config = {
  baseUrlIr: isDevelopment ? import.meta.env.VITE_BASE_URL_IR : '/api/ir?url=',
  baseUrlOrg: isDevelopment ? import.meta.env.VITE_BASE_URL_ORG : '/api/org?url=',
};

export default config;
