const router = require('express').Router();
const c = require('../controllers/categoryController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', c.getAllCategories);
router.get('/admin/all', protect, adminOnly, c.getAllCategoriesAdmin);
router.post('/', protect, adminOnly, c.createCategory);
router.put('/:id', protect, adminOnly, c.updateCategory);
router.delete('/:id', protect, adminOnly, c.deleteCategory);

module.exports = router;
