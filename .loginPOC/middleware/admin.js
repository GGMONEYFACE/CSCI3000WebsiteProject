// Admin role check middleware
const admin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).render('403', { user: req.session.user });
  }
};

module.exports = admin;