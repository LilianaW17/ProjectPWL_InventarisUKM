const validate = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = [];
        // Cek req.body (untuk POST/PUT)
        for (const field of requiredFields) {
            if (!req.body[field] || req.body[field].toString().trim() === '') {
                missingFields.push(field);
            }
        }
        
        if (missingFields.length > 0) {
            // Error format sesuai requirement JSON
            return res.status(400).json({
                status: 'error',
                message: 'Input tidak boleh kosong',
                missing_fields: missingFields
            });
        }
        next();
    };
};

module.exports = validate;
