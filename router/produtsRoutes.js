const express = require("express")
const router = express.Router();


// const { dummy } = require('../controllers/dymmyCont');
const { getProducts } = require('../controller/getProducts');
const { addProducts } = require("../controller/addProducts");
const { deleteProducts } = require("../controller/deleteProducts");


router.post('/addProducts', addProducts)
router.get('/getProducts', getProducts)
router.delete('/deleteProducts/:id', deleteProducts)

module.exports = router;
