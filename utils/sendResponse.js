exports.sendErrorResponse = (res, code, errorMessage, e = null) => {
    const statusCode = e && e.name === 'ValidationError' ? 400 : code
    return res.status(statusCode).send({
        status: 'error',
        error: errorMessage,
        e: e?.toString(),
    })
};

exports.sendSuccessResponse = (res, code, data, message = 'Successful') => res.status(code).send({
    status: 'success',
    payload: data,
    message,
});