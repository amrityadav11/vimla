const router = require('express').Router();
const c = require('../controllers/messageController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', c.createMessage);
router.get('/', protect, adminOnly, c.getAllMessages);
router.put('/:id', protect, adminOnly, c.updateMessage);
router.delete('/:id', protect, adminOnly, c.deleteMessage);

module.exports = router;
