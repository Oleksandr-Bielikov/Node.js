import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/mongoose.js';
import sessionConfig from './db/session.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);

import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Sprint 14 - Express.js with MongoDB Session Management',
    sessionID: req.sessionID,
    views: req.session.views ? req.session.views++ : (req.session.views = 1),
  });
});

app.get((req, res) => {
  res.status(404).send("404. Page not found");
});

app.listen(PORT, () => {
  console.log(`Express work on: http://localhost:${PORT}`);
});
