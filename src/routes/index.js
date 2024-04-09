const {Router} = require('express');
const router = Router();
const {getUsers} = require('../controllers/index.controllers');
//get
router.get('/users', getUsers);

module.exports = router;