const router = require('express').Router()
const { Register, Login, Google, Logout } = require("../controllers/authContoller")

router.post('/register', Register)
router.post('/login', Login)
router.post('/google', Google)
router.get('/logout', Logout)


module.exports = router