export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export async function apiFetch(path, options = {}) {
	const { method = 'GET', body, token, sessionId } = options
	const headers = { 'Content-Type': 'application/json' }
	if (token) headers['Authorization'] = `Bearer ${token}`
	if (sessionId) headers['x-session-id'] = sessionId
	const res = await fetch(`${API_BASE}${path}`, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	})
	if (!res.ok) {
		let message = 'Request failed'
		try {
			const data = await res.json()
			message = data.error || message
		} catch {}
		throw new Error(message)
	}
	return res.json()
}

