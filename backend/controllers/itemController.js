const ItemModel = require('../models/itemModel');

const index = async (req, res, next) => {
    try {
        const items = await ItemModel.getAllItems();
        res.json({
            status: 'success',
            data: items
        });
    } catch (error) {
        next(error);
    }
};

const show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await ItemModel.getItemById(id);

        if (!item) {
            const error = new Error('Barang tidak ditemukan');
            error.statusCode = 404;
            throw error;
        }

        res.json({
            status: 'success',
            data: item
        });
    } catch (error) {
        next(error);
    }
};

const store = async (req, res, next) => {
    try {
        const newItemId = await ItemModel.createItem(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Barang berhasil ditambahkan',
            data: { id: newItemId, ...req.body }
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existing = await ItemModel.getItemById(id);

        if (!existing) {
            const error = new Error('Barang tidak ditemukan');
            error.statusCode = 404;
            throw error;
        }

        await ItemModel.updateItem(id, req.body);

        res.json({
            status: 'success',
            message: 'Barang berhasil diupdate'
        });
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existing = await ItemModel.getItemById(id);

        if (!existing) {
            const error = new Error('Barang tidak ditemukan');
            error.statusCode = 404;
            throw error;
        }

        await ItemModel.deleteItem(id);

        res.json({
            status: 'success',
            message: 'Barang berhasil dihapus'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    index, show, store, update, destroy
};
