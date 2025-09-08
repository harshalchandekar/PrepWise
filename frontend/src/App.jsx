import './App.css'
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ItemsPage from './pages/ItemsPage'
import CartPage from './pages/CartPage'
import { useAuth } from './context/AuthContext'

function NavBar() {
	const { user, logout } = useAuth()
	return (
		<nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #eee' }}>
			<Link to="/">Items</Link>
			<Link to="/cart">Cart</Link>
			<div style={{ marginLeft: 'auto' }}>
				{user ? (
					<>
						<span style={{ marginRight: 8 }}>{user.email}</span>
						<button onClick={logout}>Logout</button>
					</>
				) : (
					<>
						<Link to="/login">Login</Link>
						<span> / </span>
						<Link to="/signup">Signup</Link>
					</>
				)}
			</div>
		</nav>
	)
}

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
				<Routes>
					<Route path="/" element={<ItemsPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
