import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../lib/api'
import { useAuth } from './AuthContext'

const CartContext = createContext(undefined)

export const CartProvider = ({ children }) => {
	const { token } = useAuth()
	const [items, setItems] = useState([])
	const [sessionId, setSessionId] = useState(() => localStorage.getItem('sessionId'))

	const commonHeaders = useMemo(() => ({ token: token || undefined, sessionId: sessionId || undefined }), [token, sessionId])

	const refresh = async () => {
		const data = await apiFetch('/cart', commonHeaders)
		setItems(data.items)
		if (data.sessionId) {
			localStorage.setItem('sessionId', data.sessionId)
			setSessionId(data.sessionId)
		}
	}

	const add = async (itemId, quantity = 1) => {
		const data = await apiFetch('/cart/add', {
			method: 'POST',
			body: { itemId, quantity },
			...commonHeaders,
		})
		setItems(data.items)
		if (data.sessionId) {
			localStorage.setItem('sessionId', data.sessionId)
			setSessionId(data.sessionId)
		}
	}

	const update = async (itemId, quantity) => {
		const data = await apiFetch('/cart/update', {
			method: 'POST',
			body: { itemId, quantity },
			...commonHeaders,
		})
		setItems(data.items)
	}

	const remove = async (itemId) => {
		const data = await apiFetch('/cart/remove', {
			method: 'POST',
			body: { itemId },
			...commonHeaders,
		})
		setItems(data.items)
	}

	useEffect(() => {
		refresh()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token, sessionId])

	const value = useMemo(() => ({ items, sessionId, refresh, add, update, remove }), [items, sessionId])

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
	const ctx = useContext(CartContext)
	if (!ctx) throw new Error('useCart must be used within CartProvider')
	return ctx
}

