import { useEffect, useState } from 'react';

const defaultState = {
  title: '',
  amount: '',
  date: '',
  category: '',
};

export default function TransactionForm({ initialValues, onSubmit, submitting }) {
  const [form, setForm] = useState(defaultState);

  useEffect(() => {
    if (initialValues) {
      const normalized = {
        ...defaultState,
        ...initialValues,
        date: initialValues.date ? new Date(initialValues.date).toISOString().slice(0, 10) : '',
      };
      setForm(normalized);
    }
  }, [initialValues]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      amount: Number(form.amount),
      date: new Date(form.date).toISOString(),
    };
    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input name="title" value={form.title} onChange={handleChange} required className="mt-1 w-full rounded border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Amount</label>
        <input name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} required className="mt-1 w-full rounded border px-3 py-2" />
        <p className="text-xs text-gray-500 mt-1">Positive for income, negative for expense.</p>
      </div>
      <div>
        <label className="block text-sm font-medium">Date</label>
        <input name="date" type="date" value={form.date} onChange={handleChange} required className="mt-1 w-full rounded border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Category</label>
        <input name="category" value={form.category} onChange={handleChange} required className="mt-1 w-full rounded border px-3 py-2" placeholder="e.g. Food, Rent, Salary" />
      </div>
      <div className="pt-2">
        <button disabled={submitting} className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-50">
          {submitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}

