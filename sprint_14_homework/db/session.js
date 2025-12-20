import session from 'express-session';
import MongoStore from 'connect-mongo';
import { MONGO_URL } from './mongoose.js';

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
    collectionName: 'sessions',
    ttl: parseInt(process.env.SESSION_TTL) || 86400,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
});

export default sessionConfig;
