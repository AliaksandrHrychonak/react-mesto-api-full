const allowedCors = [
  'http://alexgrichenokmesto.nomoredomains.monster',
  'https://alexgrichenokmesto.nomoredomains.monster',
  'https://localhost:3000',
  'http://localhost:3000',
];

// eslint-disable-next-line consistent-return
module.exports = ((req, res, next) => {
  const { origin } = req.headers;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  const { method } = req;
  if (method === 'OPTIONS' || allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});