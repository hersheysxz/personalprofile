(function () {
  const localHosts = new Set(['', 'localhost', '127.0.0.1']);
  const productionApiBase = 'https://personalprofile-4wet.onrender.com';

  window.PORTFOLIO_CONFIG = {
    API_BASE_URL: localHosts.has(window.location.hostname) ? 'http://localhost:5000' : productionApiBase
  };
})();
