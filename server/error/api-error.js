class ApiError extends Error {

    static badRequest(message) {
        return new ApiError(404, message);
    }

    static internal(message) {
        return new ApiError(500, message);
    }

    static forbidden(message) {
        return new ApiError(403, message);
    }

    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
}

module.exports = ApiError;