import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
	const { login } = useAuth()
	const nav = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const onSubmit = async (e) => {
		e.preventDefault()
		setError('')
		setLoading(true)
		try {
			await login(email, password)
			nav('/')
		} catch (e) {
			setError(e.message || 'Login failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
				<input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<button disabled={loading} type="submit">{loading ? '...' : 'Login'}</button>
				{error && <div style={{ color: 'red' }}>{error}</div>}
			</form>
			<p>No account? <Link to="/signup">Signup</Link></p>
		</div>
	)
}