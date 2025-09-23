import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// --- GitHub OAuth Setup ---
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:5000/api/auth/github/callback',
},
  (accessToken, refreshToken, profile, done) => {
    profile.accessToken = accessToken;
    return done(null, profile);
  }
));

// --- Auth routes ---
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/admin');
  }
);

// --- Contributor check route ---
router.get('/admin/check', async (req, res) => {
  if (!req.user || !req.user.accessToken) return res.json({ isContributor: false });
  try {
    const repo = '0Aaheed0/Thikana';
    const ghRes = await axios.get(`https://api.github.com/repos/${repo}/contributors`, {
      headers: { Authorization: `token ${req.user.accessToken}` }
    });
    const isContributor = ghRes.data.some(u => u.login === req.user.username);
    res.json({ user: req.user, isContributor });
  } catch (e) {
    res.json({ isContributor: false });
  }
});

export default router; // ✅ default export
