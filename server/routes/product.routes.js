const express = require('express');
const ProductController = require('../controllers/product.controller');
const router = express.Router();

module.exports = router;

router.post('/', function (req, res, next) {
    res.status(200).send("TEST MELI EXPRESS");
});


router.get('/items', (req, res) => {
    const search = req.query.search;
    if (!!search) {
      ProductController.getProducts(search, res);
    } else {
      res.status(400).send({
        error: 'Ingrese un criterio de busqueda : \'search\' ' });
    }
});


/**
 * Route to '/api/items/:id'
 */
router.get('/items/:id', (req, res) => {
    const productId = req.params.id;
    if (!!productId) {
        ProductController.getProductDetails(productId, res);
    } else {
      res.status(400).send({ error: 'Ingrese un ID' });
    }
});


