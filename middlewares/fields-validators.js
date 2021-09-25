const { response } = require('express');
const { validationResult } = require('express-validator');

const validateFields = (req, res = response, next) => { // El next va llamando uno a uno las validaciones que tenga

   // Manejo de errores
   const errors = validationResult(req); // Toma el middleware que paso para validar de la request
   if (!errors.isEmpty()) return res.status(400).json({
      ok: false,
      errors: errors.mapped() // Te mapea los erroes en un arreglo
   });

   next();
}

module.exports = {
   validateFields
}