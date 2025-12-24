const errorHandler = (err, req, res, next) => {
    console.error('Error Log:', err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Terjadi kesalahan pada server';

    res.status(statusCode).json({
        status: 'error',
        message: message
    });
};

module.exports = errorHandler;
