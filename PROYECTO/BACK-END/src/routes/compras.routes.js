const {Router} = require('express');

const router = Router();

const {getCompras, createCompra} = require('../controllers/compras.controllers');

router.get('/',getCompras);
router.post('/', createCompra);

module.exports = router;