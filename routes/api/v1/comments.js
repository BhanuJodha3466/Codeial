const express = require("express");
const passport = require("passport");
const commentApi = require("../../../controllers/api/v1/comments_api");

const router = express.Router();

router.post("/", passport.authenticate("jwt", {session: false}), commentApi.createComment);

module.exports = router;