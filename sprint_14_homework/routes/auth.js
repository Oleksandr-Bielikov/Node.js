import express from 'express';
import User from '../models/User.js';
import { hashPassword, verifyPassword } from '../helpers/pass.js';
const router = express.Router();

router.get('/:type(login|registration)', (req, res) => {
  const type = req.params.type;
  if (req.session.isAuthenticated) {
    return res.redirect('/admin');
  }
  res.render('login', { type });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ user: username });

    if (!user) return res.status(404).send("User not found");

    if (verifyPassword(password, user.password)) {
      req.session.user = {
        user: user.user,
        loggedInAt: new Date()
      }
      req.session.isAuthenticated = true;
      return res.redirect('/admin');
    } else {
      return res.render('login', { type: 'login', error: 'Wrong username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render('login', { error: "Login error" });
  };
});

router.post('/registration', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username.trim() || !password.trim()) return res.render('login', { error: 'username and password are required' });

    const existingUser = await User.findOne({ user: username });
    if (existingUser) return res.render('login', { type: "registration", error: "Username already exists" });

    const newUser = new User({
      user: username,
      password: hashPassword(password)
    });
    await newUser.save();

    req.session.user = {
      user: newUser.user,
      loggedInAt: new Date()
    };
    req.session.isAuthenticated = true;

    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).render('login', { error: 'Server error' })
  };
});

router.post('/logout', (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout error' });
      }

      return res.redirect('/auth/login');

    });
  } else {
    res.status(400).json({
      error: 'User not authenticated',
    });
  }
});

router.get('/profile', (req, res) => {
  if (req.session.isAuthenticated) {
    res.json({
      message: 'User profile',
      user: req.session.user,
      sessionID: req.sessionID,
    });
  } else {
    res.status(401).json({
      error: 'Authentication required',
    });
  }
});

export default router;