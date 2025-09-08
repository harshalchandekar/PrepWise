const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Item.deleteMany({});
  await Item.insertMany([
    { title: 'T-Shirt', description: 'Cotton tee', price: 19.99, category: 'apparel', imageUrl: '', stock: 100 },
    { title: 'Jeans', description: 'Blue denim', price: 49.99, category: 'apparel', imageUrl: '', stock: 50 },
    { title: 'Sneakers', description: 'Comfort shoes', price: 79.99, category: 'footwear', imageUrl: '', stock: 30 },
    { title: 'Backpack', description: 'Travel pack', price: 39.99, category: 'accessories', imageUrl: '', stock: 20 },
  ]);
  console.log('Seeded items');
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

