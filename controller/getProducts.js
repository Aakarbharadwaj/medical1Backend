const Product = require("../models/ProductSchema");

exports.getProducts = async (req, res) => {
    try {
        const response = await Product.find();
        // const filtered = response.filter(i => i.title === "Endevor")
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            message: "internal server error",
            error: err
        })
    }
};
