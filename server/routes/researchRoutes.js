const express = require('express')

const router = express.Router()

const upload = require('../utils/upload')

const {
    analyzePapers
} = require('../controllers/researchController')

router.post(
    '/analyze',
    upload.array('papers', 10),
    analyzePapers
)

module.exports = router