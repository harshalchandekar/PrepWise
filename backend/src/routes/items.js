const express = require('express');
const Item = require('../models/Item');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

// Create item (protected; could be admin in real app)
router.post('/', authRequired, async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: 'Create failed' });
  }
});

// List with filters: priceMin, priceMax, category, q, page, limit
router.get('/', async (req, res) => {
  const { priceMin, priceMax, category, q, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (priceMin || priceMax) {
    filter.price = {};
    if (priceMin) filter.price.$gte = Number(priceMin);
    if (priceMax) filter.price.$lte = Number(priceMax);
  }
  if (category) filter.category = category;
  if (q) filter.title = { $regex: q, $options: 'i' };
  try {
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Item.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Item.countDocuments(filter),
    ]);
    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (e) {
    res.status(500).json({ error: 'List failed' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (_e) {
    res.status(404).json({ error: 'Not found' });
  }
});

router.put('/:id', authRequired, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (_e) {
    res.status(400).json({ error: 'Update failed' });
  }
});

router.delete('/:id', authRequired, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (_e) {
    res.status(400).json({ error: 'Delete failed' });
  }
});

module.exports = router;

