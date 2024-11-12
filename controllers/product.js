const ProductModel = require('../models/product')
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response')
const { deleteImage } = require('../utils/deleteImage');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

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
        } = req.body;

        // const products = new ProductModel({
        const products = await ProductModel.create({
            name,
            slug,
            image: `/images/product/${req.file.filename}`,
            brand,
            category,
            description,
            price,
            countInStock,
            rating,
            numReviews
        });

        sendSuccessResponse(res, 'All products found successfully', products)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}
exports.update = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, msg: 'Product not found' });
        }

        let images = [...product.images];

        if (req.files && req.files.length > 0) {
            images = [
                ...images,
                ...req.files.map((img) => {
                    const filePath = img.path.slice(img.path.indexOf('\\images\\product'));
                    return { url: `${filePath}` };
                }),
            ];
        }

        const updatedData = {
            name: req.body.name,
            slug: req.body.slug,
            images,
            brand: req.body.brand,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            featuredProduct: req.body.featuredProduct
        };

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProduct) {
            return res.status(400).json({ success: false, msg: 'Failed to update product' });
        }

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
        const { id } = req.params;
        const products = await ProductModel.findById(id);
        sendSuccessResponse(res, 'Product fetched successfully', products)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.getAll = async (req, res) => {
    try {
        const products = await ProductModel.find();
        sendSuccessResponse(res, 'All products fetched successfully', products)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.convertImages = async (req, res) => {
    const inputFolder = path.join(__dirname, '../public/input');
    const outputFolder = path.join(__dirname, '../public/output');

    try {
        const files = fs.readdirSync(inputFolder);
        await Promise.all(
            files.map(async (file) => {
                const inputFile = path.join(inputFolder, file);
                const outputFile = path.join(outputFolder, `${path.parse(file).name}.webp`);

                await sharp(inputFile)
                    .resize({ width: 800, height: 1000 })
                    .toFormat('webp')
                    .toFile(outputFile);
            })
        )
        sendSuccessResponse(res, 'All products images converted and resized successfully')
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}