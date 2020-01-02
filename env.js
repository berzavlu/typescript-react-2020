module.exports = {
  development: {
    NODE_ENV: 'development',
    API_URL: 'https://localhost/api/public/v1/',
    PORT: 4000,
  },
  production: {
    NODE_ENV: 'production',
    API_URL: typeof window !== 'undefined' ? window.baseUrlApi : '',
    PORT: 8080,
  },
}
