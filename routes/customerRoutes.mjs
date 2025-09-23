import express from 'express';
import Customer from '../models/customerSchema.mjs';
import {getActiveCustomers ,
} from '../controllers/customerControllers.mjs';


const router = express.Router();

// POST: Create a new customer
router.post('/', async (req, res, next) => {
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    next(err);
  }
});

// GET: Fetch all customers
router.get('/', async (req, res, next) => {
  try {
    const customers = await Customer.find().populate('orderId');
    res.json(customers);
  } catch (err) {
    next(err);
  }
});

// GET: Fetch a single customer by ID
router.get('/:id', async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('orderId');
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    next(err);
  }
});


router.get('/analytics/active', getActiveCustomers);



export default router;