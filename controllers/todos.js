const { response } = require('express');

const createTodo = (req, res = response) => {

   const { content, date } = req.body

   res.json({
      ok: true,
      msg: 'Todo creado',
   })
}