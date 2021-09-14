function errorMaker(error) {
    console.log(JSON.stringify(error));
    var newError = new Error(error.message);
    newError.statusCode = error.statusCode;
    newError.name = error.name;
    newError.message = error.message;
    return newError;
}

module.exports.errorMaker = errorMaker; 