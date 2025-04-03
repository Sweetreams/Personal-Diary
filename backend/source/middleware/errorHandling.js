export const errorHandling = (err, req, res, next) => {
    res.status(500).json({
        httpState: HTTPState.ERROR,
        message: {
            errorName: err.name,
            errorMessage: err.message
        }
    });
};