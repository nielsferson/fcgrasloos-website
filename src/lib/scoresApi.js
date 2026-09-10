const API_BASE = import.meta.env.VITE_SCORES_API_URL;

export const scoresEnabled = Boolean(API_BASE);

async function parseJsonOrThrow(response) {
  let body = null;
  try {
    body = await response.json();
  } catch {
    // ignore, handled below
  }
  if (!response.ok) {
    throw new Error(body?.error || `Request failed (${response.status})`);
  }
  return body;
}

export async function fetchScores() {
  if (!scoresEnabled) return {};
  const res = await fetch(`${API_BASE}/scores`);
  return parseJsonOrThrow(res);
}

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await parseJsonOrThrow(res);
  return data.token;
}

export async function saveScore(token, key, home, away) {
  const res = await fetch(`${API_BASE}/scores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, key, home, away }),
  });
  return parseJsonOrThrow(res);
}

export async function clearScore(token, key) {
  return saveScore(token, key, null, null);
}
