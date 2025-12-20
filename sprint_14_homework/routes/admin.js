import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/', (req, res) => {

  return res.render('admin', {
    user: req.session.user,
    adminData: {
      totalUsers: 150,
      activeUsers: 42,
      totalSessions: 89,
    },
  });


});

export default router;