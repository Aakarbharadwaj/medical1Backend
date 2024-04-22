const Product = require('../models/ProductSchema')

exports.deleteProducts = async (req, res) => {
    try {
        const productId = req.params.id;
        const removeproduct = await Product.findOne({ id: productId });
        if (!removeproduct) {
            return res.status(404).json({ message: "No such product found." })
        }
        await Product.findOneAndDelete({ id: productId })
        res.status(200).json({ message: `${removeproduct.title}book removed successfully...` }
        )
    }
    catch (err) {
        res.status(500).json({ message: `${err} error found.` })
    }
}