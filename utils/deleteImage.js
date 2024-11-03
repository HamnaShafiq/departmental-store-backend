const fs = require('fs');
const path = require('path');

exports.deleteImage=(modelInstance, res)=>{

    const oldImagePath = path.join(__dirname, '../public', modelInstance.image);

    console.log('oldImagePath', oldImagePath);
    
    // Delete the old image
    
    fs.unlink(oldImagePath, (err) => {
        if (err) {
            console.error('Error deleting the file:', err);
            return res.status(500).json({
                success: false,
                msg: 'Error deleting the old image',
            });
        }
        console.log('Old image deleted successfully');
    });
}