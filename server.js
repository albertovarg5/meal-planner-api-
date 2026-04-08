require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const mealRoutes = require('./routes/mealRoutes');
const progressRoutes = require('./routes/progressRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({ message: 'Meal Planner API is running.' });
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/meals', mealRoutes);
app.use('/progress', progressRoutes);

if (process.env.NODE_ENV !== 'test') {
  sequelize.sync({ alter: true })
    .then(() => {
      console.log('Database connected successfully.');
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Database connection failed:', error);
    });
}

module.exports = app;