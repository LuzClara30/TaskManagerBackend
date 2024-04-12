const {Router} = require('express');
const router = Router();
const {getAllTask,createTask, updateTask, deleteTask} = require('../controllers/tareas.controllers');
const {getUsers} = require('../controllers/colaboradores.controllers');

router.get('/users', getUsers);
router.get('/task', getAllTask);
router.post('/task', createTask);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

module.exports = router;