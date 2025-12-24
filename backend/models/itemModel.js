const db = require('../config/database');

// Get All Items
const getAllItems = async () => {
    const query = `
        SELECT items.*, categories.name as category_name, categories.code as category_code
        FROM items 
        JOIN categories ON items.category_id = categories.id
    `;
    const [rows] = await db.execute(query);
    return rows;
};

// Get Item by ID
const getItemById = async (id) => {
    const query = `
        SELECT items.*, categories.name as category_name, categories.code as category_code
        FROM items 
        JOIN categories ON items.category_id = categories.id
        WHERE items.id = ?
    `;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
};

// Create Item
const createItem = async (data) => {
    // Proper query for current DB schema:
    const insertQuery = `
         INSERT INTO items (category_id, name, stock, price, purchase_date, condition_status, description) 
         VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(insertQuery, [
        data.category_id || null,
        data.name,
        data.stock || 0,
        data.price || 0,
        data.purchase_date || null,
        data.condition_status || 'Baik',
        data.description || null
    ]);
    return result.insertId;
};

// Update Item
const updateItem = async (id, data) => {
    const query = `
        UPDATE items 
        SET category_id = ?, name = ?, stock = ?, price = ?, purchase_date = ?, condition_status = ?, description = ?
        WHERE id = ?
    `;
    const [result] = await db.execute(query, [
        data.category_id || null,
        data.name,
        data.stock || 0,
        data.price || 0,
        data.purchase_date || null,
        data.condition_status || 'Baik',
        data.description || null,
        id
    ]);
    return result.affectedRows;
};

// Delete Item
const deleteItem = async (id) => {
    const query = 'DELETE FROM items WHERE id = ?';
    const [result] = await db.execute(query, [id]);
    return result.affectedRows;
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};
