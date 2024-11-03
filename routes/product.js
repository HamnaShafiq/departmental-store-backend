const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/uploadImage")

const {
    getAll,
    create,
    update,
    destroy
} = require('../controllers/product');


router.post("/create" , uploadMiddleware('product').array('images'), create);
router.post("/update/:id" , uploadMiddleware('product').single('image'), update);
router.delete("/destroy/:id", destroy);
router.get("/", getAll);

module.exports = router;
