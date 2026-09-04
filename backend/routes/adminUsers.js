const router = require('express').Router();
const c = require('../controllers/adminUsersController');
const { protect, adminOnly } = require('../middleware/auth');

// All routes require admin auth
router.use(protect, adminOnly);

router.get('/', c.getAllUsers);
router.post('/', c.createUser);
router.put('/:id', c.updateUser);
router.delete('/:id', c.deleteUser);

module.exports = router;
