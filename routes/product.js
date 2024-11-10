const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/uploadImage")

const {
    getAll,
    create,
    update,
    destroy,
    convertImages
} = require('../controllers/product');

router.post("/create", uploadMiddleware('product').array('images'), create);
router.post("/update/:id", uploadMiddleware('product').single('image'), update);
router.delete("/destroy/:id", destroy);
router.get("/", getAll);

// converting image's formats and sizes. Not to use in project.
router.post("/convert-images", convertImages);

module.exports = router;
