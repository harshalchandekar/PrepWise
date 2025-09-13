import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TransactionsAPI } from '../services/api.js';

export default function DeleteTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    TransactionsAPI.get(id)
      .then((data) => { if (mounted) setTransaction(data); })
      .catch((err) => setError(err?.response?.data?.message || err.message))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, [id]);

  async function handleDelete() {
    try {
      setError('');
      await TransactionsAPI.remove(id);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    }
  }

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!transaction) return <div className="p-4">Not found</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delete Transaction</h1>
      <p className="mb-4">Are you sure you want to delete <span className="font-semibold">{transaction.title}</span>?</p>
      <div className="flex gap-2">
        <button onClick={handleDelete} className="rounded bg-red-600 text-white px-4 py-2 hover:bg-red-700">Delete</button>
        <Link to="/" className="rounded border px-4 py-2">Cancel</Link>
      </div>
    </div>
  );
}

