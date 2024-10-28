const express = require("express");
const router = express.Router();
const upload = require("../utils/uploadImage")

const {
    getAll,
    create
} = require('../controllers/product');

router.post("/create" , upload('product').single('image'), create);
router.get("/", getAll);

module.exports = router;
