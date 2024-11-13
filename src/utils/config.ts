const isDevelopment = import.meta.env.MODE === 'development';
console.log('isDevelopment', isDevelopment);

const config = {
  baseUrlIr: '/api/',
  baseUrlOrg: '/api-org/',
};

export default config;
