const express = require('express');
const { qasave, qalist } = require('../controllers/qa');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.post('/save', authenticate, qasave);
router.post('/list', authenticate, qalist);


module.exports = router;