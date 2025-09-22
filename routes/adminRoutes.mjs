import Order from "../models/orderSchema.mjs";
import Customer from "../models/customerSchema.mjs";

let getTopCustomers = async (req, res) => {
  let result = await Order.aggregate([
    { $group: { _id: "$customerId", totalSpent: { $sum: "$total" } } },
    { $sort: { totalSpent: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: "customers",
        localField: "_id",
        foreignField: "_id",
        as: "customer"
      }
    },
    { $unwind: "$customer" },
    {
      $project: {
        name: "$customer.name",
        email: "$customer.email",
        totalSpent: 1
      }
    }
  ]);
  res.json(result);
};