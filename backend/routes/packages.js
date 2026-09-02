const router = require('express').Router();
const c = require('../controllers/packageController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', c.getAllPackages);
router.get('/slug/:slug', c.getPackageBySlug);
router.get('/admin/all', protect, adminOnly, c.getAllPackagesAdmin);
router.post('/', protect, adminOnly, c.createPackage);
router.put('/:id', protect, adminOnly, c.updatePackage);
router.delete('/:id', protect, adminOnly, c.deletePackage);

module.exports = router;
