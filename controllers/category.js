const categoryModel = require('../models/category')
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response');
const { deleteImage } = require('../utils/deleteImage');

exports.create = async (req, res) => {
    try {
        const {
            name,
            slug,
            image
        } = req.body;

        console.log('req.file', req.file);
        console.log('req.file.filename', req.file.filename);


        // const category = new categoryModel({
        const category = await categoryModel.create({
            name,
            slug,
            image: `/images/category/${req.file.filename}`
        });

        sendSuccessResponse(res, 'New category created successfully', category)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the category exists
        const category = await categoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ success: false, msg: 'Category not found' });
        }

        // Prepare update data
        const updatedData = {
            name: req.body.name,
            slug: req.body.slug,
        };

        if (req.file) {
            // Delete the old image
            deleteImage(category, res);
            // Now add the new image path
            updatedData.image = `/images/category/${req.file.filename}`;
        }

        // Update the category in the database
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, updatedData, { new: true });

        // Check if the update was successful
        if (!updatedCategory) {
            return res.status(400).json({ success: false, msg: 'Failed to update category' });
        }

        // Send success response
        sendSuccessResponse(res, 'Category updated successfully', updatedCategory);
    } catch (e) {
        console.error(e);
        sendErrorResponse(res, e);
    }
};

exports.destroy = async (req, res) => {
    try {
        const category = await categoryModel.findByIdAndDelete(req.params.id);
        deleteImage(category, res);
        sendSuccessResponse(res, 'Category deleted successfully', category)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.getAll = async (req, res) => {
    try {
        const category = await categoryModel.find();
        sendSuccessResponse(res, 'All categories found successfully', category)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}