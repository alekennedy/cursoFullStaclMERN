const {Router} = require('express');
const router = Router();

const {getEmpleado, getEmpleados, crearEmpleado, updateEmpleado, deleteEmpleado, getEmpleadosJornaleros} = require('../controllers/empleado.controller');
router.get('/', getEmpleados);
router.get('/byId/:id', getEmpleado);
router.post('/', crearEmpleado);
router.put('/:id',updateEmpleado);
router.delete('/:id',deleteEmpleado);
router.get('/jornaleros/', getEmpleadosJornaleros);

module.exports = router;