const express = require("express");
const { postInvitation } = require("../controllers/InvitationController");
const router = express.Router();

router.post("/", postInvitation);

module.exports = router;
