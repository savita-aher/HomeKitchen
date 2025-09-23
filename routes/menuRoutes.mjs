import express from 'express';
import MenuItem from '../models/menuSchema.mjs';

import {
  
  groupByVegStatus,
  getMostExpensiveMenuItem,
  groupByPriceBelowFive,
  groupByAvailability,
  groupBySamePrice
} from '../controllers/menuControllers.mjs';


const router = express.Router();

// GET all menu items
router.get('/', async (req, res, next) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
});

// GET menu item by ID
router.get('/:id', async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json( 'Menu item not found' );
    }
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

// POST new menu item
router.post("/", async (req, res, next) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json({ msg: "✅ Menu item created", item });
  } catch (err) {
    console.error("Create error:", err.message);
    res.status(500).json({ msg: `✘ Error - ${err.message}` });
  }
});

// PATCH update menu item
router.patch('/:id', async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: "❌ No update data provided" });
    }
      const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!item) return res.status(404).json({ msg: '❌ Menu item not found' });

    res.status(200).json({ msg: `✅ ${item.name} updated`, updated: item });
  } catch (err) {
    next(err);
  }
});

// DELETE menu item
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json( 'Menu item not found' );
    }
  res.status(200).json({ message: `${deletedItem.name}  deleted` });
    
  } catch (err) {
    next(err);
  }
});

// DELETE ALL menu item
router.get('/all', async (req, res, next) => {
  try {
    const items = await MenuItem.deleteMany();
    res.status(200).json('All the Menu item deleted');
  } catch (err) {
    next(err);
  }
});

// Analytics routes
router.get('/test', (req, res) => {
  res.send('✅ Menu router is working');
});

router.get('/analytics/group-by-veg', groupByVegStatus);
router.get('/analytics/most-expensive', getMostExpensiveMenuItem);
router.get('/analytics/price-below-5', groupByPriceBelowFive);
router.get('/analytics/group-by-availability', groupByAvailability);
router.get('/analytics/group-by-same-price', groupBySamePrice);



export default router;