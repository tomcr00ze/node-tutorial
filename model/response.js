// The purpose of creating the Response class is to standardize the response or output of the API we create.
// The Response class will be used in the queries.js file.
class Response {
    constructor(status = false, code = 400, message = "", data = null) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

module.exports = Response;