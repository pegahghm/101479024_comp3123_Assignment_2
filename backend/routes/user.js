const express = require('express');
const { signup, login, getUsers, getUser, updateUser } = require('../controllers/usercontroller');
const { deleteUser } = require('../controllers/usercontroller');

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


module.exports = router;
