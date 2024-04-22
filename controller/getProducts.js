const Products = require("../models/TodoSchema");

exports.getProducts = async (req, res) => {
    try {
        const response = await Products.find();
        // const filtered = response.filter(i => i.title === "Endevor")
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            message: "internal server error",
            error: err
        })
    }
};
