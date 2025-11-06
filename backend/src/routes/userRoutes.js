const express= require('express');

const verifyToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const router=express.Router();

//only admin can access this route
router.get('/admin', verifyToken,authorizeRoles("admin"), (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  res.json({ message: 'Welcome Admin' });
});

router.get('/editor', verifyToken, authorizeRoles("admin","editor"),(req, res) => {
  if (!['admin', 'editor'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied: Editors only' });
  }
  res.json({ message: 'Welcome Editor' });
});

router.get('/viewer', verifyToken,authorizeRoles("admin","editor","viewer") ,(req, res) => {
  res.json({ message: 'Welcome Viewer' });
});

module.exports=router;