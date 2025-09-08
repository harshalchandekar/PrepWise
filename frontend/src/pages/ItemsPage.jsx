import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api.js'
import { useCart } from '../context/CartContext'

export default function ItemsPage() {
	const { add } = useCart()
	const [items, setItems] = useState([])
	const [q, setQ] = useState('')
	const [category, setCategory] = useState('')
	const [priceMin, setPriceMin] = useState('')
	const [priceMax, setPriceMax] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const load = async () => {
		setLoading(true)
		setError('')
		try {
			const params = new URLSearchParams()
			if (q) params.set('q', q)
			if (category) params.set('category', category)
			if (priceMin) params.set('priceMin', priceMin)
			if (priceMax) params.set('priceMax', priceMax)
			const data = await apiFetch(`/items?${params.toString()}`)
			setItems(data.items)
		} catch (e) {
			setError(e.message || 'Failed to load items')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		load()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			<h2>Items</h2>
			<div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
				<input placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
				<input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
				<input placeholder="Min Price" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
				<input placeholder="Max Price" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
				<button onClick={load}>Filter</button>
			</div>
			{loading && <div>Loading...</div>}
			{error && <div style={{ color: 'red' }}>{error}</div>}
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
				{items.map((it) => (
					<div key={it._id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
						{it.imageUrl && <img src={it.imageUrl} alt="" style={{ width: '100%', height: 120, objectFit: 'cover' }} />}
						<h3 style={{ margin: '8px 0' }}>{it.title}</h3>
						<div>${it.price?.toFixed?.(2) ?? it.price}</div>
						<button onClick={() => add(it._id, 1)} style={{ marginTop: 8 }}>Add to cart</button>
					</div>
				))}
			</div>
		</div>
	)
}