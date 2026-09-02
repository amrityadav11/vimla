const router = require('express').Router();
const c = require('../controllers/testimonialController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', c.getApprovedTestimonials);
router.get('/admin/all', protect, adminOnly, c.getAllTestimonials);
router.post('/', protect, adminOnly, c.createTestimonial);
router.put('/:id', protect, adminOnly, c.updateTestimonial);
router.delete('/:id', protect, adminOnly, c.deleteTestimonial);

module.exports = router;
