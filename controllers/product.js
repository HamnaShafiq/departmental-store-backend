const ProductModel = require('../models/product')
const {sendErrorResponse, sendSuccessResponse} = require('../utils/response')

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
            image:`/images/${req.file.filename}`,
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

exports.getAll = async (req, res) => {
    try {
        const products = await ProductModel.find();
        sendSuccessResponse(res , 'All products found successfully', products)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}