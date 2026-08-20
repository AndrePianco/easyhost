import { Router } from 'express';
import { usuarioController } from '../controllers/usuarioController.js';

const router = Router();

// POST /usuarios — cadastrar
router.post('/', usuarioController.cadastrar);

// POST /login — autenticar
router.post('/login', usuarioController.login);

// DELETE /usuarios/:id — excluir conta
router.delete('/:id', usuarioController.excluir);

export default router;
