const express = require("express")
const router = express.Router();


// const { dummy } = require('../controllers/dymmyCont');
const { getProducts } = require('../controller/getProducts');
const { addProducts } = require("../controller/addProducts");

router.post('/addProducts', addProducts)
router.get('/getProducts', getProducts)

module.exports = router;
