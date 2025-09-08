import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'

export default function SignupPage() {
	const { signup } = useAuth()
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
			await signup(email, password)
			nav('/')
		} catch (e) {
			setError(e.message || 'Signup failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h2>Signup</h2>
			<form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
				<input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<button disabled={loading} type="submit">{loading ? '...' : 'Create'}</button>
				{error && <div style={{ color: 'red' }}>{error}</div>}
			</form>
			<p>Have an account? <Link to="/login">Login</Link></p>
		</div>
	)
}