const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes
const volunteersRoutes = require('./routes/volunteersRoutes');
const paymentRoutes = require('./routes/payment');

dotenv.config();

const app = express();

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/volunteers', volunteersRoutes);
app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});