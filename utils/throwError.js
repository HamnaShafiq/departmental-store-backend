class ThrowError extends Error {
    constructor(message = "Something went wrong", statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ThrowError;