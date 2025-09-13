import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm.jsx';
import { TransactionsAPI } from '../services/api.js';

export default function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    TransactionsAPI.get(id)
      .then((data) => { if (mounted) setInitialValues(data); })
      .catch((err) => setError(err?.response?.data?.message || err.message))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, [id]);

  async function handleSubmit(payload) {
    try {
      setSubmitting(true);
      setError('');
      await TransactionsAPI.update(id, payload);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!initialValues) return <div className="p-4">Not found</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Transaction</h1>
      <TransactionForm initialValues={initialValues} onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
}

