import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import Campaign from './models/Campaign.js';
import Winner from './models/Winner.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import winnerRoutes from './routes/winnerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
connectDB();

const app = express();

// CORS - зөвхөн НЭГ удаа, зөв тохиргоотой
app.use(cors({
  origin: ['https://lot-frontend.vercel.app', 'http://localhost:5500'], // локал тестэд зориулав
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Seed endpoint
app.post('/api/seed', async (req, res) => {
  try {
    await Campaign.deleteMany({});
    await Winner.deleteMany({});

    await Campaign.insertMany([
      {
        id: "HOUSE",
        title: "МӨРӨӨДЛИЙН БАЙШИН",
        desc: "Мөрөөдлийн байшингаа хожоорой",
        image: "",
        status: "active",
        price: 2000,
        total: 25000,
        sold: 0,
        end: "2026-12-31"
      },
      {
        id: "CAR",
        title: "МАШИН",
        desc: "Шинэ машин хожих боломж",
        image: "",
        status: "active",
        price: 2000,
        total: 10000,
        sold: 0,
        end: "2026-12-31"
      },
      {
        id: "TRIP",
        title: "ЕВРОП АЯЛАЛ",
        desc: "Европ руу 2 хүний аялал",
        image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439",
        status: "active",
        price: 2000,
        total: 15000,
        sold: 0,
        end: "2026-12-31"
      }
    ]);

    res.json({ ok: true, message: "Demo data seeded successfully!" });
  } catch (err) {
    console.error("Seed error:", err);
    res.status(500).json({ error: err.message });
  }
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/winners', winnerRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));
app.get('/', (req, res) => res.send('LOT API is running 🚀'));

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});