const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../Models/User');

const router = express.Router();

// Use environment variable or fallback for Google Client ID and JWT secret
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "699000506438-8mk58p3p1bg1ce4qa9ssao5sv993b82u.apps.googleusercontent.com";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// REGISTER (classic)
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).send('User already exists');

    // Password will be hashed automatically by User model's pre-save middleware
    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Respond with full user info including _id
    return res.status(201).json({ token, username: newUser.username, role: newUser.role, _id: newUser._id });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).send('Server error');
  }
});

// LOGIN (classic)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid username or password');
    if (!user.password) {
      return res.status(400).send('Please log in with Google for this account');
    }
    
    // Use the comparePassword method from User model
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send('Invalid username or password');

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.json({ token, username: user.username, role: user.role, _id: user._id });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).send('Server error');
  }
});

// ADMIN LOGIN
router.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Hardcoded admin for demo
    if (username === "Novy_admin" && password === "123456") {
      const token = jwt.sign(
        { id: "admin-id", username: "Novy_admin", role: "admin" },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.json({ token, username: "Novy_admin", role: "admin", _id: "admin-id" });
    }

    // Check database for admin user
    const user = await User.findOne({ username, role: "admin" });
    if (!user || !user.password) {
      return res.status(401).send('Invalid admin credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).send('Invalid admin credentials');

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({ token, username: user.username, role: user.role, _id: user._id });
  } catch (err) {
    console.error('Admin login error:', err);
    return res.status(500).send('Server error');
  }
});

// GOOGLE LOGIN
router.post('/google-login', async (req, res) => {
  try {
    const { tokenId } = req.body;
    if (!tokenId) return res.status(400).json({ message: 'No token provided' });

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, email_verified, sub: googleId } = payload;

    if (!email_verified) return res.status(401).json({ message: 'Google account email not verified' });

    let user = await User.findOne({ email });
    if (!user) {
      let baseUsername = (name || email).replace(/\s+/g, '');
      let username = baseUsername;
      let suffix = 1;
      while (await User.findOne({ username })) username = `${baseUsername}${suffix++}`;
      user = new User({ username, email, googleId, password: '' });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // CRUCIAL: return _id and username!
    res.json({
      token,
      _id: user._id.toString(),
      username: user.username,
      role: user.role
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid Google token' });
  }
});

module.exports = router;