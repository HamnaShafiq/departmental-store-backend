const express = require("express");
const router = express();

const products = require('./product')
const category = require('./category')

router.use("/product", products);
router.use("/category", category);

module.exports = router;
