import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm.jsx';
import { TransactionsAPI } from '../services/api.js';

export default function AddTransaction() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(payload) {
    try {
      setSubmitting(true);
      setError('');
      await TransactionsAPI.create(payload);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <TransactionForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
}

