import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../lib/api'

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [token, setToken] = useState(() => localStorage.getItem('token'))

	useEffect(() => {
		if (!token) setUser(null)
	}, [token])

	const login = async (email, password) => {
		const data = await apiFetch('/auth/login', {
			method: 'POST',
			body: { email, password },
		})
		localStorage.setItem('token', data.token)
		setToken(data.token)
		setUser(data.user)
	}

	const signup = async (email, password) => {
		const data = await apiFetch('/auth/signup', {
			method: 'POST',
			body: { email, password },
		})
		localStorage.setItem('token', data.token)
		setToken(data.token)
		setUser(data.user)
	}

	const logout = () => {
		setUser(null)
		setToken(null)
		localStorage.removeItem('token')
	}

	const value = useMemo(() => ({ user, token, login, signup, logout }), [user, token])

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('useAuth must be used within AuthProvider')
	return ctx
}

