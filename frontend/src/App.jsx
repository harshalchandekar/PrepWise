import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import AddTransaction from './pages/AddTransaction.jsx';
import EditTransaction from './pages/EditTransaction.jsx';
import DeleteTransaction from './pages/DeleteTransaction.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold">Finance Tracker</Link>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Dashboard</Link>
            <Link to="/add" className="hover:underline">Add</Link>
          </div>
        </div>
      </nav>
      <main className="py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path=":id/edit" element={<EditTransaction />} />
          <Route path=":id/delete" element={<DeleteTransaction />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
