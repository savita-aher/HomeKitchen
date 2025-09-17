import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/conn.mjs';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => res.send('🍽️ Home Kitchen API is running'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));