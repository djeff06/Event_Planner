const express = require("express");
const { postInvitation, getInvitations } = require("../controllers/InvitationController");
const router = express.Router();

router.post("/", postInvitation);
router.get("/", getInvitations);

module.exports = router;
