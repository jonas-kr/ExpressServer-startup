const router = require('express').Router()
const multer = require('multer');
const { uploadImage } = require("../controllers/imageController")


const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('image'), uploadImage)

module.exports = router