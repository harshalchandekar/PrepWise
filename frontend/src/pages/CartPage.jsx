import { useCart } from '../context/CartContext.jsx'
import { useEffect } from 'react'

export default function CartPage() {
	const { items, refresh, update, remove } = useCart()

	useEffect(() => {
		refresh()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const total = items.reduce((sum, ci) => sum + (ci.item?.price || 0) * ci.quantity, 0)

	return (
		<div>
			<h2>Cart</h2>
			{items.length === 0 && <div>Cart is empty.</div>}
			{items.map((ci) => (
				<div key={ci.item._id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, borderBottom: '1px solid #eee' }}>
					<div style={{ flex: 1 }}>
						<div>{ci.item.title}</div>
						<div>${(ci.item.price).toFixed(2)}</div>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<button onClick={() => update(ci.item._id, Math.max(0, ci.quantity - 1))}>-</button>
						<span>{ci.quantity}</span>
						<button onClick={() => update(ci.item._id, ci.quantity + 1)}>+</button>
						<button onClick={() => remove(ci.item._id)} style={{ marginLeft: 8 }}>Remove</button>
					</div>
				</div>
			))}
			{items.length > 0 && (
				<div style={{ marginTop: 16, fontWeight: 600 }}>Total: ${total.toFixed(2)}</div>
			)}
		</div>
	)
}