export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  
  res.status(401).json({
    error: 'Authentication required',
    message: 'Please login to access this page',
  });
};

export const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  
  res.status(403).json({
    error: 'Access forbidden',
    message: 'Admin privileges required',
  });
};
