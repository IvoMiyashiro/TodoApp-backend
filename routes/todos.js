/**
 * Rutas de Usuarios / Todos
 * host + /api/todos
 */

const { Router } = require('express');

const router = Router();

router.post('/', createTodo);

router.get('/', getTodos);

router.put('/:id', updateTodo);

router.delete('/:id', deleteTodo);