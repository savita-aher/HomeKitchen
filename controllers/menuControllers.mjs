import MenuItem from '../models/menuSchema.mjs';

// 🥦 Group by Veg / Non-Veg
export const groupByVegStatus = async (req, res, next) => {
  try {
    const result = await MenuItem.aggregate([
      {
        $group: {
          _id: "$isVeg",
          items: { $push: "$name" },
          count: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json({
  message: " Grouped by vegetarian status",
  result})
;
  } catch (err) {
    next(err);
  }
};

// 💰 Most Expensive Menu Item
export const getMostExpensiveMenuItem = async (req, res, next) => {
  try {
    const result = await MenuItem.aggregate([
      { $sort: { price: -1 } },
      { $limit: 1 }
    ]);
    res.status(200).json({
  message: " Most Expensive Menu Item",
  result});
  } catch (err) {
    next(err);
  }
};

// 🧮 Group Items Priced Below ₹5
export const groupByPriceBelowFive = async (req, res, next) => {
  try {
    const result = await MenuItem.aggregate([
      { $match: { price: { $lt: 5 } } },
      {
        $group: {
          _id: "Below ₹5",
          items: { $push: "$name" },
          count: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// ✅ Group by Availability
export const groupByAvailability = async (req, res, next) => {
  try {
    const result = await MenuItem.aggregate([
      {
        $group: {
          _id: "$available",
          items: { $push: "$name" },
          count: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json({
  message: "All Available Items",
  result});
  } catch (err) {
    next(err);
  }
};

// 💸 Group by Same Price
export const groupBySamePrice = async (req, res, next) => {
  try {
    const result = await MenuItem.aggregate([
      {
        $group: {
          _id: "$price",
          items: { $push: "$name" },
          count: { $sum: 1 }
        }
      },
      { $match: { count: { $gt: 1 } } }, // Only show prices with duplicates
      { $sort: { _id: 1 } }
    ]);
    res.status(200).json({
  message: " Same Priced Items",
  result});
  } catch (err) {
    next(err);
  }
};