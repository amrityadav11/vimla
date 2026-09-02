const router = require('express').Router();
const c = require('../controllers/faqController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', c.getActiveFAQs);
router.get('/admin/all', protect, adminOnly, c.getAllFAQs);
router.post('/', protect, adminOnly, c.createFAQ);
router.put('/:id', protect, adminOnly, c.updateFAQ);
router.delete('/:id', protect, adminOnly, c.deleteFAQ);

module.exports = router;
