const CategoryModel = require('../models/categoryModel');

// LIST
const index = async (req, res, next) => {
    try {
        const categories = await CategoryModel.getAllCategories();
        res.json({
            status: 'success',
            data: categories
        });
    } catch (error) {
        next(error);
    }
};

// SHOW
const show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.getCategoryById(id);

        if (!category) {
            const error = new Error('Kategori tidak ditemukan');
            error.statusCode = 404;
            throw error;
        }

        res.json({
            status: 'success',
            data: category
        });
    } catch (error) {
        next(error);
    }
};

// STORE
const store = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        // Auto generate Code: Ambil 3 huruf pertama kapital
        const code = name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase();
        const isActive = 1; // Default aktif

        const newId = await CategoryModel.createCategory(name, description, code, isActive);

        res.status(201).json({
            status: 'success',
            message: 'Kategori berhasil ditambahkan',
            data: {
                id: newId,
                name, description, code, is_active: isActive
            }
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE
const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, is_active } = req.body;

        const existing = await CategoryModel.getCategoryById(id);
        if (!existing) {
            const error = new Error('Kategori tidak ditemukan');
            error.statusCode = 404;
            throw error;
        }

        const code = name ? name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase() : existing.code;
        const finalActive = is_active !== undefined ? is_active : existing.is_active;

        await CategoryModel.updateCategory(id, name, description, code, finalActive);

        res.json({
            status: 'success',
            message: 'Kategori berhasil diupdate'
        });
    } catch (error) {
        next(error);
    }
};

// DESTROY
const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existing = await CategoryModel.getCategoryById(id);
        if (!existing) {
            const error = new Error('Kategori tidak ditemukan');
            error.statusCode = 404;
            throw error;
        }

        await CategoryModel.deleteCategory(id);

        res.json({
            status: 'success',
            message: 'Kategori berhasil dihapus'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    index, show, store, update, destroy
};
