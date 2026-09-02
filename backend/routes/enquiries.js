const router = require('express').Router();
const c = require('../controllers/enquiryController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', c.createEnquiry);
router.get('/', protect, adminOnly, c.getAllEnquiries);
router.put('/:id', protect, adminOnly, c.updateEnquiry);
router.delete('/:id', protect, adminOnly, c.deleteEnquiry);

module.exports = router;
