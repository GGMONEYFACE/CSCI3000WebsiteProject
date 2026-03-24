const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get current user info
router.get('/user', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Check permissions
router.get('/permissions', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const role = req.session.user.role;
  const permissions = {
    member: ['view_basic'],
    instructor: ['view_basic', 'view_advanced', 'edit_content'],
    admin: ['view_basic', 'view_advanced', 'edit_content', 'manage_users', 'view_admin']
  };

  res.json({
    role,
    permissions: permissions[role] || []
  });
});

// Get admin stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminCount = await User.countDocuments({ role: 'admin' });

    res.json({
      totalUsers,
      activeUsers,
      adminCount
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;