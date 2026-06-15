const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// 1. Enable CORS for your React Frontend
// 🛠️ Force backend to accept requests from ANY port layout instantly
app.use(cors());

// 2. Body Parser Middleware
app.use(express.json());

// 3. Import and Route Handlers
const authRoutes = require('./routes/auth');
const leadRoutes = require('./routes/leads');

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// 4. Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected securely to MongoDB Atlas!');
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });

// 5. Start Server Listener
app.listen(PORT, () => {
  console.log(`🚀 Backend Server active on port ${PORT}`);
});