const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 5000;

// Middleware wajib
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
    res.send('Server Inventaris UKM sedang Berjalan...');
});

// Global Error Handler (Wajib)
app.use(errorHandler);

// Jalankan Server
app.listen(port, () => {
    console.log(`🚀 Server berjalan di http://localhost:${port}`);
});