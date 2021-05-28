const express = require('express');
const router = express.Router();

const ValidationTypeController = require('../controllers/validationTypes');

router.get('/get', ValidationTypeController.validationtype_get_all);

module.exports = router;