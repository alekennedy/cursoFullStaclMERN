const {Router} = require('express');

const {getUsers} = require('../controllers/user.controllers');
const {getUser} = require('../controllers/user.controllers');
const {createUser} = require('../controllers/user.controllers');
const {updateUser} = require('../controllers/user.controllers');
const {deleteUser} = require('../controllers/user.controllers');
const {bajaUser} = require('../controllers/user.controllers');
const {altaUser} = require('../controllers/user.controllers');

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.put('/baja-user/:id', bajaUser);

router.put('/alta-user/:id', altaUser);


module.exports = router;