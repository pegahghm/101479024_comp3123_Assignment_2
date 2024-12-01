const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { addEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee, searchEmployee } = require('../controllers/employeecontroller');
const router = express.Router();


router.post('/add', authMiddleware, addEmployee);
router.get('/employees', authMiddleware, getEmployees);
router.get('/employees/:id', authMiddleware, getEmployee);
router.put('/employees/:id', authMiddleware, updateEmployee);
router.delete('/employees/:id', authMiddleware, deleteEmployee);
router.get('/search', authMiddleware, searchEmployee);


module.exports = router;
