const Product = require("../models/ProductSchema");

exports.addProducts = async (req, res) => {
    try {
        const { id,
            title,
            price,
            description,
            category,
            image,
            rating } = req.body;

        const response = await Product.create({
            id,
            title,
            price,
            description,
            category,
            image,
            rating
        });

        res.status(200).json({
            success: true,
            data: response,
            message: 'Entry Created'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            date: "internal server error",
            message: err.message
        });
    }
};