class CustomError extends Error {
    constructor(message) {
        super(message);
   
        this.data = { message };
        this.statusCode = 400;
    }
}