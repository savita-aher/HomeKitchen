import fs from 'fs';
import path from 'path';
import connectDB from '../db/conn.mjs';
import MenuItem from '../models/menuSchema.mjs';

const loadMenuData = () => {
  const filePath = path.resolve('./data/menuSeedData.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
};

const seedMenu = async () => {
  try {
    await connectDB();

    const menuItems = loadMenuData();

    await MenuItem.deleteMany();
    console.log(' Existing menu items cleared');

    const inserted = await MenuItem.insertMany(menuItems);
    console.log(` ${inserted.length} menu items seeded`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seedMenu();