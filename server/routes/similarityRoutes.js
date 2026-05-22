const express = require('express')

const multer = require('multer')

const router = express.Router()

const {
    comparePapers
} = require('../controllers/similarityController')

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'uploads/')
    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + '-' + file.originalname
        )
    }
})

const upload = multer({
    storage
})

router.post(
    '/compare',
    upload.array('papers', 10),
    comparePapers
)

module.exports = router