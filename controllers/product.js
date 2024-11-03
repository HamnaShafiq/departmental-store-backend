const ProductModel = require('../models/product')
const {sendErrorResponse, sendSuccessResponse} = require('../utils/response')
const { deleteImage } = require('../utils/deleteImage');

exports.create = async (req, res) => {
    try {
        const {
            name,
            slug,
            image,
            brand,
            category,
            description,
            price,
            countInStock,
            rating,
            numReviews
        }= req.body;

        // const products = new ProductModel({
            const products = await ProductModel.create({
            name,
            slug,
            image:`/images/product/${req.file.filename}`,
            brand,
            category,
            description,
            price,
            countInStock,
            rating,
            numReviews
        });

        sendSuccessResponse(res , 'All products found successfully', products)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the product exists
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, msg: 'Product not found' });
        }

        // Prepare update data
        const updatedData = {
            name:req.body.name,
            slug:req.body.slug,
            image:req.body.image,
            brand:req.body.brand,
            category:req.body.category,
            description:req.body.description,
            price:req.body.price,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            numReviews:req.body.numReviews
        };

        if (req.file) {
            deleteImage(product, res);
            // Add the new image path
            updatedData.image = `/images/product/${req.file.filename}`;
        }

        // Update the product in the database
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });

        // Check if the update was successful
        if (!updatedProduct) {
            return res.status(400).json({ success: false, msg: 'Failed to update product' });
        }

        // Send success response
        sendSuccessResponse(res, 'Product updated successfully', updatedProduct);
    } catch (e) {
        console.error(e);
        sendErrorResponse(res, e);
    }
};

exports.destroy = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        deleteImage(product, res);
        sendSuccessResponse(res, 'Product deleted successfully', product)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.read = async (req, res) => {
    try {
        const {id}= req.params;
        const products = await ProductModel.findById(id);
        sendSuccessResponse(res , 'Product fetched successfully', products)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.getAll = async (req, res) => {
    try {
        const products = await ProductModel.find();
        sendSuccessResponse(res , 'All products fetched successfully', products)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}