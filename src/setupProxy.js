const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8080', // Usa IP en lugar de localhost
      changeOrigin: true,
      secure: false,
      logLevel: 'debug', // Para ver logs detallados
      onProxyReq: (proxyReq) => {
        console.log('Proxying:', proxyReq.path);
      }
    })
  );
};