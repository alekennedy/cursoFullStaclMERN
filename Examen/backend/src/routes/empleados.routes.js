const {Router} = require('express');
const router = Router();

const {getEmpleado, getEmpleados, crearEmpleado, updateEmpleado, deleteEmpleado} = require('../controllers/empleado.controller');
router.get('/', getEmpleados);
router.get('/:id', getEmpleado);
router.post('/', crearEmpleado);
router.put('/:id',updateEmpleado);
router.delete('/:id',deleteEmpleado);

module.exports = router;