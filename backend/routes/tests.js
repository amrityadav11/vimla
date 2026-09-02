const router = require('express').Router();
const c = require('../controllers/testController');
const { protect, adminOnly } = require('../middleware/auth');

// Public
router.get('/', c.getAllTests);
router.get('/slug/:slug', c.getTestBySlug);

// Admin
router.get('/admin/all', protect, adminOnly, c.getAllTestsAdmin);
router.post('/', protect, adminOnly, c.createTest);
router.put('/:id', protect, adminOnly, c.updateTest);
router.delete('/:id', protect, adminOnly, c.deleteTest);

module.exports = router;
