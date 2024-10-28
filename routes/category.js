const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/uploadImage")

const {
    getAll,
    create,
    update,
    destroy
} = require('../controllers/category');

router.post("/create" , uploadMiddleware('category').single('image'), create);
router.post("/update/:id" , uploadMiddleware('category').single('image'), update);
router.delete("/destroy/:id", destroy);
router.get("/", getAll);

module.exports = router;
