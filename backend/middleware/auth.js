const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    // Ambil token dari header Authorization
    const authHeader = req.headers['authorization'];

    // Format biasanya: "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Akses ditolak. Token tidak ditemukan.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Simpan data user di request object (biar bisa dipake di controller)
        next();
    } catch (err) {
        return res.status(403).json({
            status: 'error',
            message: 'Token tidak valid atau kadaluarsa.'
        });
    }
};

module.exports = auth;
