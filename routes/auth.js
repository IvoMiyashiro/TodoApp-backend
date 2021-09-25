/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields-validators');
const { createUser, loginUser, renewUser } = require('../controllers/auth');
const { jwtValidator } = require('../middlewares/jwt-validators');

const router = Router();

router.post(
   '/register',
   [ // middleware
      check('name', 'Name is required.').not().isEmpty(),
      check('email', 'Email is required.').isEmail(),
      check('password', 'Password is required.').isLength({ min: 6 }),
      validateFields
   ],
   createUser
);

router.post(
   '/',
   [
      check('email', 'Email is required.').isEmail(),
      check('password', 'Password is required.').isLength({ min: 6 }),
      validateFields
   ],
   loginUser
);

router.get('/renew', jwtValidator, renewUser); // Como es solo un middleware lo paso asi no mas

module.exports = router;