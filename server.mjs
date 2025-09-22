import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/conn.mjs';
import menuRoutes from './routes/menuRoutes.mjs';
import customerRoutes from './routes/customerRoutes.mjs';
import globalErrorHandler from './middleware/globalERR.mjs';
import loggingMiddleware from './middleware/loggingMiddleware.mjs';

dotenv.config();
const app = express();
app.use(express.json());


connectDB();

app.get('/', (req, res) => res.send('🍽️ Home Kitchen API is running'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Middleware
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use('/menu', menuRoutes);
app.use('/customers', customerRoutes);

// Global Error Handler
app.use(globalErrorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



