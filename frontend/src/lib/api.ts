export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function apiFetch<T>(path: string, options: { method?: HttpMethod; body?: any; token?: string; sessionId?: string } = {}): Promise<T> {
  const { method = 'GET', body, token, sessionId } = options;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (sessionId) headers['x-session-id'] = sessionId;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let message = 'Request failed';
    try {
      const data = await res.json();
      message = data.error || message;
    } catch {}
    throw new Error(message);
  }
  return res.json();
}

