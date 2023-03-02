const express = require("express");
const { postInvitation, getInvitations, updateInvitations } = require("../controllers/InvitationController");
const router = express.Router();

router.post("/", postInvitation);
router.get("/", getInvitations);
router.put("/:id", updateInvitations);

module.exports = router;
