import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TransactionsAPI } from '../services/api.js';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    TransactionsAPI.list()
      .then((data) => {
        if (mounted) setTransactions(data);
      })
      .catch((err) => setError(err?.response?.data?.message || err.message))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Link to="/add" className="rounded bg-green-600 text-white px-4 py-2 hover:bg-green-700">Add Transaction</Link>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-right">Amount</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((t) => (
              <tr key={t._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{new Date(t.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{t.title}</td>
                <td className="px-4 py-2">{t.category}</td>
                <td className={`px-4 py-2 text-right ${t.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>{t.amount.toFixed(2)}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <Link to={`/${t._id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                  <Link to={`/${t._id}/delete`} className="text-red-600 hover:underline">Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

