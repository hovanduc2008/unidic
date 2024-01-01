// pagination.js

/**
 * Hàm phân trang
 * @param {Model} model - Mongoose model
 * @param {Object} query - Các điều kiện truy vấn (nếu có)
 * @param {Number} page - Trang hiện tại
 * @param {Number} perPage - Số lượng bản ghi trên mỗi trang
 * @returns {Object} - Kết quả phân trang
 */

const User = require('../models/UserModel');

const paginate = async (model, query = {}, page = 1, perPage = 10, picker = []) => {
    const skip = (page - 1) * perPage;
    
    try {
        const totalRow = await model.countDocuments(query);
        const totalPages = Math.ceil(totalRow / perPage);
        const data = await model.find(query, picker).skip(skip).limit(perPage);

        return {
            perPage,
            currentPage: page,
            totalRow,
            totalPages,
            data: data
        };
    } catch (error) {
        throw new Error('Lỗi khi thực hiện phân trang');
    }
};

const picker = (fields) => {
    // Nếu mảng fields chứa dấu '*' thì trả về toàn bộ trường
    if (fields.includes('*')) {
        return {};
    }

    const projection = fields.reduce((acc, field) => {
        acc[field] = 1; // 1 nghĩa là lấy trường, 0 nghĩa là không lấy
        return acc;
    }, {});

    return projection;
}

module.exports = {
    paginate,
    picker
};
