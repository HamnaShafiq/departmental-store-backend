const ThrowError = require("./throwError");

exports.sendErrorResponse = (res, error) => {
    return res.status(error instanceof ThrowError ? error.statusCode : 500).json({
        success: false,
        msg: error.message
    })
}

exports.sendSuccessResponse = (res, msg, data) => {
    return res.status(200).json({success: true, msg: msg, data: data});
}