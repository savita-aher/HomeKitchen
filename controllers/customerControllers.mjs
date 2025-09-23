import customers from '../models/customerSchema.mjs';

export const getActiveCustomers = async (req, res, next) => {
  try {
    const result = await Customer.aggregate([
      { $match: { isActive: true } },
      {
        $project: {
          name: 1,
          email: 1,
          phone: 1,
          address: 1,
          createdAt: 1
        }
      }
    ]);
    res.status(200).json({
      message: "✅ Active customers retrieved",
      result
    });
  } catch (err) {
    next(err);
  }
};

