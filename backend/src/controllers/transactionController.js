import Transaction from '../models/Transaction.js';

export const createTransaction = async (req, res, next) => {
  try {
    const { title, amount, date, category } = req.body;
    if (title == null || amount == null || date == null || category == null) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const transaction = await Transaction.create({ title, amount, date, category });
    return res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (_req, res, next) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1, createdAt: -1 });
    return res.json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    return res.json(transaction);
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, amount, date, category } = req.body;
    const updated = await Transaction.findByIdAndUpdate(
      id,
      { title, amount, date, category },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    return res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Transaction.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

