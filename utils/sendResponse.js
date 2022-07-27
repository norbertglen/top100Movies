exports.sendErrorResponse = (res, code, errorMessage, e = null) => {
    console.error(e)
    return res.status(code).send({
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