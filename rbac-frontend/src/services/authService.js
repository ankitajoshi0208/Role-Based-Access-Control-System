import { API_BASE } from '../utils/api';

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  // data.token expected
  localStorage.setItem('token', data.token);
  // decode minimal info from token if desired, or call /me endpoint
  return data;
}

export function logout() {
  localStorage.removeItem('token');
}
