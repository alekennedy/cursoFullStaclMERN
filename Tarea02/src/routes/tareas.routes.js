const {Router} = require('express');

const {getTareas} = require('../controllers/tareas.controllers');
const {getTarea} = require('../controllers/tareas.controllers');
const {createTarea} = require('../controllers/tareas.controllers');
const {updateTarea} = require('../controllers/tareas.controllers');
const {deleteTarea} = require('../controllers/tareas.controllers');
const {taskCompleted} = require('../controllers/tareas.controllers');

const router = Router();

router.get('/', getTareas);

router.get('/:id', getTarea);

router.post('/', createTarea);

router.put('/:id', updateTarea);

router.delete('/:id', deleteTarea);

router.put('/task-completed/:id', taskCompleted);

module.exports = router;