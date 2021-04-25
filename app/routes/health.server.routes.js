'use strict';

let express = require('express')
let router = express.Router()

const health = require('../controllers/health.server.controller');
router.get('/health', health.getHealth)


module.exports = router