const router = require('express').Router();
const c = require('../controllers/settingsController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', c.getPublicSettings);
router.put('/', protect, adminOnly, c.updateSettings);
router.get('/stats', protect, adminOnly, c.getStats);

module.exports = router;
