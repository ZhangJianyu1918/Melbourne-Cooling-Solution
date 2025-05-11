function handler(event) {
    var response = event.response;
    var headers = response.headers;
  
    headers['strict-transport-security'] = { value: 'max-age=63072000; includeSubDomains; preload' };
    headers['content-security-policy'] = { value: "default-src 'self'" };
    headers['x-content-type-options'] = { value: 'nosniff' };
    headers['x-frame-options'] = { value: 'DENY' };
    headers['referrer-policy'] = { value: 'no-referrer' };
    headers['permissions-policy'] = { value: 'geolocation=(), microphone=()' };
  
    return response;
  }