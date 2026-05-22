const express = require('express')

const router = express.Router()

const {
    testEmbedding
} = require('../controllers/embeddingController')

router.get('/test', testEmbedding)

module.exports = router