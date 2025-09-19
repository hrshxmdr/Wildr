const express = require('express');
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');
const passport = require('passport');

const router = express.Router();

// Wrap controllers to also set cookie when token present
router.post('/register', async (req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (body?.token) {
      res.cookie('token', body.token, { httpOnly: true, sameSite: 'lax' });
    }
    return originalJson(body);
  };
  register(req, res, next);
});

router.post('/login', async (req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (body?.token) {
      res.cookie('token', body.token, { httpOnly: true, sameSite: 'lax' });
    }
    return originalJson(body);
  };
  login(req, res, next);
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

router.get('/me', auth, (req, res) => {
  const { _id, username, email } = req.user;
  res.json({ id: _id, username, email });
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/api/auth/google/failure' }), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  const redirect = process.env.FRONTEND_URL || 'http://localhost:3000';
  res.redirect(redirect);
});

router.get('/google/failure', (_req, res) => res.status(401).json({ message: 'Google auth failed' }));

module.exports = router;

