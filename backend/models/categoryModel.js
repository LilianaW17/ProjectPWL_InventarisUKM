const db = require('../config/database');

// Get All Categories
const getAllCategories = async () => {
    const [rows] = await db.execute('SELECT * FROM categories');
    return rows;
};

// Get Category by ID
const getCategoryById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
};

// Create Category
const createCategory = async (name, description, code, isActive) => {
    const query = `
        INSERT INTO categories (name, description, code, is_active) 
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [name, description, code, isActive]);
    return result.insertId;
};

// Update Category
const updateCategory = async (id, name, description, code, isActive) => {
    const query = `
        UPDATE categories 
        SET name = ?, description = ?, code = ?, is_active = ?
        WHERE id = ?
    `;
    const [result] = await db.execute(query, [name, description, code, isActive, id]);
    return result.affectedRows;
};

// Delete Category
const deleteCategory = async (id) => {
    const query = 'DELETE FROM categories WHERE id = ?';
    const [result] = await db.execute(query, [id]);
    return result.affectedRows;
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
