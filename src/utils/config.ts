const isDevelopment = import.meta.env.MODE === 'development';
console.log('isDevelopment', isDevelopment);

const config = {
  baseUrlIr: isDevelopment ? import.meta.env.VITE_BASE_URL_IR : '/api/',
  baseUrlOrg: isDevelopment ? import.meta.env.VITE_BASE_URL_ORG : '/api-org/',
};

export default config;
