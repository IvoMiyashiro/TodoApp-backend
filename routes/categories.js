/**
 * Rutas de Categories
 * host + /api/categories
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields-validators');
const { isDate } = require('../helpers/isDate');
const { jwtValidator } = require('../middlewares/jwt-validators');
const { createCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/categories');

const router = Router();

// Todas las peticiones tienen que pasar por JWT
router.use(jwtValidator); // Para hacer todas estas acciones tengo que estar validado

router.post(
   '/',
   [
      check('title', 'Title is required').not().isEmpty(),
      check('color', 'Color is required').not().isEmpty(),
      check('date', 'Date is required').custom(isDate),
      validateFields
   ],
   createCategory
);

router.get('/', getCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;