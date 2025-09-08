const express = require('express');
const { authOptional } = require('../middleware/auth');
const Cart = require('../models/Cart');
const Item = require('../models/Item');
const crypto = require('crypto');

const router = express.Router();

// Middleware resolves cart by userId or sessionId cookie-like header
router.use(authOptional);

async function getOrCreateCart(req) {
  const userId = req.userId;
  let sessionId = req.headers['x-session-id'];
  if (!userId && !sessionId) {
    sessionId = crypto.randomUUID();
    // Client should store and resend this value
    req.generatedSessionId = sessionId;
  }
  const query = userId ? { user: userId } : { sessionId };
  let cart = await Cart.findOne(query).populate('items.item');
  if (!cart) {
    cart = await Cart.create({ ...query, items: [] });
    cart = await cart.populate('items.item');
  }
  return { cart, sessionId };
}

router.get('/', async (req, res) => {
  const { cart, sessionId } = await getOrCreateCart(req);
  const resp = { items: cart.items, cartId: cart._id };
  if (req.generatedSessionId) resp.sessionId = sessionId;
  res.json(resp);
});

router.post('/add', async (req, res) => {
  const { itemId, quantity = 1 } = req.body;
  if (!itemId) return res.status(400).json({ error: 'itemId required' });
  const { cart, sessionId } = await getOrCreateCart(req);
  const item = await Item.findById(itemId);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  const existing = cart.items.find((ci) => ((ci.item && ci.item._id) ? ci.item._id : ci.item).toString() === itemId);
  if (existing) existing.quantity += Number(quantity);
  else cart.items.push({ item: itemId, quantity: Number(quantity) });
  await cart.save();
  await cart.populate('items.item');
  const resp = { items: cart.items };
  if (req.generatedSessionId) resp.sessionId = sessionId;
  res.json(resp);
});

router.post('/update', async (req, res) => {
  const { itemId, quantity } = req.body;
  if (!itemId || typeof quantity !== 'number') return res.status(400).json({ error: 'itemId and quantity required' });
  const { cart, sessionId } = await getOrCreateCart(req);
  const existing = cart.items.find((ci) => ((ci.item && ci.item._id) ? ci.item._id : ci.item).toString() === itemId);
  if (!existing) return res.status(404).json({ error: 'Item not in cart' });
  if (quantity <= 0) {
    cart.items = cart.items.filter((ci) => ci.item.toString() !== itemId);
  } else {
    existing.quantity = quantity;
  }
  await cart.save();
  await cart.populate('items.item');
  const resp = { items: cart.items };
  if (req.generatedSessionId) resp.sessionId = sessionId;
  res.json(resp);
});

router.post('/remove', async (req, res) => {
  const { itemId } = req.body;
  if (!itemId) return res.status(400).json({ error: 'itemId required' });
  const { cart, sessionId } = await getOrCreateCart(req);
  cart.items = cart.items.filter((ci) => ((ci.item && ci.item._id) ? ci.item._id : ci.item).toString() !== itemId);
  await cart.save();
  await cart.populate('items.item');
  const resp = { items: cart.items };
  if (req.generatedSessionId) resp.sessionId = sessionId;
  res.json(resp);
});

module.exports = router;

