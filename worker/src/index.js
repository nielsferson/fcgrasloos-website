const SCORES_KEY = 'scores';
const TOKEN_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function withCors(response, origin) {
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', origin || '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('Vary', 'Origin');
  return new Response(response.body, { status: response.status, headers });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

async function makeToken(env) {
  const payload = btoa(JSON.stringify({ exp: Date.now() + TOKEN_TTL_MS }));
  const sig = await hmac(env.TOKEN_SECRET, payload);
  return `${payload}.${sig}`;
}

async function verifyToken(env, token) {
  if (typeof token !== 'string' || !token.includes('.')) return false;
  const [payload, sig] = token.split('.');
  const expected = await hmac(env.TOKEN_SECRET, payload);
  if (expected !== sig) return false;
  try {
    const { exp } = JSON.parse(atob(payload));
    return typeof exp === 'number' && exp > Date.now();
  } catch {
    return false;
  }
}

function isValidScore(n) {
  return Number.isInteger(n) && n >= 0 && n <= 99;
}

export default {
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN || '*';
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return withCors(new Response(null, { status: 204 }), origin);
    }

    if (url.pathname === '/scores' && request.method === 'GET') {
      const data = (await env.SCORES.get(SCORES_KEY, 'json')) || {};
      return withCors(json(data), origin);
    }

    if (url.pathname === '/login' && request.method === 'POST') {
      let body;
      try {
        body = await request.json();
      } catch {
        return withCors(json({ error: 'Invalid request' }, 400), origin);
      }
      const { username, password } = body || {};
      if (username === env.ADMIN_USER && password === env.ADMIN_PASS) {
        const token = await makeToken(env);
        return withCors(json({ token }), origin);
      }
      return withCors(json({ error: 'Invalid username or password' }, 401), origin);
    }

    if (url.pathname === '/scores' && request.method === 'POST') {
      let body;
      try {
        body = await request.json();
      } catch {
        return withCors(json({ error: 'Invalid request' }, 400), origin);
      }
      const { token, key, home, away } = body || {};
      const authed = await verifyToken(env, token);
      if (!authed) {
        return withCors(json({ error: 'Unauthorized' }, 401), origin);
      }
      if (typeof key !== 'string' || !key) {
        return withCors(json({ error: 'Missing fixture key' }, 400), origin);
      }

      const data = (await env.SCORES.get(SCORES_KEY, 'json')) || {};
      if (home === null && away === null) {
        delete data[key];
      } else {
        if (!isValidScore(home) || !isValidScore(away)) {
          return withCors(json({ error: 'Scores must be whole numbers between 0 and 99' }, 400), origin);
        }
        data[key] = { home, away };
      }
      await env.SCORES.put(SCORES_KEY, JSON.stringify(data));
      return withCors(json(data), origin);
    }

    return withCors(json({ error: 'Not found' }, 404), origin);
  },
};
