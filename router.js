const router = require('express').Router()

const { registerUser, loginUser } = require("./controllers/user")
const { createShortLink, redirectToLink, myLinks, DeleteId } = require("./controllers/link")
router.post("/to-short", createShortLink)
router.get("/sl/:shortId", redirectToLink)

router.post("/register", registerUser)
router.post('/login', loginUser)

router.get("/my-links/:userId", myLinks)
router.post('/DeleteId', DeleteId)

exports.router = router