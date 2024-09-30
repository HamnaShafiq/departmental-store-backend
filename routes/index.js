const express = require("express");
const router = express();

const roles = require('./product')

router.use("/roles", roles);

modmule.exports = router;
